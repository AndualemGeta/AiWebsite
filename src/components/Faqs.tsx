import { useState } from "react";
import { FAQS } from "../data";
import { HelpCircle, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState<"all" | "ordering" | "rewards" | "nutrition" | "franchise">("all");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const categories: { label: string; value: typeof activeCategory }[] = [
    { label: "All Questions", value: "all" },
    { label: "Order & Dispatch", value: "ordering" },
    { label: "Royal Perks Club", value: "rewards" },
    { label: "Nutrition & Allergens", value: "nutrition" },
    { label: "Franchising Operations", value: "franchise" },
  ];

  const filteredFaqs = FAQS.filter(
    (faq) => activeCategory === "all" || faq.category === activeCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-stone-950 py-16 sm:py-20" id="faqs">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 border border-stone-800 bg-stone-900 px-3 py-1 rounded-full text-xs font-mono text-stone-400 font-bold uppercase">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>KNOWLEDGE INDEX</span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-amber-50 uppercase mt-3">
            Common Inquiries
          </h2>
          <p className="text-stone-400 text-sm mt-2 font-sans">
            Have questions about nutrition cards, Royal Perks tiers, driver zones, or franchise liquid capital schedules? Consult our fast-search categories below.
          </p>
        </div>

        {/* Category Toggles bar */}
        <div className="flex flex-wrap gap-2 justify-center items-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setActiveCategory(cat.value); setExpandedFaqId(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-extrabold transition-all border cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-amber-500 text-stone-950 border-amber-500 shadow-sm"
                  : "bg-stone-900 text-stone-300 border-stone-850 hover:bg-stone-850 hover:text-white"
              }`}
              id={`faq-tab-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List Stack */}
        <div className="space-y-3" id="faq-accordions-group">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-stone-900 border border-stone-850 rounded-2xl overflow-hidden transition-all"
                id={`faq-row-${faq.id}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between space-x-4 hover:bg-stone-850/40 text-stone-200 hover:text-white transition-colors cursor-pointer"
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="font-sans font-extrabold text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg bg-stone-950 shrink-0 border border-stone-850 text-amber-500">
                    {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {/* Animated drawer content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[300px] border-t border-stone-850/50" : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans bg-stone-900/40">
                    {faq.answer}
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
