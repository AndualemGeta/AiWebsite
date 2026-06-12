import { Award, Crown, CheckCircle2, ShoppingBag, Flame } from "lucide-react";
import royalCrown from "../assets/images/royal_perks_1781257157514.jpg";

interface LoyaltyProps {
  points: number;
  onSimulatePurchase: (amount: number) => void;
  onRedeemReward: (rewardId: string, cost: number, name: string) => void;
}

export default function Loyalty({ points, onSimulatePurchase, onRedeemReward }: LoyaltyProps) {
  const milestones = [
    { id: "reward-fries", name: "Crispy Golden Fries (Small)", cost: 250, desc: "Salty thick-cut hot potatoes" },
    { id: "reward-shake", name: "Royal Oreo Shake™", cost: 500, desc: "Creamy whipped soft-serve dream" },
    { id: "reward-whopper", name: "Flame-Grilled Whopper®", cost: 750, desc: "A quarter-pound of signature fire-grilled beef" },
  ];

  // Calculate percentages toward next milestones
  const progressPercent = Math.min(100, Math.round((points / 750) * 100));

  return (
    <section className="bg-brand-cream py-16 sm:py-20 border-t border-brand-brown/10 font-sans" id="perks">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Layout Split */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Informative copy pane (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col space-y-6" id="perks-marketing-billboard">
            
            <div className="inline-flex self-start items-center space-x-1.5 bg-brand-red/10 border border-brand-red/20 px-4 py-1.5 rounded-full text-xs font-mono font-black text-brand-red uppercase">
              <Crown className="h-4 w-4 fill-brand-red shrink-0" />
              <span>THE ROYAL PERKS GLORY CLUB</span>
            </div>

            <h2 className="font-sans font-black text-3.5xl sm:text-4xl lg:text-5xl text-brand-brown leading-tight uppercase tracking-tight">
              Rule Your Crown Points. <br />
              Receive Supreme Rewards.
            </h2>

            <p className="text-brand-brown/85 text-sm sm:text-base font-sans font-medium leading-relaxed">
              Why buy simple fast food when you can accumulate imperial currency? Earn <span className="text-brand-red font-black">10 Crowns for every $1</span> spent online, in-app, or via curbside checkout. Redemptions start at just 250 points. Join our inner sovereign tier today!
            </p>

            {/* Loyalty Milestone progression bar */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-brown/10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-brand-brown/60 block uppercase font-mono font-bold">YOUR ACTIVE CROWN TREASURY</span>
                  <span className="text-2.5xl font-black text-brand-brown">{points} Crowns</span>
                </div>
                <span className="text-[10px] text-brand-red font-mono font-black bg-brand-red/10 border border-brand-red/25 px-2.5 py-1 rounded">
                  {progressPercent}% unlocked to Whopper® Title
                </span>
              </div>

              {/* Real CSS Progress Track */}
              <div className="relative w-full h-3 bg-[#FAF6F0] rounded-full overflow-hidden border border-brand-brown/15">
                <div 
                  className="absolute h-full bg-brand-red transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Small milestones ticks indicators */}
              <div className="flex justify-between text-[10px] font-mono text-brand-brown/65 pt-1 font-bold">
                <span>0 Pts</span>
                <span>250 Pts (Fries)</span>
                <span>500 Pts (Shake)</span>
                <span>750 Pts (Whopper!)</span>
              </div>
            </div>

            {/* Interactive simulator controls - HIGH CRO POWER */}
            <div className="bg-brand-red/5 border-2 border-dashed border-brand-red/30 p-5 rounded-2xl space-y-4">
              <div className="flex items-center space-x-2">
                <Flame className="h-4 w-4 text-brand-red animate-pulse fill-brand-red shrink-0" />
                <h4 className="text-xs uppercase font-mono font-black text-brand-red">
                  LOYALTY SIMULATION MODULE
                </h4>
              </div>
              <p className="text-xs text-brand-brown/75 font-semibold">
                Test the loyalty engine! Tap these mock-purchase actions to add crown points. Experience how points accumulate and allow instant reward redemption.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSimulatePurchase(3.50)}
                  className="bg-white hover:bg-brand-cream text-brand-brown font-black border border-brand-brown/15 hover:border-brand-brown text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                  id="simulate-small-purchase"
                >
                  Simulate Small Fries Purchase (Earn 35 Crown Pts)
                </button>
                <button
                  onClick={() => onSimulatePurchase(19.99)}
                  className="bg-white hover:bg-brand-cream text-brand-brown font-black border-2 border-brand-red/30 hover:border-brand-red text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer text-brand-red shadow-sm"
                  id="simulate-family-purchase"
                >
                  Simulate Burger Family Deal Purchase (Earn 200 Crown Pts)
                </button>
              </div>
            </div>

          </div>

          {/* Crown visual & Redeemers (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6" id="perks-redemption-portal">
            
            {/* Crown illustration wrapper */}
            <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-brand-brown/10 shrink-0 group shadow-md">
              <img 
                src={royalCrown} 
                alt="Burger King Royal Crown on Chocolate Velvet Cushion" 
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-103"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="block text-[10px] font-mono tracking-widest text-[#E29578] font-black uppercase">
                  ROYAL SIGNATURE SYMBOL
                </span>
                <span className="text-sm font-black uppercase text-white font-sans mt-0.5 block">
                  Imperial Perks Crowns
                </span>
              </div>
            </div>

            {/* List of active unlocks */}
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase font-mono font-black text-brand-brown/60 tracking-wider">
                Perks Redemption Grid
              </h4>

              {milestones.map((item) => {
                const canRedeem = points >= item.cost;
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 bg-white border rounded-2xl flex items-center justify-between transition-colors ${
                      canRedeem 
                        ? "border-brand-red/40 hover:border-brand-red shadow-sm" 
                        : "border-brand-brown/10 opacity-70"
                    }`}
                    id={`perk-redeem-item-${item.id}`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-sans font-black text-brand-brown uppercase">{item.name}</span>
                        {canRedeem && <CheckCircle2 className="h-4 w-4 text-[#2D6A4F] shrink-0 fill-brand-cream" />}
                      </div>
                      <p className="text-[10px] text-brand-brown/65 leading-normal font-semibold">{item.desc}</p>
                    </div>

                    <div className="text-right ml-4">
                      {canRedeem ? (
                        <button
                          onClick={() => onRedeemReward(item.id, item.cost, item.name)}
                          className="bg-brand-red hover:bg-[#D4A373] cursor-pointer active:scale-97 text-white h-8 px-4 rounded-xl font-black text-[10px] uppercase font-sans flex items-center space-x-1 shrink-0 shadow"
                          id={`perk-claim-btn-${item.id}`}
                        >
                          <ShoppingBag className="h-3 w-3 shrink-0" />
                          <span>Redeem Free</span>
                        </button>
                      ) : (
                        <span className="text-xs font-mono font-black text-brand-brown/50 bg-[#FAF6F0] border border-brand-brown/10 px-2.5 py-1 rounded inline-block shrink-0">
                          {item.cost} Crowns
                        </span>
                      )}
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
