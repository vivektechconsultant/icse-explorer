import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import LegalPage from "./LegalPage.jsx";
import { registerServiceWorker } from "./pwa.js";
import "./styles.css";

const requestedPage = new URLSearchParams(window.location.search).get("page");
const page = requestedPage === "privacy" || requestedPage === "about"
	? <LegalPage page={requestedPage} />
	: <App />;

createRoot(document.getElementById("root")).render(page);
registerServiceWorker();
