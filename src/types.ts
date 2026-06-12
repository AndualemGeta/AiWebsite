export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: "burgers" | "chicken" | "sides" | "drinks" | "desserts";
  price: number;
  calories: number;
  image: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  isFlameGrilled: boolean;
  bestSeller: boolean;
  customizable: boolean;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: "patty" | "cheese" | "sauce" | "addon";
  price: number;
  calories: number;
  icon?: string;
  maxQty: number;
}

export interface CartItem {
  id: string; // unique cart instance id (item.id + serialized choices)
  menuItem: MenuItem;
  quantity: number;
  customizations: {
    optionId: string;
    name: string;
    quantity: number;
    price: number;
    calories: number;
  }[];
  finalPrice: number;
  finalCalories: number;
}

export interface PromoDeal {
  id: string;
  code: string;
  title: string;
  description: string;
  badge: string;
  originalPrice: number;
  dealPrice: number;
  expiryHours: number; // For live countdown indicator
  secondsRemaining: number;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  item: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  category: "ordering" | "rewards" | "nutrition" | "franchise";
  question: string;
  answer: string;
}

export interface FranchiseInquiry {
  name: string;
  email: string;
  phone: string;
  market: string;
  capital: number;
  experience: string;
  message: string;
}

export interface DeliveryPartnership {
  name: string;
  logo: string;
  deliveryTimeRange: string;
  fee: number;
  rating: number;
  primaryCTA: string;
}
