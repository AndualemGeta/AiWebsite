import { useState, useEffect } from "react";
import { MenuItem, CustomizationOption, CartItem } from "../types";
import { CUSTOMIZATION_OPTIONS, MENU_ITEMS } from "../data";
import { Plus, Minus, Flame, Fuel, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";

interface MealBuilderProps {
  baseItem: MenuItem | null;
  onAddCustomizedToCart: (item: MenuItem, selectedCustomizations: { optionId: string; name: string; quantity: number; price: number; calories: number }[]) => void;
  onResetBuilderBase: () => void;
}

export default function MealBuilder({ baseItem, onAddCustomizedToCart, onResetBuilderBase }: MealBuilderProps) {
  // Find valid burger bases
  const burgerBases = MENU_ITEMS.filter((item) => item.category === "burgers" || item.id === "spicy-bk-chicken");
  const defaultBaseItem = burgerBases[0];

  // If baseItem is supplied from prop, update state
  const [activeBase, setActiveBase] = useState<MenuItem>(defaultBaseItem);

  useEffect(() => {
    if (baseItem) {
      setActiveBase(baseItem);
    }
  }, [baseItem]);

  // Keep track of active customization counts
  // e.g. { "american-cheese": 1, "bacon": 0 }
  const [choices, setChoices] = useState<Record<string, number>>({});

  // Reset choices if base hamburger changes
  useEffect(() => {
    const initialChoices: Record<string, number> = {};
    CUSTOMIZATION_OPTIONS.forEach((opt) => {
      initialChoices[opt.id] = 0; // default zero extra custom ingredients
    });
    setChoices(initialChoices);
  }, [activeBase]);

  // Helper adjustment triggers
  const handleUpdateQty = (optionId: string, delta: number, maxQty: number) => {
    setChoices((prev) => {
      const currentVal = prev[optionId] || 0;
      const newVal = Math.max(0, Math.min(maxQty, currentVal + delta));
      return { ...prev, [optionId]: newVal };
    });
  };

  // Pricing & Calorie additions calculation
  const calculations = (() => {
    let finalPrice = activeBase.price;
    let finalCalories = activeBase.calories;
    const itemizedList: { optionId: string; name: string; quantity: number; price: number; calories: number }[] = [];

    CUSTOMIZATION_OPTIONS.forEach((opt) => {
      const qty = choices[opt.id] || 0;
      if (qty > 0) {
        const optionCost = opt.price * qty;
        const optionCal = opt.calories * qty;
        finalPrice += optionCost;
        finalCalories += optionCal;
        itemizedList.push({
          optionId: opt.id,
          name: opt.name,
          quantity: qty,
          price: opt.price,
          calories: opt.calories,
        });
      }
    });

    return {
      price: finalPrice,
      calories: finalCalories,
      itemizedList,
    };
  })();

  const handleCreateOrder = () => {
    onAddCustomizedToCart(activeBase, calculations.itemizedList);
    // Reset counters after addition
    const resetChoices: Record<string, number> = {};
    CUSTOMIZATION_OPTIONS.forEach((opt) => {
      resetChoices[opt.id] = 0;
    });
    setChoices(resetChoices);
    onResetBuilderBase();
  };

  return (
    <section className="bg-[#FAF6F0] py-16 sm:py-20 border-t border-brand-brown/10 font-sans" id="builder">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 border border-brand-red/20 bg-brand-red/10 px-4 py-1.5 rounded-full text-xs font-mono text-brand-red font-extrabold uppercase">
            <Sparkles className="h-4 w-4 animate-spin-slow shrink-0" />
            <span>Interactive Kitchen Lab</span>
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-brand-brown uppercase mt-3 tracking-tight">
            Gourmet Meal Builder
          </h2>
          <p className="text-brand-brown/85 text-base mt-2 font-medium">
            Become the sovereign ruler of your meal. Pick a premium burger base, configure layering portions, and receive real-time nutrition and billing breakdowns. We assemble it exactly to specifications.
          </p>
        </div>

        {/* Builder Workdesk Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border-2 border-brand-brown/10 shadow-md relative">
          
          {/* Base Burger Select Sidebar (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono font-black text-brand-brown/55 tracking-wider">
              1. Choose Royal Base
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {burgerBases.map((burger) => (
                <button
                  key={burger.id}
                  onClick={() => setActiveBase(burger)}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-3 ${
                    activeBase.id === burger.id
                      ? "bg-brand-cream/80 border-brand-brown text-brand-brown font-black shadow-sm"
                      : "bg-[#FAF6F0]/40 border-brand-brown/10 hover:bg-brand-cream/40 hover:border-brand-brown/30 text-brand-brown/75"
                  }`}
                  id={`builder-base-selector-${burger.id}`}
                >
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="h-10 w-10 object-cover rounded-lg shrink-0 border border-brand-brown/10"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9px] uppercase tracking-wider text-brand-red mb-0.5 font-mono font-black">
                      BASE ITEM
                    </span>
                    <span className="block text-xs font-black truncate">
                      {burger.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-brand-cream/50 border border-brand-brown/10 p-4 rounded-xl text-[11px] text-brand-brown/80 font-medium flex items-start space-x-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>We assemble build orders using strict food-handling parameters. Your customizations are isolated in local cooking tiers!</span>
            </div>
          </div>

          {/* Interactive Stack Visual Canvas (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 border-y-2 lg:border-y-0 lg:border-x-2 border-brand-brown/10 px-4">
            <h4 className="text-xs uppercase font-mono font-black text-brand-brown/50 tracking-wider mb-6 text-center">
              Active Assembly Stack
            </h4>

            {/* Visual Assembly Layers Stack */}
            <div className="flex flex-col items-center select-none w-full max-w-[280px]">
              
              {/* TOP BUN */}
              <div className="w-full bg-[#E6CCB2] text-brand-brown border-2 border-brand-brown/30 rounded-t-full py-3.5 text-center text-[10px] font-mono uppercase tracking-widest font-black shadow-sm shrink-0 mb-1 z-25 relative">
                👑 Toasted Sesame Top Bun
              </div>

              {/* Dynamic Added layers stacked vertically */}
              {calculations.itemizedList.length === 0 ? (
                <div className="w-full border-2 border-dashed border-brand-brown/20 text-brand-brown/40 py-10 text-center text-xs font-mono rounded-lg my-1 font-bold">
                  [ Classic Base Portion Stack Only ]
                </div>
              ) : (
                <div className="w-full flex flex-col-reverse space-y-1 space-y-reverse my-1">
                  {calculations.itemizedList.map((item) => (
                    <div 
                      key={item.optionId}
                      className="w-full bg-brand-red text-white border border-brand-brown/15 rounded-lg py-2 px-3 text-center text-[10px] font-mono uppercase font-black flex items-center justify-between shadow-sm"
                    >
                      <span className="shrink-0 font-black text-brand-cream">🔥 + {item.name}</span>
                      <span className="bg-brand-brown/20 px-2 py-0.5 rounded text-[9px]">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* BOTTOM BUN */}
              <div className="w-full bg-[#DDB892] text-brand-brown border-2 border-brand-brown/30 rounded-b-xl py-2.5 text-center text-[10px] font-mono uppercase tracking-widest font-black shadow-sm mt-1 shrink-0">
                Toasted Sesame Bottom Bun
              </div>

            </div>

            {/* Live Counter Display */}
            <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
              <div className="bg-[#FAF6F0] p-3 rounded-2xl border border-brand-brown/10 shadow-sm">
                <span className="block text-[9px] text-brand-brown/45 font-mono font-bold uppercase">TOTAL WEIGHT</span>
                <span className="text-base font-black text-brand-brown">{calculations.calories} kcal</span>
              </div>
              <div className="bg-[#FAF6F0] p-3 rounded-2xl border border-brand-brown/10 shadow-sm">
                <span className="block text-[9px] text-brand-brown/45 font-mono font-bold uppercase">TOTAL COST</span>
                <span className="text-base font-black text-brand-red">${calculations.price.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* Configuration Grid & Add-to-bag module (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono font-black text-brand-brown/55 tracking-wider">
                2. Customize Ingredients
              </h4>
              
              {/* Modifier options list */}
              <div className="grid grid-cols-1 gap-2.5 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-brand-brown/25">
                {CUSTOMIZATION_OPTIONS.map((opt) => {
                  const qty = choices[opt.id] || 0;
                  return (
                    <div
                      key={opt.id}
                      className="bg-[#FAF6F0]/70 border border-brand-brown/10 hover:border-brand-brown/30 rounded-2xl p-3 flex items-center justify-between transition-colors"
                      id={`builder-ingredient-opt-${opt.id}`}
                    >
                      <div className="space-y-0.5">
                        <span className="block text-xs font-black text-brand-brown">{opt.name}</span>
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-brand-brown/60 font-bold">
                          <span>+${opt.price.toFixed(2)}</span>
                          <span>•</span>
                          <span>+{opt.calories} kcal</span>
                        </div>
                      </div>

                      {/* Incrementor counters */}
                      <div className="flex items-center space-x-3 bg-white px-2 py-1 rounded-xl border border-brand-brown/15 shadow-sm">
                        <button
                          onClick={() => handleUpdateQty(opt.id, -1, opt.maxQty)}
                          disabled={qty === 0}
                          className="h-7 w-7 bg-[#FAF6F0] hover:bg-brand-cream border border-brand-brown/10 disabled:opacity-35 disabled:hover:bg-[#FAF6F0] text-brand-brown rounded-lg flex items-center justify-center font-bold cursor-pointer transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono font-black text-sm text-brand-red w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(opt.id, 1, opt.maxQty)}
                          disabled={qty === opt.maxQty}
                          className="h-7 w-7 bg-[#FAF6F0] hover:bg-brand-brown hover:text-brand-cream border border-brand-brown/10 disabled:opacity-35 disabled:hover:bg-[#FAF6F0] text-brand-brown rounded-lg flex items-center justify-center font-bold cursor-pointer transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Combo-Upsell Offer banner and submit Button */}
            <div className="pt-4 border-t border-brand-brown/10 flex flex-col space-y-4">
              <div className="bg-brand-red/10 border border-brand-red/20 p-3.5 rounded-2xl flex items-center space-x-3">
                <Flame className="h-5 w-5 text-brand-red fill-brand-red shrink-0" />
                <p className="text-[11px] text-brand-brown/85 font-medium leading-snug">
                  <span className="font-black text-brand-red uppercase">Chef's Gourmet Hack:</span> Adding <span className="text-brand-red font-black">Thick-Cut Smoked Bacon</span> and our <span className="text-brand-brown font-black">Extra Flame-Grilled Patty</span> matches wonderfully with the zesty BBQ profiles of sesame bases!
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-brand-brown/45 block">TOTAL SPEC CALCULATION</span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-2.5xl font-black text-brand-red">${calculations.price.toFixed(2)}</span>
                    <span className="text-[11px] text-brand-brown/60 font-mono font-bold">({calculations.calories} kcal)</span>
                  </div>
                </div>

                <button
                  onClick={handleCreateOrder}
                  className="bg-brand-brown hover:bg-brand-red text-brand-cream hover:text-white font-sans font-black text-xs h-13 px-6 md:px-8 rounded-xl flex items-center justify-center space-x-2 shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  id="meal-builder-add-basket-btn"
                >
                  <ShoppingBag className="h-4 w-4 shrink-0" />
                  <span>ADD CUSTOM CREATION</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
