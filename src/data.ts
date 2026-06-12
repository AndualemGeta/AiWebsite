import { MenuItem, CustomizationOption, PromoDeal, FAQ, Review, DeliveryPartnership } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "whopper-classic",
    name: "Flame-Grilled Whopper®",
    description: "A quarter-pound of savory flame-grilled beef topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.",
    category: "burgers",
    price: 6.89,
    calories: 660,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Flame-Grilled", "Signature", "100% Beef"],
    rating: 4.9,
    reviewsCount: 2405,
    isFlameGrilled: true,
    bestSeller: true,
    customizable: true
  },
  {
    id: "bacon-king",
    name: "Double Bacon King™",
    description: "Two 1/4 lb flame-grilled beef patties, topped with a hearty portion of thick-cut smoked bacon, melted American cheese, ketchup, and creamy mayonnaise on a toasted sesame seed bun.",
    category: "burgers",
    price: 8.49,
    calories: 1040,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    tags: ["Bestseller", "Premium Bacon", "Double Beef"],
    rating: 4.8,
    reviewsCount: 1842,
    isFlameGrilled: true,
    bestSeller: true,
    customizable: true
  },
  {
    id: "spicy-bk-chicken",
    name: "Royal Spicy Chicken Sandwich",
    description: "Crispy-fried chicken breast fillet coated in our signature blazing glaze, topped with savory sauce, lettuce, and tomatoes on a toasted potato bun.",
    category: "chicken",
    price: 5.99,
    calories: 590,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    tags: ["Spicy", "New", "White Meat"],
    rating: 4.7,
    reviewsCount: 928,
    isFlameGrilled: false,
    bestSeller: false,
    customizable: true
  },
  {
    id: "crispy-chicken-royal",
    name: "BK Royale® Chicken Sandwich",
    description: "Crispy breaded chicken breast topped with shredded lettuce and creamy mayonnaise on a long, toasted sesame seed bun.",
    category: "chicken",
    price: 5.49,
    calories: 510,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    tags: ["Classic", "High Protein"],
    rating: 4.6,
    reviewsCount: 1140,
    isFlameGrilled: false,
    bestSeller: true,
    customizable: true
  },
  {
    id: "french-fries-large",
    name: "Golden Thick-Cut French Fries",
    description: "Thick-cut potatoes fried to golden perfection, piping hot, and lightly salted. Crispy on the outside, fluffy on the inside.",
    category: "sides",
    price: 3.29,
    calories: 430,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic Side", "Vegan Allowed"],
    rating: 4.5,
    reviewsCount: 3120,
    isFlameGrilled: false,
    bestSeller: true,
    customizable: false
  },
  {
    id: "onion-rings-large",
    name: "Gourmet King Onion Rings",
    description: "Freshly sliced onions coated in a subtle, sweet, and extra crunchy light batter, fried until crunchy and perfectly golden.",
    category: "sides",
    price: 3.49,
    calories: 410,
    image: "https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=600&q=80",
    tags: ["Fan Favorite", "Extra Crunch"],
    rating: 4.6,
    reviewsCount: 1540,
    isFlameGrilled: false,
    bestSeller: false,
    customizable: false
  },
  {
    id: "choc-lava-cake",
    name: "Warm Chocolate Lava Cake",
    description: "Rich chocolate cake with a molten premium fudge center, warming you from the inside out. Served warm with dark chocolate drizzle.",
    category: "desserts",
    price: 4.49,
    calories: 380,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    tags: ["Fresh Baked", "Sweet Craving"],
    rating: 4.9,
    reviewsCount: 812,
    isFlameGrilled: false,
    bestSeller: true,
    customizable: false
  },
  {
    id: "oreo-shake",
    name: "BK Royal Shake™ Oreo® Style",
    description: "Creamy vanilla soft serve blended with rich OREO® cookie pieces, chocolate sauce, and finished with a fluffy whipped topping.",
    category: "drinks",
    price: 4.19,
    calories: 610,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    tags: ["Refreshing", "Oreo Original"],
    rating: 4.8,
    reviewsCount: 1254,
    isFlameGrilled: false,
    bestSeller: true,
    customizable: false
  }
];

export const CUSTOMIZATION_OPTIONS: CustomizationOption[] = [
  { id: "beef-patty", name: "Extra Flame-Grilled Patty", type: "patty", price: 1.99, calories: 240, maxQty: 2 },
  { id: "american-cheese", name: "Melted American Cheese", type: "cheese", price: 0.50, calories: 70, maxQty: 3 },
  { id: "bacon", name: "Thick-Cut Smoked Bacon (2 strips)", type: "addon", price: 0.99, calories: 90, maxQty: 2 },
  { id: "onion-rings-addon", name: "Crispy Onion Ring Top", type: "addon", price: 0.75, calories: 80, maxQty: 2 },
  { id: "flame-sauce", name: "Signature Royal Flame Sauce", type: "sauce", price: 0.25, calories: 45, maxQty: 3 },
  { id: "honey-mustard", name: "Zesty Honey Mustard", type: "sauce", price: 0.25, calories: 50, maxQty: 3 }
];

