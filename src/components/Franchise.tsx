import React, { useState } from "react";
import { DollarSign, ShieldAlert, Users, TrendingUp, Building2, Send, CheckCircle } from "lucide-react";
import { FranchiseInquiry } from "../types";

export default function Franchise() {
  const [units, setUnits] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FranchiseInquiry>({
    name: "",
    email: "",
    phone: "",
    market: "",
    capital: 500000,
    experience: "none",
    message: "",
  });

  // Calculate projected investment needs based on target units
  const netWorthNeeded = 1500000 * units;
  const liquidNeeded = 500000 * units;
  const franchiseFee = 50000 * units;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capital" ? parseInt(value) : value,
    }));
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name || !formData.email || !formData.phone || !formData.market) {
      alert("Please complete the required fields so our franchise directory can locate your market.");
      return;
    }

    setFormSubmitted(true);
  };

  return (
    <section className="bg-stone-900 py-16 sm:py-20" id="franchise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 border border-amber-500/20 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-mono text-amber-500 font-bold uppercase">
            <Building2 className="h-4 w-4 shrink-0" />
            <span>GLOBAL PARTNERSHIP NETWORK</span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-amber-50 uppercase mt-3">
            Franchise Expansion Program
          </h2>
          <p className="text-stone-400 text-sm mt-2 font-sans">
            Burger King is expanding in high-growth territories. Partner with an iconic global brand backed by standard culinary logistics, active national marketing campaigns, and exceptional ROI track records.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start" id="franchise-portal-grid">
          
          {/* Interactive Calculator Dashboard (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6" id="franchise-calculator-panel">
            
            <div className="bg-stone-950 p-6 sm:p-8 border border-stone-850 rounded-3xl space-y-6 shadow-xl text-stone-200">
              <div className="flex items-center justify-between border-b border-stone-900 pb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-amber-500 shrink-0" />
                  <h4 className="font-sans font-black text-base text-amber-50 uppercase">
                    Investment Projection Calculator
                  </h4>
                </div>
                <span className="text-xs text-amber-500 font-mono tracking-wide font-extrabold bg-amber-500/10 px-2.5 py-1 rounded">
                  {units} {units === 1 ? "Store Model" : "Multi-Store Cluster"}
                </span>
              </div>

              {/* Slider Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span className="uppercase">Target Number of Restaurants:</span>
                  <span className="font-bold text-amber-500 text-sm">{units} Restaurant Unit(s)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={units}
                  onChange={(e) => setUnits(parseInt(e.target.value))}
                  className="w-fullaccent-amber-500 bg-stone-900 rounded-lg cursor-pointer h-2"
                  id="franchise-range-slider"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>1 Store</span>
                  <span>5 Stores</span>
                  <span>10 Stores Bundle</span>
                </div>
              </div>

              {/* Output parameters grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-900">
                <div className="bg-stone-900 p-4 rounded-xl border border-stone-850">
                  <span className="block text-[10px] text-stone-500 font-mono uppercase">MIN. NET WORTH NEEDED</span>
                  <span className="text-lg font-black text-amber-500 font-sans">${(netWorthNeeded / 1000000).toFixed(1)}M</span>
                  <span className="block text-[9px] text-stone-400 font-mono mt-0.5">Verified Asset Base</span>
                </div>

                <div className="bg-stone-900 p-4 rounded-xl border border-stone-850">
                  <span className="block text-[10px] text-stone-500 font-mono uppercase">MIN. LIQUID NEEDED</span>
                  <span className="text-lg font-black text-amber-500 font-sans">${liquidNeeded >= 1000000 ? `${(liquidNeeded / 1000000).toFixed(1)}M` : `${liquidNeeded / 1000}k`}</span>
                  <span className="block text-[9px] text-stone-400 font-mono mt-0.5">Unencumbered cash</span>
                </div>

                <div className="bg-stone-900 p-4 rounded-xl border border-stone-850">
                  <span className="block text-[10px] text-stone-500 font-mono uppercase">DISPATCH FEE PROJ.</span>
                  <span className="text-lg font-black text-amber-500 font-sans">${franchiseFee / 1000}k</span>
                  <span className="block text-[9px] text-stone-400 font-mono mt-0.5">Fixed initial fee</span>
                </div>
              </div>

              {/* Tier Details copy */}
              <div className="bg-stone-900/50 p-4 rounded-xl border border-stone-850 text-xs">
                <span className="block font-mono font-bold text-[10px] text-amber-500 uppercase mb-1">
                  {units >= 5 ? "⭐️ PREMIUM CLUSTER PRIVILEGES ENABLED" : "STANDARD OPERATOR TIER"}
                </span>
                <p className="text-stone-400 leading-relaxed text-[11px]">
                  {units >= 5 
                    ? "Invesment tier unlocks Area Development priority agreements, discounted franchise cluster fee rates, and direct seat on regional operational advisory panels."
                    : "Individual store model, incorporating comprehensive site analysis support, global supply chain onboarding, and full manager training suite."}
                </p>
              </div>

            </div>

            {/* Franchise Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-850 flex items-start space-x-3 text-stone-300">
                <Users className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wide font-black text-amber-50">Sovereign Supply Line</h4>
                  <p className="text-[11px] text-stone-400 mt-1">Consolidated purchasing volume locks in favorable rates on all fresh beef ingredients.</p>
                </div>
              </div>

              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-850 flex items-start space-x-3 text-stone-300">
                <DollarSign className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wide font-black text-amber-50">National Ad Campaigns</h4>
                  <p className="text-[11px] text-stone-400 mt-1">Beneficiary of multimillion dollar TV, digital, and social advertisement pushes.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact capturing form (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-stone-950 border border-stone-850 p-6 sm:p-8 rounded-3xl" id="franchise-inquiry-box">
            
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4" id="franchise-submitted-panel">
                <div className="h-14 w-14 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto border border-green-500/20">
                  <CheckCircle className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="font-sans font-black text-xl text-amber-50 uppercase">Inquiry Filed</h3>
                <p className="text-xs text-stone-300 px-2 leading-relaxed">
                  Thank you, <span className="text-amber-500 font-bold">{formData.name}</span>. Your capital selection has triggered cluster prioritization route. A Senior Regional Director in <span className="text-amber-500 font-bold">{formData.market}</span> will call you within 24 hours to schedule a confidential diagnostic.
                </p>
                <div className="text-[10px] font-mono text-stone-500 pt-4 uppercase border-t border-stone-900">
                  CONFIRMATION ID: BK-INC-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="border-b border-stone-900 pb-3">
                  <h3 className="font-sans font-black text-lg text-amber-50 uppercase">Inquiry Application</h3>
                  <span className="text-[10px] text-stone-500 font-mono block uppercase">DIRECT DISCLOSURE FOR PRIORITY PIPELINE</span>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="E.g. Alex Grayson"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-stone-900 border border-stone-850 focus:border-amber-500 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs outline-none font-sans"
                  />
                </div>

                {/* Email address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-stone-400 block">E-mail Address:</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-stone-900 border border-stone-850 focus:border-amber-500 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs outline-none font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Telephone Number:</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 012-3456"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-stone-900 border border-stone-850 focus:border-amber-500 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Market interest */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Proposed Market interest (Region/City):</label>
                  <input
                    type="text"
                    name="market"
                    required
                    placeholder="E.g. Chicago Metro Area, IL"
                    value={formData.market}
                    onChange={handleInputChange}
                    className="w-full bg-stone-900 border border-stone-850 focus:border-amber-500 text-stone-300 px-3.5 py-2.5 rounded-xl text-xs outline-none font-sans"
                  />
                </div>

                {/* Operating experience */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Multi-Unit Operating Experience:</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-stone-900 border border-stone-850 focus:border-amber-500 text-stone-300 px-3.5 py-2.5 rounded-xl text-xs outline-none font-sans"
                  >
                    <option value="none">No restaurant operating experience</option>
                    <option value="single">Single unit operator background</option>
                    <option value="multi">Experienced multi-unit operator (2-5 units)</option>
                    <option value="enterprise">Enterprise franchisee (5+ units)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Operational Qualifications / Capital Disclosures:</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Disclose any secondary operating partnerships, net worth metrics, or territory goals..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-stone-900 border border-stone-850 focus:border-amber-500 text-stone-300 px-3.5 py-2.5 rounded-xl text-xs outline-none font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-amber-500 hover:bg-amber-600 cursor-pointer active:scale-98 text-stone-950 font-sans font-black text-xs rounded-xl tracking-wide transition-all flex items-center justify-center space-x-2 shadow-md uppercase"
                  id="franchise-submit-btn"
                >
                  <Send className="h-4 w-4" />
                  <span>TRANSMIT CONFIDENTIAL DOSSIER</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
