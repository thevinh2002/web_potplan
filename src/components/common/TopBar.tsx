"use client";

import { useState } from "react";

export default function TopBar() {
  const [lang, setLang] = useState("ENG");

  const languages = [
    {
      code: "VIE",
      label: "VIE",
      flag: (
        <svg viewBox="0 0 30 20" className="w-5 h-3.5 shadow-sm">
          <rect width="30" height="20" fill="#da251d" />
          <polygon
            points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
            fill="#ffff00"
          />
        </svg>
      ),
    },
    {
      code: "ENG",
      label: "ENG",
      flag: (
        <svg viewBox="0 0 60 30" className="w-5 h-3.5 shadow-sm">
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            stroke="#fff"
            strokeWidth="6"
            clipPath="url(#s)"
          />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            stroke="#C8102E"
            strokeWidth="4"
            clipPath="url(#s)"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#5c4a3d] text-white text-xs py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <span className="truncate pr-4">
          B2B Vietnam Pottery Manufacturer & Exporter
        </span>
        <div className="flex gap-4 items-center flex-shrink-0">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex items-center gap-2 transition-all hover:opacity-80 py-1 px-2 rounded ${
                lang === l.code
                  ? "bg-white/10 ring-1 ring-white/20"
                  : "opacity-60"
              }`}
            >
              {l.flag}
              <span className="hidden md:inline font-medium">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
