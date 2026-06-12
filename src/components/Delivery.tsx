import React, { useState } from "react";
import { DELIVERY_PARTNERS } from "../data";
import { MapPin, Search, Navigation, ShieldCheck, HelpCircle } from "lucide-react";

export default function Delivery() {
  const [zipCode, setZipCode] = useState("");
  const [checkResult, setCheckResult] = useState<{
    success: boolean;
    message: string;
    avgTime: string;
    detailsList: typeof DELIVERY_PARTNERS;
  } | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipCode.trim();
    
    if (!/^\d{5}$/.test(cleanZip)) {
      setCheckResult({
        success: false,
        message: "Invalid ZIP. Please enter a valid 5-digit US ZIP Code (e.g. 90210).",
        avgTime: "",
        detailsList: [],
      });
      return;
    }

    // Dynamic, simulated result calculation based on the digits of ZIP
    const prefix = parseInt(cleanZip.substring(0, 1));
    const isSpecialOutpost = prefix === 0 || prefix === 9; // simulated outskirts
    
    const calculatedPartners = DELIVERY_PARTNERS.map((p) => {
      // simulate speed adjustments based on ZIP
      const randomMinutesShift = (cleanZip.charCodeAt(4) % 5) - 2; // -2 to +2
      const baseMinutes = parseInt(p.deliveryTimeRange.split(" - ")[0]);
      const maxMinutes = parseInt(p.deliveryTimeRange.split(" - ")[1]);
      const finalBase = Math.max(12, baseMinutes + randomMinutesShift);
      const finalMax = Math.max(20, maxMinutes + randomMinutesShift);
      return {
        ...p,
        deliveryTimeRange: `${finalBase} - ${finalMax} mins`,
      };
    });

    setCheckResult({
      success: true,
      message: `Excellent news! Full Royal Coverage confirmed for ZIP: ${cleanZip}. We have 3 kitchens within 4.5 miles of your coordinates!`,
      avgTime: isSpecialOutpost ? "24 mins" : "18 mins",
      detailsList: calculatedPartners,
    });
  };

  return (
    <section className="bg-stone-950 py-16 sm:py-20" id="delivery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Layout Partition */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Active Checker console (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 bg-stone-900 border-2 border-stone-850 p-6 sm:p-8 rounded-3xl relative z-10" id="delivery-search-outpost">
            
            <div className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-amber-500 fill-amber-500/20 animate-pulse" />
              <h3 className="font-sans font-black text-xl text-amber-50 uppercase">
                Direct Dispatch Portal
              </h3>
            </div>
            
            <p className="text-xs text-stone-400 font-sans">
              Enter your residential ZIP code to parse nearby fire-grille kitchens and verify direct tracking integration with UberEats, DoorDash, and BK Direct.
            </p>

            <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-2 relative">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-3 h-5 w-5 text-stone-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter 5-digit ZIP Code"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 text-stone-200 pl-11 pr-4 py-3 rounded-xl text-sm outline-none font-mono"
                  id="delivery-zip-input"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 cursor-pointer active:scale-98 text-stone-950 font-sans font-black text-xs h-12 px-6 rounded-xl flex items-center justify-center space-x-1.5 shrink-0 transition-all font-bold"
                id="delivery-zip-check-submit"
              >
                <Search className="h-4 w-4" />
                <span>CHECK STATUS</span>
              </button>
            </form>

            {/* Results Console */}
            {checkResult && (
              <div className={`p-4.5 rounded-2xl border text-xs leading-relaxed font-sans ${
                checkResult.success 
                  ? "bg-green-950/20 border-green-500/30 text-green-300" 
                  : "bg-red-950/20 border-red-500/30 text-red-300"
              }`}>
                <p className="font-bold uppercase tracking-wider text-[10px] mb-1.5 font-mono">
                  {checkResult.success ? "✓ COORDINATE UNLOCKED" : "⚠ SYSTEM EXCEPTION"}
                </p>
                <p className="font-sans">{checkResult.message}</p>
                {checkResult.success && (
                  <div className="mt-2 text-[11px] font-mono font-bold text-amber-500 uppercase">
                    AVERAGE DISPATCH WAIT: {checkResult.avgTime}
                  </div>
                )}
              </div>
            )}

            {/* Micro delivery benefit badges */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-850 text-stone-400 text-[11px]">
              <div className="flex items-start space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Oxygen Sealed Foil Bagging</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Real-Time Driver GPS Tracking</span>
              </div>
            </div>

          </div>

          {/* Partner lists (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col space-y-6" id="delivery-partner-portal">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stone-500 block uppercase">FLEXIBLE COURIER CHANNELS</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-amber-50 uppercase leading-tight">
                Integrations with Premium Delivery Networks.
              </h2>
              <p className="text-stone-300 text-sm font-sans max-w-xl leading-relaxed">
                We maintain direct API bridges with the nation's premier food logistics channels. Pick your favorite courier below. However, we highly suggest ordering <span className="text-amber-500 font-bold">BK Direct</span> to earn double Royal Perks Crowns and locking in our best price guarantees!
              </p>
            </div>

            {/* List block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(checkResult && checkResult.success ? checkResult.detailsList : DELIVERY_PARTNERS).map((partner) => {
                const isBKDirect = partner.name.includes("BK Direct");
                return (
                  <div
                    key={partner.name}
                    className={`bg-stone-900 border rounded-2xl p-4.5 flex flex-col justify-between space-y-4 transition-all ${
                      isBKDirect 
                        ? "border-amber-500/50 shadow-[0_4px_15px_rgba(245,158,11,0.05)] bg-gradient-to-br from-stone-900 to-amber-950/20" 
                        : "border-stone-850 hover:border-stone-800"
                    }`}
                    id={`partner-row-${partner.name.replace(/\s+/g, "-")}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="h-10 w-10 text-2xl bg-stone-950 rounded-xl flex items-center justify-center shrink-0">
                          {partner.logo}
                        </span>
                        <div>
                          <h4 className="font-sans font-black text-sm text-stone-100 uppercase">
                            {partner.name}
                          </h4>
                          <span className="text-[10px] text-stone-500 font-mono">
                            FEE: ${partner.fee.toFixed(2)} • Rating {partner.rating}★
                          </span>
                        </div>
                      </div>

                      {isBKDirect && (
                        <span className="bg-amber-500 text-stone-950 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
                          Econ Pick
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-stone-850">
                      <div>
                        <span className="text-[8px] text-stone-500 block uppercase font-mono">ESTIMATED ETA</span>
                        <span className="text-xs font-bold text-amber-500 font-mono">{partner.deliveryTimeRange}</span>
                      </div>
                      
                      <span className="text-[10px] font-bold text-stone-400 bg-stone-950 px-2.5 py-1 rounded border border-stone-850 uppercase font-mono">
                        {partner.primaryCTA}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
