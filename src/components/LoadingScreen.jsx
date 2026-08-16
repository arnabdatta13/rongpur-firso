import React from "react";
import { Sparkles, Bot } from "lucide-react";

export default function LoadingScreen({ message = "Processing your registration..." }) {
  return (
    <div className="glass-panel rounded-3xl p-12 max-w-md mx-auto text-center space-y-6 border border-red-500/50 shadow-2xl shadow-red-500/20 animate-fadeIn my-12">
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin" />
        <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
          <Bot className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-red-400 animate-bounce" />
          {message}
        </h3>
        <p className="text-xs text-slate-400">
          Communicating with FIRSO Firestore database... Please wait.
        </p>
      </div>
    </div>
  );
}
