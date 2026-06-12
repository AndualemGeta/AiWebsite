import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedOffers from "./components/FeaturedOffers";
import Bestsellers from "./components/Bestsellers";
import MealBuilder from "./components/MealBuilder";
import AppPromo from "./components/AppPromo";
import Loyalty from "./components/Loyalty";
import Delivery from "./components/Delivery";
import Franchise from "./components/Franchise";
import BrandStory from "./components/BrandStory";
import Reviews from "./components/Reviews";
import Faqs from "./components/Faqs";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import ExitIntentPopup from "./components/ExitIntentPopup";
import ChefAssistant from "./components/ChefAssistant";
import { MenuItem, CartItem, PromoDeal } from "./types";
import { MENU_ITEMS } from "./data";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [perksPoints, setPerksPoints] = useState(250); // Give user some initial simulated Crowns for gamified redemption
  const [cartOpen, setCartOpen] = useState(false);
  const [builderBaseItem, setBuilderBaseItem] = useState<MenuItem | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [aiChatOpen, setAiChatOpen] = useState(false);

  // Smooth Navigation Navigator
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Helper: check search queries or send to semantic mapping first
  const handleSearchQuerySubmit = async (query: string) => {
    setSearchFilter(query);
    handleScrollToSection("menu");

    // Attempt backend semantic mapping router connection if feasible
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (res.ok) {
        const data = await res.json();
        // If matchedIds is retrieved, we can optionally pre-set categories or isolate items
        if (data.matchedIds && data.matchedIds.length > 0) {
          console.log("[AI Search Match Items]", data.matchedIds);
        }
      }
    } catch (e) {
      console.warn("AI Search mapping deferred to standard local filters", e);
    }
  };

  // Add standard kiosk item to basket
  const handleAddToBag = (item: MenuItem, customOptions: any[] = []) => {
    // Check if duplicate cart line item exists
    const cartId = item.id + JSON.stringify(customOptions);
    
    setCart((prev) => {
      const existing = prev.find((x) => x.id === cartId);
      if (existing) {
        return prev.map((x) =>
          x.id === cartId ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        const newItem: CartItem = {
          id: cartId,
          menuItem: item,
          quantity: 1,
          customizations: customOptions,
          finalPrice: item.price,
          finalCalories: item.calories,
        };
        return [...prev, newItem];
      }
    });

    // Provide instant feedback notification and open cart sidebar for CRO reinforcement
    setCartOpen(true);
  };

  // Add countdown deals code to basket
  const handleAddDealToCart = (deal: PromoDeal) => {
    const itemRepresentation: MenuItem = {
      id: deal.id,
      name: deal.title,
      description: deal.description,
      category: "burgers", // category categorization helper
      price: deal.dealPrice,
      calories: 1250, // estimated total package calories
      image: deal.image,
      tags: ["Promotion Deal", "Limited-Time Package"],
      rating: 4.9,
      reviewsCount: 15,
      isFlameGrilled: true,
      bestSeller: true,
      customizable: false,
    };

    handleAddToBag(itemRepresentation);
  };

  // Add customized gourmet burger to basket
  const handleAddCustomizedToCart = (
    baseBurger: MenuItem,
    selectedCustomizations: { optionId: string; name: string; quantity: number; price: number; calories: number }[]
  ) => {
    const cartId = baseBurger.id + "-custom-" + Math.floor(Math.random() * 99999);
    
    // Sum prices and calories
    let finalPrice = baseBurger.price;
    let finalCalories = baseBurger.calories;
    selectedCustomizations.forEach((c) => {
      finalPrice += c.price * c.quantity;
      finalCalories += c.calories * c.quantity;
    });

    const newItem: CartItem = {
      id: cartId,
      menuItem: {
        ...baseBurger,
        name: `Customized ${baseBurger.name}`,
      },
      quantity: 1,
      customizations: selectedCustomizations,
      finalPrice,
      finalCalories,
    };

    setCart((prev) => [...prev, newItem]);
    setCartOpen(true);
    alert(`Successfully launched your customized burger: ${baseBurger.name}! Sent directly to checkout lines.`);
  };

  // Update item counts in basket
  const handleUpdateQty = (cartId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === cartId ? { ...item, quantity } : item))
    );
  };

  // Delete line item from basket
  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartId));
  };

  // Place order checkout sequence (increases point scores!)
  const handlePlaceOrder = (pointsEarned: number) => {
    setPerksPoints((prev) => prev + pointsEarned);
    alert(`⭐️ CONGRATULATIONS MONARCH! Your order has been securely routed directly to our hot broiler system. You have accumulated ${pointsEarned} Perks Crowns! Your new treasury total is ${perksPoints + pointsEarned} Crowns.`);
    setCart([]); // Clean basket on successful checkout
    setCartOpen(false);
  };

  // Point simulator earning method
  const handleSimulatePurchase = (usdValue: number) => {
    const earned = Math.round(usdValue * 10);
    setPerksPoints((prev) => prev + earned);
    alert(`Success! Simulated a purchase of $${usdValue.toFixed(2)}. Earned ${earned} Crown Points!`);
  };

  // Redeem Crown perks to get a free item in bundle!
  const handleRedeemReward = (rewardId: string, cost: number, rewardName: string) => {
    if (perksPoints < cost) {
      alert("Insufficient Perks Crowns balance. Simulate more purchases to unlock rewards!");
      return;
    }

    // Subtract points
    setPerksPoints((prev) => prev - cost);

    // Create a zero-priced reward MenuItem to append to cart
    const rewardMenuItem: MenuItem = {
      id: `reward-claimed-${rewardId}`,
      name: `🎁 Free ${rewardName}`,
      description: `Claimed using ${cost} Crown Perks points.`,
      category: "sides",
      price: 0.0,
      calories: 320,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
      tags: ["Crown Perks Reward", "Zero Dollar Value"],
      rating: 5.0,
      reviewsCount: 1,
      isFlameGrilled: false,
      bestSeller: false,
      customizable: false,
    };

    handleAddToBag(rewardMenuItem);
    alert(`Glorious day! Your royal reward "${rewardName}" has been loaded into your shopping cart at $0.00!`);
  };

  // Trigger base burger pre-selected for layer builder
  const handleSelectForBuilder = (item: MenuItem) => {
    setBuilderBaseItem(item);
    handleScrollToSection("builder");
  };

  // Smart Chat prompt shortcut adding direct food to basket
  const handleSmartAIAddByFoodName = (itemMatchedName: string) => {
    const match = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(itemMatchedName.toLowerCase()));
    if (match) {
      handleAddToBag(match);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown selection:bg-brand-red selection:text-white font-sans antialiased relative">
      
      {/* Sticky Header Nav */}
      <Header
        cart={cart}
        perksPoints={perksPoints}
        onCartClick={() => setCartOpen(true)}
        onNavigate={handleScrollToSection}
        onChatClick={() => setAiChatOpen(true)}
        onSearchQuery={handleSearchQuerySubmit}
      />

      {/* Main Sections */}
      <main className="relative">
        <Hero
          onOrderNowClick={() => handleScrollToSection("menu")}
          onAppDownloadClick={() => handleScrollToSection("app")}
          onPerksClick={() => handleScrollToSection("perks")}
        />

        <FeaturedOffers onAddDealToCart={handleAddDealToCart} />

        <Bestsellers
          onAddToBag={handleAddToBag}
          onSelectForBuilder={handleSelectForBuilder}
          searchFilter={searchFilter}
          onClearSearch={() => setSearchFilter("")}
        />

        <MealBuilder
          baseItem={builderBaseItem}
          onAddCustomizedToCart={handleAddCustomizedToCart}
          onResetBuilderBase={() => setBuilderBaseItem(null)}
        />

        <AppPromo />

        <Loyalty
          points={perksPoints}
          onSimulatePurchase={handleSimulatePurchase}
          onRedeemReward={handleRedeemReward}
        />

        <Reviews />

        <Delivery />

        <Franchise />

        <BrandStory />

        <Faqs />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slideout Shopping Cart sidebar */}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {/* Exit Intent Marketing offer code popup */}
      <ExitIntentPopup onApplyPromoCode={(code) => handleSearchQuerySubmit(code)} />

      {/* AI Assistant Chat widget */}
      <ChefAssistant
        activeCart={cart}
        onAddMenuItemByName={handleSmartAIAddByFoodName}
      />

    </div>
  );
}
