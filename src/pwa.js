// PWA helpers: service-worker registration, install prompt, online status and updates.
import { useEffect, useState } from "react";

let deferredPrompt = null;
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    notify();
  });
}

let waitingWorker = null;

// True inside the Android/iOS apps built with Capacitor (it injects window.Capacitor).
export const isNativeApp = () => !!(typeof window !== "undefined" && window.Capacitor?.isNativePlatform?.());

// Registers the service worker only when the page links a manifest,
// so single-file previews of the app never try to install one.
export function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || isNativeApp()) return; // native apps already bundle every file
  if (!document.querySelector('link[rel="manifest"]')) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then((reg) => {
        const track = (worker) => {
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              waitingWorker = worker;
              notify();
            }
          });
        };
        if (reg.waiting && navigator.serviceWorker.controller) {
          waitingWorker = reg.waiting;
          notify();
        }
        reg.addEventListener("updatefound", () => reg.installing && track(reg.installing));
      })
      .catch(() => {});
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  });
}

const isStandalone = () =>
  window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

export function usePwa() {
  const [, force] = useState(0);
  const [online, setOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);

  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.add(fn);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      listeners.delete(fn);
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const standalone = isStandalone() || isNativeApp();
  const hasManifest = !!document.querySelector('link[rel="manifest"]');
  return {
    online,
    standalone,
    canInstall: !!deferredPrompt && !standalone,
    showIOSHint: hasManifest && isIOS() && !standalone,
    native: isNativeApp(),
    install: async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
      deferredPrompt = null;
      notify();
    },
    updateReady: !!waitingWorker,
    applyUpdate: () => waitingWorker?.postMessage({ type: "SKIP_WAITING" }),
  };
}
