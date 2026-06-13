import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Polices embarquées (offline, idéal pour une app desktop)
import "@fontsource/bricolage-grotesque/400.css";
import "@fontsource/bricolage-grotesque/600.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
