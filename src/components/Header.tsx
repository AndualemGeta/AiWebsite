import { Crown, ShoppingBag, Search, Menu, X, Gift } from "lucide-react";
import React, { useState } from "react";
import { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  perksPoints: number;
  onCartClick: () => void;
  onNavigate: (sectionId: string) => void;
  onChatClick: () => void;
  onSearchQuery: (query: string) => void;
}

export default function Header({
  cart,
  perksPoints,
  onCartClick,
  onNavigate,
  onChatClick,
  onSearchQuery,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: "Flame-Grilled Menu", id: "menu" },
    { name: "Daily Perks & Deals", id: "deals" },
    { name: "Gourmet Builder", id: "builder" },
    { name: "Royal Perks Club", id: "perks" },
    { name: "Franchise Program", id: "franchise" },
    { name: "Our Heritage", id: "heritage" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-cream/95 text-brand-brown shadow-sm backdrop-blur-md border-b-2 border-brand-brown/10">
      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* BK Branding */}
        <div 
          onClick={() => handleLinkClick("hero")}
          className="flex cursor-pointer items-center space-x-2 relative group"
          id="header-brand-logo"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-brand-cream font-black text-xl border-2 border-brand-brown/30 shadow-sm transform transition-transform group-hover:scale-105 group-hover:rotate-6">
            BK
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black text-2xl leading-[0.9] tracking-tighter text-brand-red uppercase">
              BURGER <br /><span className="text-brand-brown">KING</span>
            </span>
          </div>
          <div className="absolute -top-3 -left-3 rotate-12">
            <Crown className="h-4.5 w-4.5 fill-amber-300 text-brand-brown animate-pulse" />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="font-sans font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer relative py-2 group text-brand-brown/80 hover:text-brand-red"
              id={`nav-link-${link.id}`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red transition-all duration-350 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Header CTA & Actions */}
        <div className="flex items-center space-x-4">
          
          {/* AI Advisor Quick Button */}
          <button
            onClick={onChatClick}
            className="hidden md:flex items-center space-x-1.5 bg-brand-brown hover:bg-brand-brown/90 text-brand-cream px-4.5 py-2.5 rounded-full font-bold uppercase text-xs shadow-md transition-all transform hover:scale-103 active:scale-97"
            id="ai-coach-shortcut-btn"
          >
            <Gift className="h-4 w-4 text-brand-red" />
            <span>AI Menu Chef</span>
          </button>

          {/* Search Bar Trigger */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center absolute right-0 -top-4 bg-white border-2 border-brand-brown/20 rounded-full overflow-hidden max-w-[280px] shadow-sm">
                <input
                  type="text"
                  placeholder="What's your craving..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-transparent text-sm pl-4 pr-2 py-1.5 outline-none text-brand-brown placeholder-brand-brown/50 w-48 sm:w-60 font-sans"
                  autoFocus
                />
                <button type="submit" className="p-2 text-brand-red hover:text-brand-red/90">
                  <Search className="h-4 w-4" />
                </button>
                <button 
                  type="button" 
                  onClick={() => setSearchOpen(false)} 
                  className="p-2 text-brand-brown/65 hover:text-brand-brown"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-brand-brown/80 hover:text-brand-red transition-colors"
                title="AI Powered Search"
                id="search-trigger-btn"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Crown Perk Score */}
          <div 
            onClick={() => handleLinkClick("perks")}
            className="flex cursor-pointer items-center space-x-1 bg-brand-brown/5 border border-brand-brown/15 hover:border-brand-brown/40 hover:bg-brand-brown/10 rounded-full px-3 py-1.5 transition-colors"
            title="Your Crown Points balance (Earned in simulator!)"
            id="perks-points-bubble"
          >
            <Crown className="h-4 w-4 text-brand-red fill-brand-red/10 shrink-0" />
            <span className="font-mono font-bold text-xs tracking-wide text-brand-brown">
              {perksPoints} <span className="text-brand-brown/60 text-[10px] uppercase">Pts</span>
            </span>
          </div>

          {/* Shopping Cart Indicator */}
          <button
            onClick={onCartClick}
            className="relative p-2.5 bg-brand-red hover:bg-brand-red/90 text-white font-black rounded-full transition-all group shadow-md"
            id="shopping-cart-indicator"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-brown text-[11px] font-bold text-brand-cream ring-2 ring-brand-cream animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-brown hover:text-brand-red"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-cream border-t border-brand-brown/10 px-4 pt-2 pb-6 space-y-3 shadow-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left py-3 px-4 font-sans font-bold text-sm uppercase tracking-wider text-brand-brown border-b border-brand-brown/5 hover:bg-brand-brown/5 hover:text-brand-red rounded-lg transition-colors"
              id={`mobile-nav-link-${link.id}`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2 flex flex-col space-y-2 px-4">
            <button
              onClick={() => {
                onChatClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 bg-brand-brown text-brand-cream hover:bg-brand-brown/90 font-bold uppercase text-xs py-3.5 rounded-xl border border-brand-brown/30"
              id="mobile-nav-chef-btn"
            >
              <Gift className="h-4 w-4 text-brand-red" />
              <span>Launch AI Menu Chef</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
