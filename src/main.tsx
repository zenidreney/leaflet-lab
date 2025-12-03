import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
	throw new Error("No root element!!");
}

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
