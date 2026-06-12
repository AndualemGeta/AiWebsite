import { Flame, Star, ShieldCheck, HeartPulse } from "lucide-react";

export default function BrandStory() {
  return (
    <section className="bg-[#F5EBE0]/60 py-16 sm:py-20 overflow-hidden relative border-t border-brand-brown/10" id="heritage">
      
      {/* Visual glowing flares */}
      <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-brand-red/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Narrative Content panel (Col 1) */}
          <div className="space-y-6 text-center lg:text-left relative z-10" id="brand-story-billboard">
            
            <div className="inline-flex self-center lg:self-start items-center space-x-1.5 border border-brand-red/20 bg-brand-red/10 text-brand-red px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase">
              <Flame className="h-4 w-4 fill-brand-red shrink-0" />
              <span>THE 1954 HERITAGE METIER</span>
            </div>

            <h2 className="font-sans font-black text-3.5xl sm:text-4xl lg:text-5xl text-brand-brown leading-tight uppercase tracking-tight">
              FLAME-GRILLING IS NOT <br />
              A MARKETING SHIELD. <br />
              <span className="text-brand-red font-mono">IT'S OUR METHODOLOGY.</span>
            </h2>

            <p className="text-brand-brown/85 text-sm sm:text-base font-sans font-medium leading-relaxed">
              At Burger King, we do not steam or flat-griddle our flagship patties. Since we fired up our first grill in 1954, we have chosen the difficult route: searing thick-cut 100% pure beef directly over open charcoal flames. This technique flash-heats patties within seconds, caramelizing natural fats and trapping smokey savory juices inside every bite. 
            </p>

            <p className="text-brand-brown/70 text-xs sm:text-sm font-sans font-semibold leading-relaxed">
              Our commitment goes beyond fire. Tomatoes and onions are sourced from regional farms and sliced fresh by hand in our kitchens daily. Our chicken uses entirely white breast breast portions, and our recipes contain zero artificial preservatives, MSG, or synthetic food colorings.
            </p>

            {/* Quality badge certifications */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-brown/15 mx-auto max-w-md lg:mx-0">
              <div className="flex items-start space-x-2.5 text-left">
                <ShieldCheck className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase text-brand-brown">100% Beef Guarantee</h4>
                  <p className="text-[10px] text-brand-brown/65 mt-1 font-bold">Single ingredient beef patties. No filler starches, gums, or additives.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 text-left">
                <HeartPulse className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase text-brand-brown">Real Food Pledge</h4>
                  <p className="text-[10px] text-brand-brown/65 mt-1 font-bold">Rigorous clean ingredient label goals across all dressings and pastries.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Visual presentation panel (Col 2) */}
          <div className="relative flex justify-center items-center" id="brand-story-infography">
            
            {/* Visual canvas */}
            <div className="relative w-full max-w-[440px] aspect-video sm:aspect-square bg-white rounded-3xl overflow-hidden border-2 border-brand-brown/10 p-6 sm:p-10 flex flex-col justify-between shadow-md">
              
              <div className="absolute top-0 right-0 h-44 w-44 bg-gradient-to-bl from-[#D4A373]/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <span className="text-[10px] text-brand-red font-mono tracking-widest block uppercase font-black">
                  KITCHEN SYSTEM PARAMETERS
                </span>
                
                <h3 className="font-sans font-black text-2xl uppercase text-brand-brown leading-tight">
                  How We Lock In Savory Smoke Profiles
                </h3>
                
                <p className="text-brand-brown/75 text-xs font-sans font-medium leading-relaxed">
                  Patties are placed on our custom proprietary chain-link flame broiler array. They travel through localized heat zones reaching <span className="font-bold text-brand-red">800°F</span>, searing both sides of the protein concurrently. Excess moisture runs off, maintaining optimal patty texture and delivering our trademark flame-kissed scoring look.
                </p>
              </div>

              {/* Dynamic stats HUD card */}
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-brand-brown/10 shadow-sm mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="border-r border-brand-brown/10 pr-2">
                  <span className="block text-[8px] text-brand-brown/50 font-mono font-bold uppercase">BROILER TEMPS</span>
                  <span className="text-lg font-black text-brand-red font-sans tracking-wide">800° F</span>
                </div>
                <div className="pl-2">
                  <span className="block text-[8px] text-brand-brown/50 font-mono font-bold uppercase">ESTABLISHED YEAR</span>
                  <span className="text-lg font-black text-brand-brown font-sans tracking-wide">1954</span>
                </div>
              </div>

              {/* Float visual emblem */}
              <div className="absolute -bottom-6 -right-6 h-28 w-28 border border-brand-brown/10 rounded-full scale-90 -z-5 pointer-events-none" />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
