import { useEffect, useState } from "react";
import { PromoDeal } from "../types";
import { CURRENT_DEALS } from "../data";
import { Clock, Tag, Flame, ShoppingBag } from "lucide-react";

interface FeaturedOffersProps {
  onAddDealToCart: (deal: PromoDeal) => void;
}

export default function FeaturedOffers({ onAddDealToCart }: FeaturedOffersProps) {
  // We want to calculate ticking count downs for all three deals
  const [deals, setDeals] = useState<PromoDeal[]>([]);

  useEffect(() => {
    // Initialize deals on load
    setDeals(CURRENT_DEALS.map(d => ({ ...d })));

    const timer = setInterval(() => {
      setDeals((prevDeals) =>
        prevDeals.map((deal) => {
          if (deal.secondsRemaining <= 1) {
            // Loop code or reset to original deal hours to maintain simulator realism
            return { ...deal, secondsRemaining: deal.expiryHours * 3600 };
          }
          return { ...deal, secondsRemaining: deal.secondsRemaining - 1 };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="bg-brand-brown/5 py-16 sm:py-20 border-t border-brand-brown/10" id="deals">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-brand-brown/15 pb-6">
          <div>
            <div className="inline-flex items-center space-x-1 bg-brand-red/10 text-brand-red font-extrabold px-3 py-1 rounded-full text-xs uppercase font-mono border border-brand-red/20">
              <Tag className="h-3 w-3" />
              <span>Limited-Time Flash Packs</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-brown uppercase mt-2">
              Hot Flame Deals <span className="text-brand-red font-mono">🔥</span>
            </h2>
            <p className="text-brand-brown/75 text-sm mt-1 max-w-xl font-medium">
              Lock in premium value packages. Claim these exclusive app-grade promotional codes directly into your order line. Urgency guaranteed.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-brand-brown font-mono text-xs bg-brand-cream px-3 py-2 rounded-xl border border-brand-brown/15 shadow-sm">
            <span className="h-2 w-2 bg-brand-red rounded-full animate-ping" />
            <span className="font-black uppercase">CRITICAL CODES UPDATING LIVE</span>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => {
            const savings = deal.originalPrice - deal.dealPrice;
            const savingsPercent = Math.round((savings / deal.originalPrice) * 100);

            return (
              <div 
                key={deal.id}
                className="flex flex-col bg-white rounded-2xl border-2 border-brand-brown/10 hover:border-brand-red overflow-hidden shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 relative group"
                id={`deal-card-${deal.id}`}
              >
                {/* Savings Badge */}
                <div className="absolute top-4 left-4 bg-brand-red text-white font-black text-xs px-3.5 py-1.5 rounded-full z-10 shadow-md">
                  SAVE {savingsPercent}%
                </div>

                {/* Promo Category Badge */}
                <div className="absolute top-4 right-4 bg-brand-cream/90 text-brand-brown border border-brand-brown/20 font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider z-10 font-mono">
                  {deal.badge}
                </div>

                {/* Deal Image header */}
                <div className="relative h-48 overflow-hidden bg-brand-cream shrink-0">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/30 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Countdown clock HUD overlay */}
                  <div className="absolute bottom-3 left-4 right-4 bg-brand-brown/95 rounded-xl px-3 py-1.5 flex items-center justify-between text-brand-cream font-mono text-xs border border-brand-brown/20 shadow-md">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-red animate-spin-slow shrink-0" />
                      <span className="font-extrabold tracking-tight uppercase text-[9px] text-brand-cream/80">OFFER EXPIRES IN</span>
                    </div>
                    <span className="font-black text-sm text-brand-red tracking-wider">
                      {formatCountdown(deal.secondsRemaining)}
                    </span>
                  </div>
                </div>

                {/* Deal Details */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4 bg-white">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                        Code: {deal.code}
                      </span>
                      <span className="text-xs text-brand-red font-black uppercase flex items-center space-x-0.5">
                        <Flame className="h-3 w-3 fill-brand-red shrink-0" />
                        <span>FAST SELLING</span>
                      </span>
                    </div>
                    <h3 className="font-sans font-black text-lg text-brand-brown group-hover:text-brand-red transition-colors uppercase leading-snug">
                      {deal.title}
                    </h3>
                    <p className="text-xs text-brand-brown/70 font-sans leading-relaxed">
                      {deal.description}
                    </p>
                  </div>

                  {/* Financial calculation & CTA */}
                  <div className="pt-3 border-t border-brand-brown/10">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[10px] text-brand-brown/50 block uppercase font-mono">ROYAL MEMBER DEAL</span>
                        <div className="flex items-baseline space-x-2">
                          <span className="font-sans font-black text-2.5xl text-brand-red">${deal.dealPrice.toFixed(2)}</span>
                          <span className="text-xs text-brand-brown/40 line-through">${deal.originalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-brand-red block uppercase font-mono">YOUR DISCOUNT</span>
                        <span className="text-xs font-bold text-brand-red">-${savings.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddDealToCart(deal)}
                      className="w-full h-11 bg-brand-brown hover:bg-brand-red text-brand-cream hover:text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm"
                      id={`deal-claim-btn-${deal.id}`}
                    >
                      <ShoppingBag className="h-4 w-4 shrink-0" />
                      <span>CLAIM AND ADD TO BASKET</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
