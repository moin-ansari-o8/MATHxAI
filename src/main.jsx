import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Journey } from "./pages/Journey";
import { MathLibrary } from "./pages/MathLibrary";
import { About } from "./pages/About";
import { Navigation } from "./components/Navigation";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/math-library" element={<MathLibrary />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);

