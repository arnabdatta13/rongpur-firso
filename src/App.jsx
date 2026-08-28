import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-red-600 selection:text-white font-sans cyber-grid">
      {/* Navbar Header */}
      <Navbar />

      {/* Main Home Page */}
      <div className="pt-6">
        <HomePage />
      </div>
    </div>
  );
}
