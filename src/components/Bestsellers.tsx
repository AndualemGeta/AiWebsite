import { useState, useMemo } from "react";
import { MenuItem } from "../types";
import { MENU_ITEMS } from "../data";
import { Star, Flame, ShoppingBag, SlidersHorizontal, Eye, FlameKindling, Info } from "lucide-react";

interface BestsellersProps {
  onAddToBag: (item: MenuItem, customization?: any[]) => void;
  onSelectForBuilder: (item: MenuItem) => void;
  searchFilter: string;
  onClearSearch: () => void;
}

type MenuCategory = "all" | "burgers" | "chicken" | "sides" | "drinks" | "desserts";

export default function Bestsellers({ 
  onAddToBag, 
  onSelectForBuilder, 
  searchFilter,
  onClearSearch 
}: BestsellersProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [sortBy, setSortBy] = useState<"popularity" | "price-asc" | "price-desc" | "calories-asc" | "calories-desc">("popularity");
  const [selectedQuickViewItem, setSelectedQuickViewItem] = useState<MenuItem | null>(null);

  const categories: { label: string; value: MenuCategory }[] = [
    { label: "All Items", value: "all" },
    { label: "Flame-Grilled Burgers", value: "burgers" },
    { label: "Crispy Chicken Selection", value: "chicken" },
    { label: "Crown Sides & Snacks", value: "sides" },
    { label: "Molten Desserts", value: "desserts" },
    { label: "Refreshing Drinks", value: "drinks" },
  ];

  // Process filters, searching, and sorting
  const filteredItems = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Filter by Category
    if (activeCategory !== "all") {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by Natural search query from header (AI search or manual)
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(q) || 
          item.description.toLowerCase().includes(q) ||
          item.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sort Items
    result.sort((a, b) => {
      if (sortBy === "popularity") {
        return b.reviewsCount - a.reviewsCount; // Highly reviewed items first
      } else if (sortBy === "price-asc") {
        return a.price - b.price;
      } else if (sortBy === "price-desc") {
        return b.price - a.price;
      } else if (sortBy === "calories-asc") {
        return a.calories - b.calories;
      } else if (sortBy === "calories-desc") {
        return b.calories - a.calories;
      }
      return 0;
    });

    return result;
  }, [activeCategory, sortBy, searchFilter]);

  return (
    <section className="bg-brand-cream py-16 sm:py-20 relative border-t border-brand-brown/10 font-sans" id="menu">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-brand-red/10 border border-brand-red/20 px-4 py-1.5 rounded-full">
            <FlameKindling className="h-4 w-4 text-brand-red fill-brand-red animate-pulse" />
            <span className="text-xs font-mono tracking-[0.15em] text-brand-red font-black uppercase">
              FLAME-GRILLED REALNESS
            </span>
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-brand-brown uppercase mt-3 tracking-tight">
            Royal Core Kiosk Menu
          </h2>
          <p className="text-brand-brown/80 text-base mt-2 font-medium">
            Fresh fire-grilled 100% thick beef, hand-prepared daily. Pick your favorite base item below, customize toppings with our AI-powered helper, or order directly to your door!
          </p>
        </div>

        {/* Global Active Search Ticker */}
        {searchFilter.trim() && (
          <div className="mb-8 p-4 bg-white border-2 border-brand-red/30 rounded-2xl flex items-center justify-between max-w-2xl mx-auto shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 bg-brand-red rounded-full animate-ping shrink-0" />
              <p className="text-sm text-brand-brown">
                Active menu filters: <span className="font-black text-brand-red">"{searchFilter}"</span> 
                <span className="text-xs text-brand-brown/65 ml-1">({filteredItems.length} items found)</span>
              </p>
            </div>
            <button 
              onClick={onClearSearch}
              className="text-xs underline text-brand-red hover:text-brand-red/80 font-black uppercase tracking-wider"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Category Selection Scrolling Bar */}
        <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-brand-brown/20 scrollbar-track-transparent justify-start lg:justify-center items-center space-x-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-3 rounded-full text-xs font-sans font-black uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer border-brand-brown/15 ${
                activeCategory === cat.value
                  ? "bg-brand-brown text-brand-cream border-brand-brown shadow-sm transform -translate-y-0.5"
                  : "bg-white text-brand-brown/85 hover:text-brand-brown hover:bg-brand-brown/5 hover:border-brand-brown/40"
              }`}
              id={`filter-tab-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sorting Controller Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white p-4.5 rounded-2xl border border-brand-brown/10 shadow-sm">
          <div className="flex items-center space-x-2 text-brand-brown/70 text-xs font-mono font-bold">
            <SlidersHorizontal className="h-4 w-4 text-brand-brown/50" />
            <span>SORTING SELECTION:</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto bg-brand-cream border border-brand-brown/20 focus:border-brand-red text-brand-brown text-xs font-bold rounded-xl px-4 py-2.5 outline-none cursor-pointer shadow-sm"
            >
              <option value="popularity">Most Loved (Popularity)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="calories-asc">Calories: Low to High</option>
              <option value="calories-desc">Calories: High to Low</option>
            </select>
          </div>
        </div>

        {/* Empty Search Fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white border border-brand-brown/15 rounded-2xl max-w-xl mx-auto shadow-sm">
            <Info className="h-12 w-12 text-brand-brown/30 mx-auto mb-3" />
            <h3 className="text-lg font-black text-brand-brown uppercase">No Matches In Kitchen</h3>
            <p className="text-sm text-brand-brown/70 px-4 mt-2 font-medium">
              We couldn't locate any products matching "{searchFilter}". Try looking for "Whopper", "Lava Cake", or check out our category filters.
            </p>
            <button 
              onClick={() => { setActiveCategory("all"); onClearSearch(); }}
              className="mt-5 bg-brand-red hover:bg-brand-red/90 text-white font-black text-xs px-6 py-3 rounded-xl uppercase transition-colors"
            >
              Reset Menu View
            </button>
          </div>
        )}

        {/* Kiosk Items Grid - Editorial Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-white rounded-3xl border-2 border-brand-brown/10 hover:border-brand-red overflow-hidden shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 relative group"
              id={`kiosk-card-${item.id}`}
            >
              {/* Image box */}
              <div className="relative h-44 bg-brand-cream overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Flame grille indicator icon overlay */}
                {item.isFlameGrilled && (
                  <div className="absolute bottom-3 left-3 bg-brand-brown text-brand-cream font-extrabold text-[9px] px-2.5 py-1 rounded-md z-10 flex items-center space-x-1 border border-brand-brown/20 shadow">
                    <Flame className="h-3 w-3 fill-brand-red text-brand-red shrink-0" />
                    <span className="tracking-widest uppercase">FLAME-GRILLED</span>
                  </div>
                )}

                {/* Quick view floating helper */}
                <button
                  onClick={() => setSelectedQuickViewItem(item)}
                  className="absolute top-3 right-3 h-8 w-8 bg-white/95 hover:bg-brand-brown text-brand-brown hover:text-brand-cream rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md focus:opacity-100"
                  title="Nutritional Details Quick View"
                >
                  <Eye className="h-4 w-4" />
                </button>

                {/* BestSeller tag overlay */}
                {item.bestSeller && (
                  <div className="absolute top-3 left-3 bg-brand-red text-white font-extrabold text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow">
                    Bestseller
                  </div>
                )}
              </div>

              {/* Card Main Body */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                
                {/* Meta details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-brand-brown/60">
                    <span className="bg-brand-cream text-brand-brown font-extrabold px-2 py-0.5 rounded">{item.calories} KCAL</span>
                    <div className="flex items-center space-x-0.5 text-brand-red">
                      <Star className="h-3.5 w-3.5 fill-brand-red shrink-0" />
                      <span className="font-extrabold text-brand-brown">{item.rating}</span>
                      <span className="text-brand-brown/55 font-sans font-medium">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-sans font-black text-lg text-brand-brown group-hover:text-brand-red transition-colors uppercase leading-none min-h-[1.5rem]">
                    {item.name}
                  </h3>
                  
                  <p className="text-[11px] leading-relaxed text-brand-brown/70 font-medium line-clamp-2 h-8">
                    {item.description}
                  </p>
                </div>

                {/* Action CTA modules */}
                <div className="pt-3 border-t border-brand-brown/10">
                  <div className="flex items-center justify-between mb-3.5">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-brand-brown/50 block">DELIVER PRICE</span>
                      <span className="text-xl font-black text-brand-red">${item.price.toFixed(2)}</span>
                    </div>
                    {item.customizable && (
                      <button
                        onClick={() => onSelectForBuilder(item)}
                        className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-brown/70 hover:text-brand-red underline transition-colors cursor-pointer"
                        id={`kiosk-card-custom-lnk-${item.id}`}
                      >
                        Custom Toppings
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToBag(item)}
                    className="w-full h-10 bg-brand-red hover:bg-brand-red/90 active:scale-98 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm"
                    id={`kiosk-card-add-btn-${item.id}`}
                  >
                    <ShoppingBag className="h-4 w-4 shrink-0" />
                    <span>ADD TO ROYAL ORDER</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Quick View Stats Modal - Clean Print layout style */}
      {selectedQuickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-brown/60 backdrop-blur-sm">
          <div className="bg-brand-cream border-2 border-brand-brown rounded-3xl overflow-hidden max-w-lg w-full text-brand-brown shadow-2xl relative">
            <div className="relative h-48 bg-brand-brown/5">
              <img 
                src={selectedQuickViewItem.image} 
                alt={selectedQuickViewItem.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-transparent to-transparent pointer-events-none" />
              <button 
                onClick={() => setSelectedQuickViewItem(null)}
                className="absolute top-4 right-4 h-8 w-8 bg-brand-brown text-brand-cream hover:bg-brand-red hover:text-white rounded-full flex items-center justify-center font-bold transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-brand-red font-black bg-brand-red/10 px-2.5 py-1 rounded">
                  {selectedQuickViewItem.category} • {selectedQuickViewItem.calories} Calories
                </span>
                <h3 className="font-sans font-black text-2.5xl uppercase mt-2 text-brand-brown leading-tight">{selectedQuickViewItem.name}</h3>
                <p className="text-brand-brown/80 text-xs mt-2 font-medium leading-relaxed">{selectedQuickViewItem.description}</p>
              </div>

              {/* Health Grid / Nutrition Facts */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono bg-white p-3.5 rounded-2xl border border-brand-brown/10 shadow-sm">
                <div className="border-r border-brand-brown/15 pr-1">
                  <span className="block text-brand-brown/50 text-[9px] uppercase font-bold">FAT</span>
                  <span className="font-black text-brand-red">24g</span>
                </div>
                <div className="border-r border-brand-brown/15 pr-1 pl-1">
                  <span className="block text-brand-brown/50 text-[9px] uppercase font-bold">PROTEIN</span>
                  <span className="font-black text-brand-red">32g</span>
                </div>
                <div className="border-r border-brand-brown/15 pr-1 pl-1">
                  <span className="block text-brand-brown/50 text-[9px] uppercase font-bold">CARBS</span>
                  <span className="font-black text-brand-red">45g</span>
                </div>
                <div className="pl-1">
                  <span className="block text-brand-brown/50 text-[9px] uppercase font-bold">SODIUM</span>
                  <span className="font-black text-brand-red">1.2g</span>
                </div>
              </div>

              {/* Footer pricing row */}
              <div className="flex items-center justify-between pt-4 border-t border-brand-brown/15">
                <div>
                  <span className="text-[10px] text-brand-brown/50 block uppercase font-bold">SINGLE ITEM PRICE</span>
                  <span className="text-2.5xl font-black text-brand-red">${selectedQuickViewItem.price.toFixed(2)}</span>
                </div>
                <div className="flex space-x-2">
                  {selectedQuickViewItem.customizable && (
                    <button
                      onClick={() => {
                        onSelectForBuilder(selectedQuickViewItem);
                        setSelectedQuickViewItem(null);
                      }}
                      className="bg-white border-2 border-brand-brown hover:bg-brand-brown/5 text-brand-brown font-black text-xs px-4 py-2.5 rounded-xl uppercase transition-colors"
                    >
                      Customise
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onAddToBag(selectedQuickViewItem);
                      setSelectedQuickViewItem(null);
                    }}
                    className="bg-brand-red hover:bg-brand-red/90 text-white font-black text-xs px-5 py-2.5 rounded-xl uppercase shadow-md"
                  >
                    Add directly
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
