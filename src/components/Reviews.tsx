import { useEffect, useState } from "react";
import { Review } from "../types";
import { CUSTOMER_REVIEWS } from "../data";
import { Star, ShieldCheck, HeartPulse, Sparkles, MessageSquareDot } from "lucide-react";

export default function Reviews() {
  const [activeFomoIndex, setActiveFomoIndex] = useState(0);
  const [fomoVisible, setFomoVisible] = useState(true);

  const mockLiveOrders = [
    { name: "John S.", location: "Portland, OR", item: "Double Bacon King™ Deal", time: "Just now", icon: "🥓" },
    { name: "Sasha P.", location: "Miami, FL", item: "Plant-Based Impossible™ Whopper", time: "1 min ago", icon: "🌱" },
    { name: "Marcus T.", location: "Chicago, IL", item: "Warm Chocolate Lava Cake Combo", time: "2 mins ago", icon: "🍫" },
    { name: "Sarah K.", location: "Dallas, TX", item: "Redeemed 750 Crowns: Free Whopper!", time: "3 mins ago", icon: "👑" },
    { name: "Devon L.", location: "Brooklyn, NY", item: "Triple America Cheeseburger Bundle", time: "4 mins ago", icon: "🔥" },
  ];

  // Rotate FOMO live feed every 6 seconds with subtle slide/fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFomoVisible(false);
      setTimeout(() => {
        setActiveFomoIndex((prev) => (prev + 1) % mockLiveOrders.length);
        setFomoVisible(true);
      }, 400); // fade out length
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const activeOrder = mockLiveOrders[activeFomoIndex];

  return (
    <section className="bg-stone-900 py-16 sm:py-20 relative" id="reviews">
      
      {/* Floating FOMO Toast Notification (Bottom Left Corner) */}
      <div 
        className={`fixed bottom-6 left-6 z-40 bg-stone-950 border-2 border-amber-500/40 text-stone-100 rounded-2xl p-3.5 shadow-2xl max-w-[280px] sm:max-w-[320px] transition-all duration-500 transform ${
          fomoVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
        }`}
        id="fomo-live-feed-toast"
      >
        <div className="flex items-start space-x-3">
          <span className="text-2xl bg-stone-900 h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
            {activeOrder.icon}
          </span>
          <div className="space-y-0.5">
            <span className="block text-[8px] font-mono tracking-widest text-amber-500 uppercase font-black">
              LIVE SIMULATOR FEED
            </span>
            <p className="text-xs text-stone-200">
              <span className="font-bold text-amber-100">{activeOrder.name}</span> in <span className="text-stone-400">{activeOrder.location}</span> ordered the <span className="font-bold text-amber-400">{activeOrder.item}</span>.
            </p>
            <div className="flex items-center space-x-1.5 pt-1 text-[9px] font-mono text-stone-500">
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-ping" />
              <span>{activeOrder.time}</span>
              <span>•</span>
              <span>Direct Order Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 border border-amber-500/20 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-mono text-amber-400 font-bold uppercase">
            <MessageSquareDot className="h-4 w-4 shrink-0" />
            <span>SOCIAL PROOF & FEEDBACK</span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-amber-50 uppercase mt-3">
            What Royal Members Say
          </h2>
          <p className="text-stone-400 text-sm mt-2 font-sans">
            Our customers count on authentic, mouth-watering quality. Read thoughts from verified dining guests, app members, and real multi-unit franchise operators.
          </p>
        </div>

        {/* Global ratings dashboard */}
        <div className="bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-850 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center mb-12">
          
          <div className="space-y-1">
            <span className="text-stone-400 text-xs tracking-wider uppercase block font-mono">GLOBAL DINING RATING</span>
            <div className="flex items-center justify-center space-x-1.5 pt-1">
              <span className="text-4xl font-black text-amber-500 font-sans tracking-tight">4.9</span>
              <span className="text-stone-500 text-sm font-bold">/ 5.0</span>
            </div>
            <div className="flex justify-center text-amber-550 space-x-0.5">
              <Star className="h-4 w-4 fill-amber-500 text-amber-550" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-550" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-550" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-550" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-550" />
            </div>
          </div>

          <div className="border-y md:border-y-0 md:border-x border-stone-900 py-6 md:py-0 space-y-1">
            <span className="text-stone-400 text-xs tracking-wider uppercase block font-mono">VERIFIED DINERS</span>
            <span className="text-3xl font-black text-amber-200 block font-sans tracking-tight">324,500+</span>
            <p className="text-[10px] text-stone-500">Reviews submitted across unified systems quarterly.</p>
          </div>

          <div className="space-y-1.5">
            <span className="text-stone-400 text-xs tracking-wider uppercase block font-mono">RECOMMENDED SCORE</span>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-amber-400 fill-amber-400/10 shrink-0" />
              <span className="text-2xl font-black text-amber-500 font-sans">98.4%</span>
            </div>
            <p className="text-[10px] text-stone-500">Would recommend Burger King's fire-grilled recipes over griddle formats.</p>
          </div>

        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-950 p-6 rounded-2xl border border-stone-850 hover:border-amber-500/30 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl transition-all"
              id={`review-card-${rev.id}`}
            >
              <div className="space-y-3">
                
                {/* Rating row with verified tick */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 space-x-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {rev.verified && (
                    <div className="flex items-center space-x-1.5 text-xs text-green-500 bg-green-950/20 px-2 py-0.5 rounded-full border border-green-500/10 font-mono">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-[9px] uppercase tracking-wider font-extrabold">VERIFIED EXP</span>
                    </div>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs leading-relaxed text-stone-300 font-sans italic">
                  "{rev.text}"
                </p>

              </div>

              {/* User Bio Footer */}
              <div className="flex items-center space-x-3 pt-4 border-t border-stone-900">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="h-10 w-10 object-cover rounded-full border-2 border-stone-800"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-sans font-black text-xs text-stone-100 uppercase leading-none">
                    {rev.name}
                  </h4>
                  <span className="text-[9px] text-stone-500 font-mono">
                    Purchased: {rev.item} • {rev.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
