import { createElement, useEffect, useState } from "react";

const configuredAnalyticsId = (import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();
const configuredAdsenseClientId = (import.meta.env.VITE_ADSENSE_CLIENT_ID || "").trim();
const configuredAdsenseSlotId = (import.meta.env.VITE_ADSENSE_SLOT_ID || "").trim();
export const ANALYTICS_ID = /^G-[A-Z0-9]+$/i.test(configuredAnalyticsId) ? configuredAnalyticsId : "";
export const ADSENSE_CLIENT_ID = /^ca-pub-\d+$/.test(configuredAdsenseClientId) ? configuredAdsenseClientId : "";
export const ADSENSE_SLOT_ID = /^\d+$/.test(configuredAdsenseSlotId) ? configuredAdsenseSlotId : "";
export const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL || "").trim();

const CONSENT_KEY = "icse-explorer-analytics-consent-v1";

export function readAnalyticsConsent() {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "granted") return true;
    if (consent === "denied") return false;
  } catch (error) {}
  return null;
}

export function saveAnalyticsConsent(granted) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch (error) {}
}

function loadScript(id, src) {
  const existing = document.getElementById(id);
  if (existing) {
    if (existing.dataset.loaded === "true") return Promise.resolve(true);
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
    });
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve(true);
    }, { once: true });
    script.addEventListener("error", () => resolve(false), { once: true });
    document.head.appendChild(script);
  });
}

export function enableAnalytics() {
  if (!ANALYTICS_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", ANALYTICS_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS_ID)}`;
  void loadScript("icse-google-analytics", src);
}

export function disableAnalytics() {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
}

export function trackAppView(title) {
  if (readAnalyticsConsent() !== true || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", { page_title: title });
}

function loadAdsenseScript() {
  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT_ID)}`;
  return loadScript("icse-google-adsense", src);
}

export function AdPlacement({ online, native }) {
  const [permitted, setPermitted] = useState(false);

  useEffect(() => {
    if (!online || native || !ADSENSE_CLIENT_ID || !ADSENSE_SLOT_ID || typeof window.__tcfapi !== "function") return;
    let active = true;
    let scriptRequested = false;
    const onConsentReady = (tcData, success) => {
      if (!active || !success) return;
      onConsentReady.listenerId = tcData?.listenerId;
      if (scriptRequested) return;
      if (tcData?.eventStatus !== "tcloaded" && tcData?.eventStatus !== "useractioncomplete") return;
      scriptRequested = true;
      void loadAdsenseScript().then((loaded) => active && loaded && setPermitted(true));
    };
    window.__tcfapi("addEventListener", 2, onConsentReady);
    return () => {
      active = false;
      if (onConsentReady.listenerId) {
        window.__tcfapi("removeEventListener", 2, () => {}, onConsentReady.listenerId);
      }
    };
  }, [online, native]);

  useEffect(() => {
    if (!permitted) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {}
  }, [permitted]);

  if (!permitted) return null;
  return createElement("aside", { className: "ad-placement", "aria-label": "Advertisement" },
    createElement("span", { className: "ad-label" }, "Advertisement"),
    createElement("ins", {
      className: "adsbygoogle",
      style: { display: "block" },
      "data-ad-client": ADSENSE_CLIENT_ID,
      "data-ad-slot": ADSENSE_SLOT_ID,
      "data-ad-format": "auto",
      "data-full-width-responsive": "true",
    }),
  );
}