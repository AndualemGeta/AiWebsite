import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Award, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { CartItem } from "../types";

interface ChefAssistantProps {
  activeCart: CartItem[];
  onAddMenuItemByName: (name: string) => void;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChefAssistant({ activeCart, onAddMenuItemByName }: ChefAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Greetings, hungry monarch! I am **Chef Royal**, your dedicated culinary advisor. Tell me your calorie goals, budget, or ingredient preferences, and I will design the perfect fire-grilled feast!" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pre-programmed conversion chips for the user
  const quickChips = [
    "High Protein spec burger",
    "High Calorie fuel combos",
    "Meal pairing under 500 kcal",
    "How do Perks Crowns milestones work?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: messages.slice(-5), // slide window of history consistency
          activeCart,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        // Fallback local heuristic helper if Gemini API is not provisioned
        const reply = handleLocalFallbackChefAnswer(textToSend);
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      }
    } catch (err) {
      console.error("AI Assistant connection error:", err);
      const reply = handleLocalFallbackChefAnswer(textToSend);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } finally {
      setLoading(false);
    }
  };

  // Safe offline backup to sustain the high-converting UX if API Key is unavailable
  const handleLocalFallbackChefAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("protein") || q.includes("muscle") || q.includes("meat")) {
      return `For a **High Protein Powerhouse**, I strongly recommend our **Double Bacon King™**. It features two 1/4 lb flame-grilled beef patties and thick smoked bacon packed with **over 52g protein**! 
      
*Up-selling tip:* Pair it with our crispy **Golden Thick-Cut Fries** to fuel your day!`;
    }
    if (q.includes("calorie") || q.includes("diet") || q.includes("light") || q.includes("500") || q.includes("healthy")) {
      return `For a fantastic diet alignment under **550 kcal**, select the **Royal Spicy Chicken Sandwich** (590 kcal) or replace burger patties with a lettuce wraps.

*Culinary tip:* Complete your light meal with refreshing diet soda lines or small golden french fries!`;
    }
    if (q.includes("crown") || q.includes("perk") || q.includes("point") || q.includes("money")) {
      return `Our **Royal Perks Club** allows you to earn **10 Crowns for every single dollar spent**! 
* Milestones unlock at **250 Crowns** (Free small fries)
* Intermediate milestones unlock at **500 Crowns** (Royal Oreo Shake)
* Grand crown unlocks at **750 Crowns** (Double Flame-Grilled Whopper!)`;
    }
    return `That culinary path sounds delicious! Our flame-grilled **Whopper** and customized toppings (thick bacon, onion rings, flame sauce) pair perfectly together. 

Feel free to customize your selection using our interactive **Gourmet Meal Builder** or ask me something else!`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" id="ai-chef-consultant-widget">
      
      {/* Floating Widget Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 bg-brand-red hover:bg-brand-brown active:scale-95 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-brand-cream hover:border-white group cursor-pointer transition-all hover:rotate-6 relative"
          id="ai-widget-trigger"
        >
          <MessageSquare className="h-6 w-6 transform group-hover:scale-105" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-brown border border-brand-cream text-[8px] text-white font-extrabold items-center justify-center">
              AI
            </span>
          </span>
        </button>
      )}

      {/* Expanded Chat Dialog Capsule */}
      {isOpen && (
        <div 
          className="bg-[#F5EBE0] border-2 border-brand-brown rounded-3xl overflow-hidden w-[320px] sm:w-[380px] h-[480px] flex flex-col justify-between shadow-2xl font-sans text-brand-brown"
          id="ai-chat-capsule"
        >
          {/* Header */}
          <div className="p-4 bg-[#FAF6F0] border-b border-brand-brown/15 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-2.5 w-2.5 bg-[#4F772D] rounded-full animate-ping shrink-0" />
              <div>
                <h4 className="font-sans font-black text-xs text-brand-brown uppercase tracking-wide">
                  Chef Royal Advisor
                </h4>
                <span className="text-[9px] text-brand-red font-mono block uppercase leading-none font-extrabold">
                  Gemini-Powered Culinary LLM
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-brand-brown/70 hover:text-brand-brown bg-brand-cream rounded-lg border border-brand-brown/10 hover:border-brand-brown/30 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Dialogue list view */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-brand-brown/20 scrollbar-track-transparent bg-white/45 text-xs font-sans"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`p-3 max-w-[82%] leading-relaxed rounded-2xl shadow-sm ${
                    m.sender === "user"
                      ? "bg-brand-brown text-brand-cream font-bold rounded-tr-none"
                      : "bg-white text-brand-brown rounded-tl-none border border-brand-brown/10 font-medium"
                  }`}
                >
                  {/* Primitive rendering is supported, split lines optionally */}
                  <p className="whitespace-pre-line leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="p-3 bg-white border border-brand-brown/10 rounded-2xl rounded-tl-none text-brand-brown/50 flex items-center space-x-2 shadow-sm">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-red" />
                  <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-brand-brown/70">Grilling formulation...</span>
                </div>
              </div>
            )}
          </div>

          {/* Prompt quickchips and entry field */}
          <div className="p-3.5 bg-[#FAF6F0] border-t border-brand-brown/15 space-y-3.5 shrink-0">
            
            {/* Quick Chips Selection */}
            <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-none pr-1">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  disabled={loading}
                  className="bg-white hover:bg-brand-cream text-brand-brown font-black border border-brand-brown/15 hover:border-brand-brown rounded-full px-2.5 py-1 text-[9px] uppercase tracking-wide whitespace-nowrap transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(userInput);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask Chef: 'Low carb combo suggestions?'"
                value={userInput}
                disabled={loading}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-white border border-brand-brown/25 focus:border-brand-red pl-3.5 pr-2 py-2.5 rounded-xl text-xs outline-none flex-1 text-brand-brown font-bold placeholder-brand-brown/40 disabled:opacity-50 font-sans shadow-sm"
              />
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className="p-2.5 bg-brand-red hover:bg-[#D4A373] disabled:opacity-40 text-white rounded-xl transition-all h-9 flex items-center justify-center shrink-0 w-9 font-bold cursor-pointer"
              >
                <Send className="h-4 w-4 shrink-0" />
              </button>
            </form>

          </div>

        </div>
      )}

    </div>
  );
}
