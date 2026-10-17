import { useEffect } from "react";
import { CONTACT_EMAIL } from "./monetization.js";

export default function LegalPage({ page }) {
  const isPrivacy = page === "privacy";
  const title = isPrivacy ? "Privacy policy" : "About ICSE Explorer";

  useEffect(() => {
    document.title = `${title} | ICSE Explorer`;
  }, [title]);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <a className="legal-brand" href="./" aria-label="ICSE Explorer home">ICSE Explorer</a>
        <nav aria-label="Site information">
          <a href="?page=about" aria-current={!isPrivacy ? "page" : undefined}>About</a>
          <a href="?page=privacy" aria-current={isPrivacy ? "page" : undefined}>Privacy</a>
        </nav>
      </header>
      <main className="legal-content">
        <p className="legal-eyebrow">ICSE Explorer · Class 10</p>
        <h1>{title}</h1>
        {isPrivacy ? <PrivacyContent /> : <AboutContent />}
        <section className="legal-contact">
          <h2>Contact</h2>
          {CONTACT_EMAIL ? (
            <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with privacy or site questions.</p>
          ) : (
            <p>The site maintainer's contact email has not been configured yet. Set <code>VITE_CONTACT_EMAIL</code> before publishing.</p>
          )}
        </section>
        <p className="legal-back"><a href="./">Back to studying</a></p>
      </main>
    </div>
  );
}

function PrivacyContent() {
  return (
    <>
      <p className="legal-updated">Last updated: October 18, 2026</p>
      <p>ICSE Explorer is a study tool for Class 10 Physics, Chemistry and Mathematics. This policy explains what the site stores and how optional analytics and advertising may work.</p>
      <h2>Information stored on your device</h2>
      <p>Chapter progress, quiz results and your last selected subject are saved in this browser's local storage so they remain available on later visits. This information is not sent to ICSE Explorer's servers. The app does not require an account.</p>
      <h2>Analytics</h2>
      <p>If Google Analytics is configured, it is not loaded until you choose “Allow analytics”. The app sends generic screen names, such as a subject and chapter, and does not send text entered in the chapter search. Google may process device, browser and usage information as described in the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>. You can change your choice using “Cookie settings” in the app footer.</p>
      <h2>Advertising</h2>
      <p>Google AdSense is inactive unless the site owner configures a publisher ID and ad slot and a compatible consent-management platform is available. If ads are enabled, Google and its partners may use cookies or similar technologies to deliver, measure and protect advertising. The consent-management platform determines the choices available and signals consent to Google. Learn about <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">how Google uses information from partner sites</a> and manage ad personalization through <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">Google's My Ad Center</a>.</p>
      <h2>Children and students</h2>
      <p>This educational site is intended for secondary-school learners and does not ask learners to submit identifying information. The site owner must configure advertising and consent settings for the audience and locations served, including applicable age-related requirements. Do not enter personal information into the chapter search.</p>
      <h2>Choices and retention</h2>
      <p>You can clear locally stored progress and consent by clearing this site's browser data. Analytics is optional and can be declined or turned off in Cookie settings. Google services may retain information according to Google's policies and the settings chosen by the site owner.</p>
      <h2>Changes</h2>
      <p>This policy may be updated when site features or services change. The “Last updated” date above will be revised when the policy changes.</p>
    </>
  );
}

function AboutContent() {
  return (
    <>
      <p>ICSE Explorer is a browser-based revision tool for Class 10 Physics, Chemistry and Mathematics. It brings chapter notes, formulas, worked examples, quizzes and timed unit tests together, and keeps study progress on the device.</p>
      <h2>Educational use</h2>
      <p>The summaries and practice questions are learning aids, not a substitute for prescribed textbooks, teacher guidance or the current official syllabus. Verify exam requirements with your school and the Council for the Indian School Certificate Examinations.</p>
      <h2>Independence</h2>
      <p>ICSE Explorer is an independent educational project and is not affiliated with or endorsed by CISCE. Product names and third-party services remain the property of their respective owners.</p>
    </>
  );
}