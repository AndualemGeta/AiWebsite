import React, { useState } from "react";
import { Twitter, Instagram, Youtube, Send, ShieldAlert, Check } from "lucide-react";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSignupSuccess(true);
      setEmailInput("");
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-200 border-t-2 border-amber-500/20 pt-16 pb-8" id="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top block (Branding and email Capture) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start pb-12 border-b border-stone-900">
          
          {/* Brand pillar (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-stone-950 font-black text-xl border border-amber-600 shadow-md">
                BK
              </div>
              <span className="font-sans font-black text-lg leading-none tracking-tight text-amber-500 uppercase">
                BURGER KING <span className="text-stone-300 font-mono text-xs block font-normal capitalize tracking-tight mt-0.5">Corporate Website Concept</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 font-sans leading-relaxed max-w-md">
              Burger King is committed to delivering premium quality, authentic flame-grilled beef menu choices, and transparent customer perks. All recipes comply with strict clean ingredient formulations.
            </p>

            {/* Social handles */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a href="#twitter" className="p-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-905 rounded-xl border border-stone-850 text-stone-400 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#instagram" className="p-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-905 rounded-xl border border-stone-850 text-stone-400 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#youtube" className="p-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-905 rounded-xl border border-stone-850 text-stone-400 transition-all">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Email capture pillar (Col 6-12) */}
          <div className="lg:col-span-7 space-y-4 lg:pl-10">
            <div>
              <h4 className="font-sans font-black text-sm uppercase text-amber-50">
                Unlock Royal Flash Coupons
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Enter your email address to register for regional flash bargains, special rewards multiplier codes, and secret menu releases.
              </p>
            </div>

            {signupSuccess ? (
              <div className="bg-green-950/20 border border-green-500/20 p-3 rounded-xl flex items-center space-x-2 text-xs text-green-300 max-w-md">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                <span>Success! Royal voucher code: <span className="font-mono font-bold text-amber-400">BAGGERVIP</span> sent to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="E.g. alex@domain.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-stone-900 border border-stone-850 focus:border-amber-500 text-stone-200 text-xs px-4 py-3 rounded-xl outline-none flex-1 font-sans"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 cursor-pointer active:scale-98 text-stone-950 px-5 py-3 rounded-xl text-xs font-sans font-black flex items-center justify-center space-x-1.5 shrink-0 transition-all font-bold"
                >
                  <Send className="h-3.5 w-3.5 shrink-0" />
                  <span>SUBSCRIBE</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright & disclosures */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 text-[11px] font-mono text-stone-500">
          
          <div className="text-center md:text-left space-y-1">
            <p>© 2026 Burger King Brand Inc. Mock conversion concept platform.</p>
            <p className="text-[10px]">UX/UI optimized with Antigravity server-logic structures.</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#privacy" className="hover:text-amber-500 underline">Privacy Policies</a>
            <a href="#terms" className="hover:text-amber-500 underline">Terms of Sovereignty</a>
            <a href="#cookies" className="hover:text-amber-500 underline">Cookie Consent</a>
            <a href="#nutrition" className="hover:text-amber-500 underline">Full Allergen PDF</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
