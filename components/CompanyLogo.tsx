"use client";

import React from "react";

interface CompanyLogoProps {
  className?: string;
  variant?: "full" | "icon" | "horizontal" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  invertCutout?: boolean;
  color?: string; // default #f37021
  textColor?: string;
}

export function CompanyLogoIcon({ 
  className = "w-10 h-10",
  color = "#f37021",
  cutoutColor = "white"
}: { 
  className?: string;
  color?: string;
  cutoutColor?: string;
}) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0, 10)">
        {/* Outer Circular Arc with lateral gap notches */}
        <path 
          d="M 105 240 A 185 185 0 0 1 395 240" 
          stroke={color} 
          strokeWidth="16" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M 98 255 A 185 185 0 0 1 100 270" 
          stroke={color} 
          strokeWidth="16" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M 400 255 A 185 185 0 0 1 402 270" 
          stroke={color} 
          strokeWidth="16" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M 108 285 A 185 185 0 0 0 392 285" 
          stroke={color} 
          strokeWidth="16" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* 10 Vertical Elevating / Electromechanical Bars */}
        <g fill={color}>
          <rect x="135" y="365" width="9" height="35" rx="3" />
          <rect x="156" y="365" width="9" height="52" rx="3" />
          <rect x="177" y="365" width="9" height="66" rx="3" />
          <rect x="198" y="365" width="9" height="76" rx="3" />
          <rect x="219" y="365" width="9" height="82" rx="3" />
          <rect x="240" y="365" width="9" height="84" rx="3" />
          <rect x="261" y="365" width="9" height="84" rx="3" />
          <rect x="282" y="365" width="9" height="82" rx="3" />
          <rect x="303" y="365" width="9" height="76" rx="3" />
          <rect x="324" y="365" width="9" height="66" rx="3" />
          <rect x="345" y="365" width="9" height="52" rx="3" />
          <rect x="366" y="365" width="9" height="35" rx="3" />
        </g>

        {/* Center Star */}
        <polygon 
          points="250,85 285,190 395,190 308,255 342,360 250,295 158,360 192,255 105,190 215,190" 
          fill={color} 
        />

        {/* Diagonal Orbit Ring */}
        <g transform="rotate(-18 250 220)">
          <path 
            d="M 60 220 C 60 170, 440 170, 440 220 C 440 270, 60 270, 60 220 Z" 
            stroke={cutoutColor} 
            strokeWidth="24" 
            fill="none" 
          />
          <path 
            d="M 60 220 C 60 176, 440 176, 440 220 C 440 264, 60 264, 60 220 Z" 
            stroke={color} 
            strokeWidth="15" 
            fill="none" 
          />
        </g>
      </g>
    </svg>
  );
}

export function CompanyLogo({
  className = "",
  variant = "horizontal",
  size = "md",
  color = "#f37021",
  textColor,
  invertCutout = false
}: CompanyLogoProps) {
  const cutout = invertCutout ? "#0f172a" : "#ffffff";

  if (variant === "icon") {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-14 h-14",
      xl: "w-20 h-20",
      custom: ""
    }[size];

    return (
      <CompanyLogoIcon 
        className={`${sizeClasses} ${className}`} 
        color={color} 
        cutoutColor={cutout} 
      />
    );
  }

  if (variant === "badge") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-11 h-11 bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-950/40 rounded-xl p-1.5 shadow-md shadow-orange-500/10 flex items-center justify-center shrink-0">
          <CompanyLogoIcon 
            className="w-full h-full" 
            color={color} 
            cutoutColor="transparent" 
          />
        </div>
        <div>
          <span className={`text-lg font-black tracking-tight block leading-tight font-display ${textColor || "text-slate-950 dark:text-white"}`}>
            SHINING STAR
          </span>
          <span className="text-[9.5px] font-extrabold tracking-wider text-[#f37021] uppercase block">
            ELECTRO MECHANICAL WORKS
          </span>
        </div>
      </div>
    );
  }

  if (variant === "full") {
    // Stacked vertical full logo
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <CompanyLogoIcon 
          className="w-28 h-28 mb-3" 
          color={color} 
          cutoutColor={cutout} 
        />
        <span className={`text-2xl font-black tracking-tight block leading-tight font-display text-[#f37021]`}>
          SHINING STAR
        </span>
        <span className={`text-xs font-black tracking-widest text-[#f37021] uppercase block mt-1`}>
          ELECTRO MECHANICAL WORKS
        </span>
      </div>
    );
  }

  // Default: Horizontal brand mark
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="w-11 h-11 bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/30 rounded-xl p-1.5 flex items-center justify-center shrink-0">
        <CompanyLogoIcon 
          className="w-full h-full" 
          color={color} 
          cutoutColor="transparent" 
        />
      </div>
      <div>
        <span className={`text-xl font-black tracking-tight block leading-tight font-display ${textColor || "text-slate-950 dark:text-white"}`}>
          SHINING STAR
        </span>
        <span className="text-[10px] font-black tracking-wider text-[#f37021] uppercase block">
          ELECTRO MECHANICAL WORKS
        </span>
      </div>
    </div>
  );
}

export default CompanyLogo;