export const CURRENT_DEALS: PromoDeal[] = [
  {
    id: "deal-triple-cheese",
    code: "ROYAL3CHEESE",
    title: "Triple America Cheeseburger Family Meal",
    description: "Get 2 Triple Cheeseburgers, 2 Crispy Chicken Royales, 4 Fries, and 4 Drinks. The ultimate party pack.",
    badge: "Limited Time Offer",
    originalPrice: 38.99,
    dealPrice: 19.99,
    expiryHours: 3,
    secondsRemaining: 10800,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-whopper-wednesday",
    code: "WHOPPERPROMO",
    title: "Double Flame Whopper Dynamic Duo",
    description: "Save 40% on 2 Classic Flame-Grilled Whoppers with Cheese and 2 Large Crispy Fry bundles.",
    badge: "Hot Deal Of The Day",
    originalPrice: 21.49,
    dealPrice: 12.99,
    expiryHours: 6,
    secondsRemaining: 21600,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-sweet-temptation",
    code: "SWEETCROWN",
    title: "Crown Lava Cake Cozy Pair",
    description: "Satisfy your dessert cravings. Buy 1 Warm Chocolate Lava Cake, get a free Creamy Oreo Shake.",
    badge: "Flash Sale",
    originalPrice: 8.68,
    dealPrice: 4.49,
    expiryHours: 1,
    secondsRemaining: 3600,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Alex Thompson",
    rating: 5,
    text: "The Bacon King double was absolutely perfect. Standard burgers lack that distinct charcoal fire grill flavor, but BK gets it right every single time. It was delivered in under 20 minutes and was still steaming hot!",
    date: "1 day ago",
    verified: true,
    item: "Double Bacon King",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rev-2",
    name: "Jessica Chen",
    rating: 5,
    text: "I used the custom meal builder to add crispy onion rings directly into my Whopper. Absolute game-changer! Royal Perks points accumulated instantly, and I redeemed a free Oreo Shake in the app.",
    date: "3 days ago",
    verified: true,
    item: "Flame-Grilled Whopper",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rev-3",
    name: "Marcus Vance",
    rating: 5,
    text: "Applying for the franchise franchise program was incredibly seamless. The regional managers got in touch within 24 hours, and original operational models are exceptionally well structure. Excited to partner!",
    date: "1 week ago",
    verified: true,
    item: "Franchise Investor Program",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
];

export const DELIVERY_PARTNERS: DeliveryPartnership[] = [
  {
    name: "BK Direct Delivery",
    logo: "👑",
    deliveryTimeRange: "15 - 25 mins",
    fee: 1.99,
    rating: 4.9,
    primaryCTA: "BK Best Price"
  },
  {
    name: "Uber Eats",
    logo: "🟢",
    deliveryTimeRange: "20 - 30 mins",
    fee: 2.99,
    rating: 4.7,
    primaryCTA: "Partner Integration"
  },
  {
    name: "DoorDash",
    logo: "🔴",
    deliveryTimeRange: "18 - 28 mins",
    fee: 2.49,
    rating: 4.8,
    primaryCTA: "DashPass Eligible"
  },
  {
    name: "Grubhub",
    logo: "🟠",
    deliveryTimeRange: "25 - 35 mins",
    fee: 3.49,
    rating: 4.5,
    primaryCTA: "Seamless Sync"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    category: "ordering",
    question: "Do you deliver directly, or only through aggregators like DoorDash/UberEats?",
    answer: "We offer both! With BK Direct Delivery, you can order from this website or the BK App to lock in exclusive prices, earn double Royal Perks points, and access our premium real-time driver tracking network. We also fully support ordering through UberEats, DoorDash, and Grubhub."
  },
  {
    id: "faq-2",
    category: "rewards",
    question: "How do I earn and redeem Crown points in the Royal Perks program?",
    answer: "You earn 10 Crowns for every $1 spent on delicious BK food! Crown rewards can be accumulated and redeemed for free food. For instance, 250 Crowns unlocks a free small French fry, 750 Crowns yields a flame-grilled Whopper, and our special anniversary tiers offer exclusive premium combos."
  },
  {
    id: "faq-3",
    category: "nutrition",
    question: "Does Burger King offer vegetarian, vegan, or allergen-free selections?",
    answer: "Yes, we proudly serve the plant-based Impossible™ Whopper, which delivers the iconic flame-grilled taste without the meat. We also provide comprehensive nutritional matrices in the checkouts. For gluten-sensitive diners, we offer burger lettuce wraps upon request."
  },
  {
    id: "faq-4",
    category: "franchise",
    question: "What are the primary liquid capital requirements for Burger King franchise investments?",
    answer: "We look for passionate multi-unit operators. Primary requirements include a minimum net worth of $1,500,000 and at least $500,000 in liquid assets per restaurant. Burger King brand provides unparalleled operational support, global logistical networks, and marketing leverage."
  }
];
