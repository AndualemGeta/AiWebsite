import { ShieldAlert, Award, QrCode, ArrowDownRight, Smartphone, Star } from "lucide-react";
import appMockup from "../assets/images/app_phone_mockup_1781257174735.jpg";

export default function AppPromo() {
  return (
    <section className="bg-stone-955 py-16 sm:py-20 overflow-hidden" id="app">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* App graphics mockup (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center items-center relative" id="app-visual-portal">
            
            {/* Visual glow backdrop */}
            <div className="absolute h-96 w-96 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

            {/* Float badge */}
            <div className="absolute top-10 right-4 sm:right-10 bg-amber-500 border border-amber-600 text-stone-950 px-4 py-2.5 rounded-2xl shadow-xl z-10 rotate-6 font-sans font-black text-xs">
              👑 FREE DELIVERY ON APP
            </div>

            {/* Smart Phone Wrapper */}
            <div className="relative w-[280px] sm:w-[330px] rounded-3xl overflow-hidden border-8 border-stone-800 shadow-[0_25px_60px_rgba(245,158,11,0.15)] bg-stone-900 group">
              <img 
                src={appMockup} 
                alt="Burger King Royal App UI Screenshot Mockup" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent p-5 text-center">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold">
                  PERKS DASHBOARD
                </span>
                <p className="text-xs text-stone-300 font-sans mt-1">
                  Track crowns and trigger single-tap ordering!
                </p>
              </div>
            </div>

            {/* QR Code Quick Scan component */}
            <div className="absolute -bottom-6 left-6 bg-stone-900 border-2 border-stone-800 rounded-2xl p-3 shadow-2xl hidden sm:flex items-center space-x-3 z-10 max-w-[210px]">
              <QrCode className="h-10 w-10 text-amber-500 shrink-0" />
              <div>
                <span className="block text-[9px] font-mono font-bold text-stone-400 uppercase">SCAN TO DOWNLOAD</span>
                <span className="text-[11px] font-black text-amber-100 flex items-center">
                  Get Free Whopper <ArrowDownRight className="h-3 w-3 ml-0.5 text-amber-500" />
                </span>
              </div>
            </div>

          </div>

          {/* Marketing Copy details (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left" id="app-text-billboard">
            
            <div className="inline-flex self-center lg:self-start items-center space-x-1.5 bg-red-950/40 text-red-400 font-bold px-3 py-1 rounded-full text-xs uppercase font-mono border border-red-500/30">
              <Smartphone className="h-3.5 w-3.5 shrink-0" />
              <span>THE ALL-NEW ROYAL APP 2026 EDITION</span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-amber-50 leading-tight uppercase">
              Order Faster. <br />
              Assemble More Rewards.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Unlock the full sovereignty of your fast-food cravings. The Burger King Royal Perks app consolidates quick ordering, customizable meal specifications, local driver telemetry, and double point-tier progression into a seamless hand-held hub. 
            </p>

            {/* Perks bullet layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-stone-900/60 border border-stone-850 p-4 rounded-2xl flex items-start space-x-3 text-left">
                <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500 shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-50 uppercase">Exclusive Coupon Tier</h4>
                  <p className="text-xs text-stone-400 mt-1">Unlock discount formulas that outer web channels cannot provide.</p>
                </div>
              </div>

              <div className="bg-stone-900/60 border border-stone-850 p-4 rounded-2xl flex items-start space-x-3 text-left">
                <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500 shrink-0">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-50 uppercase">Express Curbside Sync</h4>
                  <p className="text-xs text-stone-400 mt-1">Place order and drive. Our geofence GPS notifies the kitchen for fresh bagging upon arrival.</p>
                </div>
              </div>
            </div>

            {/* App download badges */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
              
              {/* Apple Custom badge */}
              <a 
                href="#download-apple"
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-850 text-white border border-stone-800 rounded-xl px-4.5 py-2 flex items-center justify-center space-x-3 transition-colors shrink-0 max-w-[200px]"
                onClick={(e) => { e.preventDefault(); alert("BK App downloads initialized. Claiming your 200 free signup Crowns!"); }}
              >
                <span className="text-2xl"></span>
                <div className="text-left">
                  <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none">DOWNLOAD ON THE</span>
                  <span className="text-xs font-black font-sans leading-none">App Store</span>
                </div>
              </a>

              {/* Android Custom badge */}
              <a 
                href="#download-google"
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-850 text-white border border-stone-800 rounded-xl px-4.5 py-2 flex items-center justify-center space-x-3 transition-colors shrink-0 max-w-[200px]"
                onClick={(e) => { e.preventDefault(); alert("Google Play Store connection secure. BK Royal App installing!"); }}
              >
                <span className="text-xl text-green-550">▲</span>
                <div className="text-left">
                  <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none">GET IT ON</span>
                  <span className="text-xs font-black font-sans leading-none">Google Play</span>
                </div>
              </a>

            </div>

            {/* Ratings summary */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 pt-2 text-xs font-mono text-stone-400">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span className="text-amber-100 font-extrabold font-sans">4.9★ Average</span>
              <span>across Apple & Android systems.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
