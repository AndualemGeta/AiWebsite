import { useEffect, useState } from "react";
import { X, Gift, Sparkles, Flame, Check } from "lucide-react";

interface ExitIntentPopupProps {
  onApplyPromoCode: (code: string) => void;
}

export default function ExitIntentPopup({ onApplyPromoCode }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // If we've already shown it in this session, skip
    const sessionSeen = sessionStorage.getItem("exit_promo_seen");
    if (sessionSeen === "true") {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If cursor leaves the top boundary of document view (clientY < 10)
      if (e.clientY < 15 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exit_promo_seen", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleClaimOffer = () => {
    onApplyPromoCode("BAGGERVIP");
    setIsCopied(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      
      {/* Modal Card */}
      <div 
        className="bg-stone-900 border-4 border-amber-500/50 rounded-3xl overflow-hidden max-w-md w-full p-6 text-stone-100 shadow-2xl relative text-center space-y-6"
        id="exit-intent-card"
      >
        {/* Dismiss Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 bg-stone-950 rounded-full border border-stone-850 text-stone-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-2 pt-4">
          <div className="h-14 w-14 bg-red-650/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/10 animate-bounce">
            <Gift className="h-7 w-7 text-amber-500 animate-pulse fill-amber-500/10" />
          </div>
          
          <div className="inline-flex items-center space-x-1 font-mono text-[9px] uppercase bg-amber-500/10 text-amber-500 px-2.5 py-0.5 rounded font-bold">
            <Sparkles className="h-3 w-3" />
            <span>WAIT! SEVER LOGISTICS SECURED</span>
          </div>

          <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-amber-50">
            Don't Rule Your Hunger <br />
            <span className="text-amber-500">On An Empty Basket!</span>
          </h3>
          
          <p className="text-xs text-stone-300 px-4 leading-relaxed">
            Grab our exclusive regional discount coupon code before you depart. Lock in <span className="text-amber-400 font-extrabold">15% SAVINGS</span> on your entire first order.
          </p>
        </div>

        {/* Coupon Display Box */}
        <div className="bg-stone-950 border-2 border-dashed border-stone-800 p-4 rounded-2xl">
          <span className="block text-[8px] text-stone-500 uppercase font-mono tracking-wider">YOUR ROYAL CODE:</span>
          <span className="text-2xl font-mono font-black text-amber-400 block tracking-widest mt-1">
            BAGGERVIP
          </span>
        </div>

        {/* Action button */}
        <div className="space-y-3">
          <button
            onClick={handleClaimOffer}
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-stone-955 rounded-xl font-sans font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
            id="exit-intent-claim-btn"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 shrink-0" />
                <span>COUPON CLAIMED & APPLIED!</span>
              </>
            ) : (
              <>
                <Flame className="h-4 w-4 fill-stone-950 shrink-0" />
                <span>APPLY 15% AND STAY</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="text-[10px] font-mono text-stone-500 hover:text-stone-300 underline uppercase cursor-pointer block mx-auto"
          >
            No thanks, I will pay full price
          </button>
        </div>

      </div>

    </div>
  );
}
