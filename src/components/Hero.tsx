import { ShoppingCart, Download, ShieldCheck, Flame, Star, Clock } from "lucide-react";
import heroBurger from "../assets/images/hero_burger_1781257143934.jpg";

interface HeroProps {
  onOrderNowClick: () => void;
  onAppDownloadClick: () => void;
  onPerksClick: () => void;
}

export default function Hero({ onOrderNowClick, onAppDownloadClick, onPerksClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-cream pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20" id="hero">
      
      {/* Background glowing gradients styled within the editorial sandbox framework */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-red/5 via-brand-brown/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-brand-red/5 blur-[125px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-brown/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Flash Urgency Bar - Warm, high-contrast, editorial layout */}
        <div 
          onClick={onPerksClick}
          className="mx-auto mb-10 max-w-3xl rounded-2xl bg-brand-brown/5 hover:bg-brand-brown/10 border border-brand-brown/15 px-4 py-2.5 text-center text-xs text-brand-brown font-medium cursor-pointer transition-all flex items-center justify-center gap-2"
          id="hero-urgency-banner"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-brand-red animate-ping" />
          <span className="font-extrabold uppercase tracking-wide text-[10px] bg-brand-red text-brand-cream px-2 py-0.5 rounded shadow-sm">
            FLASH OFFER
          </span>
          <span className="font-bold">Claim 200 free Crown points instantly upon signup. Ends tonight!</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Copy (Editorial Magazine heavy lettering) */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left relative z-10" id="hero-marketing-panel">
            
            <div className="inline-flex self-center lg:self-start items-center space-x-2 bg-brand-brown text-brand-cream px-4 py-1.5 rounded-full">
              <Flame className="h-4 w-4 text-brand-red animate-pulse fill-brand-red" />
              <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold">
                FLAME-GRILLED REALNESS SINCE 1954
              </span>
            </div>

            <span className="text-brand-red font-black uppercase tracking-[0.3em] text-xs leading-none">TASTE THE FIRE</span>

            <h1 className="font-sans font-black tracking-tighter text-brand-brown text-5xl sm:text-7xl lg:text-8xl leading-[0.85] uppercase">
              Every Bite <br />
              <span className="text-brand-red">
                Deserves <br />
              </span>
              A Crown
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-brand-brown/80 font-medium leading-relaxed">
              Flame-grilled 100% beef, hand-cut vegetables, and our signature sauce. Delivered blistering hot to your door in under 30 mins. It isn't just fast food—it's royalty.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 border-y border-brand-brown/20 py-5 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block font-sans font-black text-3xl text-brand-red leading-none mb-1">100%</span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-brown/60">Pure Beef</span>
              </div>
              <div className="text-center lg:text-left border-x border-brand-brown/15 px-4">
                <span className="block font-sans font-black text-3xl text-brand-red leading-none mb-1">22 min</span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-brown/60">Est. Arrival</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-sans font-black text-3xl text-brand-red leading-none mb-1">2M+</span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-brown/60">Members</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
              
              <button
                onClick={onOrderNowClick}
                className="w-full sm:w-auto px-10 py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-black uppercase text-lg shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center space-x-3 group"
                id="hero-order-cta-btn"
              >
                <ShoppingCart className="h-5 w-5 transform transition-transform group-hover:-translate-x-1" />
                <span>GRAB THE DEAL</span>
              </button>

              <button
                onClick={onAppDownloadClick}
                className="w-full sm:w-auto px-10 py-5 bg-transparent text-brand-brown hover:bg-brand-brown/5 rounded-2xl font-black uppercase text-lg border-2 border-brand-brown transition-all flex items-center justify-center space-x-2"
                id="hero-download-cta-btn"
              >
                <Download className="h-5 w-5 text-brand-red" />
                <span>CUSTOMIZE MEAL</span>
              </button>
            </div>

            {/* Small trust signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-brand-brown/60 pt-4 font-mono">
              <div className="flex items-center space-x-1.5">
                <Star className="h-4.5 w-4.5 text-brand-red fill-brand-red shrink-0" />
                <span className="text-brand-brown font-black">4.9/5 RATING</span>
                <span>from loyal members</span>
              </div>
              <div className="flex items-center space-x-1.5 border-l border-brand-brown/20 pl-4">
                <Clock className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span className="text-brand-brown font-black">LIVE RADAR TRACKING</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Imagery (Asymmetrical Magazine composition) */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6" id="hero-image-billboard">
            
            {/* Visual background circle elements from description HTML */}
            <div className="absolute w-[500px] h-[500px] bg-brand-red rounded-full opacity-5 blur-[90px] -z-10" />
            <div className="absolute w-[440px] h-[440px] bg-brand-brown rounded-full opacity-5 rotate-12 -z-10" />

            {/* Floating bestseller product card (as requested) */}
            <div className="absolute -bottom-1 -right-2 sm:right-0 bg-white p-6 rounded-3xl shadow-2xl border border-brand-brown/10 max-w-[220px] z-30 transition-all hover:scale-103">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-1 rounded">
                  BESTSELLER
                </span>
                <span className="font-extrabold text-brand-brown">$8.49</span>
              </div>
              <h4 className="font-sans font-black uppercase text-sm text-brand-brown">The Bacon King</h4>
              <p className="text-[10px] text-brand-brown/70 leading-relaxed mb-4">
                Two 1/4 lb flame-grilled beef patties, topped with thick-cut smoked bacon.
              </p>
              <button 
                onClick={onOrderNowClick} 
                className="w-full py-2.5 bg-brand-cream text-brand-brown hover:bg-brand-brown hover:text-brand-cream rounded-lg text-xs font-black uppercase tracking-wider transition-all"
              >
                Add to Order
              </button>
            </div>

            {/* Main Picture Frame Tilt (Asymmetrical modern layout) */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-[80px] overflow-hidden bg-gradient-to-br from-orange-500 to-brand-red shadow-3xl transform -rotate-3 transition-transform duration-500 hover:rotate-0 group border-4 border-brand-brown">
              <img 
                src={heroBurger} 
                alt="Burger King Flame-Grilled Premium King Burger" 
                className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-transparent to-transparent opacity-85 pointer-events-none" />
              
              <div className="absolute bottom-8 inset-x-8 text-center sm:text-left">
                <div className="inline-flex items-center space-x-1.5 bg-brand-red text-white text-[9px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-md mb-2">
                  <Flame className="h-3 w-3 fill-white" />
                  <span>Flame Grilled</span>
                </div>
                <h4 className="text-2xl leading-none font-sans font-black uppercase text-brand-cream">
                  WHOPPER SELECTION
                </h4>
              </div>
            </div>

            {/* Decorative background lines */}
            <div className="absolute h-[105%] w-[105%] border-2 border-dashed border-brand-brown/10 rounded-full scale-90 -z-10 pointer-events-none" />

          </div>

        </div>

      </div>

    </section>
  );
}
