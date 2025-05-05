import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { Buffer } from "buffer";
import process from "process";

let window = globalThis as any;

window.Buffer = Buffer;
window.global = window; // Define global if still not working
window.process = process;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
