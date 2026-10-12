import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { storage } from "./storage";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (container.hasChildNodes() && storage.isEmpty()) hydrateRoot(container, app);
else createRoot(container).render(app);
