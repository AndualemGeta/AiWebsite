import React, { useState } from "react";
import { CartItem } from "../types";
import { X, Trash2, ShieldCheck, ShoppingBag, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface CartSidebarProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onPlaceOrder: (earnedPoints: number) => void;
}

export default function CartSidebar({
  cart,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
}: CartSidebarProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  };

  const calculateTotalCalories = () => {
    return cart.reduce((acc, item) => acc + item.finalCalories * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const rawCalories = calculateTotalCalories();

  // Free shipping threshold math ($20.00 limits)
  const freeShippingThreshold = 20.0;
  const deliveryFee = subtotal >= freeShippingThreshold ? 0.0 : 1.99;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const remainingForFree = isFreeDelivery ? 0 : freeShippingThreshold - subtotal;

  // Coupon apply module
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "BAGGERVIP" || code === "ROYAL3CHEESE" || code === "WHOPPERPROMO") {
      setDiscountPercent(15); // 15% discount
      setCouponFeedback("Coupon Code Accepted! 15% VIP discount applied to food sub-total.");
    } else {
      setCouponFeedback("Invalid voucher code. Try 'BAGGERVIP' or active promotion codes.");
      setDiscountPercent(0);
    }
  };

  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount + deliveryFee;

  // Earn index calculates 10 points per dollar spent
  const earnedPoints = Math.round((subtotal - discountAmount) * 10);

  const handleCheckoutSequence = () => {
    if (cart.length === 0) {
      alert("Your royal basket is empty. Fill it with delicious flame-grilled options first!");
      return;
    }

    setCheckingOut(true);
    setCheckoutStep(1); // steps starts

    // simulated logistics progression
    setTimeout(() => {
      setCheckoutStep(2); // Broiler grill
      setTimeout(() => {
        setCheckoutStep(3); // Driver dispatched
        setTimeout(() => {
          onPlaceOrder(earnedPoints);
          setCheckingOut(false);
          setCheckoutStep(0);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-stone-900 border-l-2 border-amber-500/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between" id="active-cart-sidebar">
      
      {/* Sidebar Header */}
      <div className="p-5 bg-stone-950 border-b border-stone-850 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5 text-amber-500" />
          <h3 className="font-sans font-black text-lg text-amber-50 uppercase">
            Your Royal Basket
          </h3>
          <span className="text-xs bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full font-black">
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 bg-stone-900 hover:bg-red-650 text-stone-400 hover:text-white rounded-lg border border-stone-850 transition-colors"
          id="cart-close-sidebar-btn"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Slideout Content pane */}
      {checkingOut ? (
        <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6 text-center bg-stone-950" id="checkout-progress-modal">
          <Loader2 className="h-10 w-10 text-amber-500 animate-spin" />
          
          <div className="space-y-2">
            <h4 className="font-sans font-black text-lg uppercase text-amber-50 text-amber-400">
              {checkoutStep === 1 && "Verifying Security Credentials..."}
              {checkoutStep === 2 && "Transmitting Spec sheet to Broiler..."}
              {checkoutStep === 3 && "Diver Dispatched to Coordinate..."}
            </h4>
            <p className="text-xs text-stone-400 font-mono leading-relaxed px-6">
              {checkoutStep === 1 && "Aligning local geofence beacons with delivery direct logistics routes..."}
              {checkoutStep === 2 && "Preparing fire chains to flame-grill beef patties exactly to builder requirements..."}
              {checkoutStep === 3 && "Fast dispatch active. Driving fresh bagged order to residential address..."}
            </p>
          </div>

          <div className="w-full max-w-xs bg-stone-900 h-1 rounded-full overflow-hidden border border-stone-800">
            <div 
              className="h-full bg-amber-500 transition-all duration-1000"
              style={{ width: `${(checkoutStep / 3) * 100}%` }}
            />
          </div>

        </div>
      ) : cart.length === 0 ? (
        <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-4 text-center">
          <ShoppingBag className="h-16 w-16 text-stone-800 animate-pulse" />
          <h4 className="font-sans font-black text-lg uppercase text-amber-50">Basket is Empty</h4>
          <p className="text-xs text-stone-400 px-6 leading-relaxed">
            Your basket stands vacant. Rule your appetite by claiming limited-time bundle promotions or adding fire-grilled burgers from the core menu.
          </p>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs px-5 py-2.5 rounded-xl uppercase shadow"
            id="cart-return-shopping-btn"
          >
            DISCOVER DELICIOUS FOOD
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-5 space-y-5" id="cart-items-list-container">
          
          {/* Free Shipping thresholds indicator */}
          <div className="p-4 bg-stone-950 border border-stone-850 rounded-2xl space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-300">
                {isFreeDelivery 
                  ? "✓ Free BK Direct Shipping Unlocked!" 
                  : `Add $${remainingForFree.toFixed(2)} more for Free Shipping`}
              </span>
              <span className="font-bold text-amber-400 font-mono">
                ${subtotal.toFixed(2)} / ${freeShippingThreshold.toFixed(2)}
              </span>
            </div>
            <div className="relative w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-green-500 transition-all"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* List items */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-stone-950 border border-stone-850 rounded-2xl p-3.5 flex space-x-3"
                id={`cart-row-item-${item.id}`}
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="h-12 w-12 object-cover rounded-xl shrink-0 border border-stone-800"
                />

                <div className="flex-1 space-y-1 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-sans font-black text-stone-100 uppercase">{item.menuItem.name}</span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-red-500 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Render add on specifications */}
                  {item.customizations.length > 0 && (
                    <div className="text-[10px] space-y-0.5 text-stone-500 font-mono border-l-2 border-stone-850 pl-2 py-0.5">
                      {item.customizations.map((mod) => (
                        <div key={mod.optionId}>
                          + {mod.name} (Qty: {mod.quantity})
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-1.5 border-t border-stone-900/50">
                    <div className="flex items-center space-x-3 bg-stone-900 rounded-lg px-2 py-0.5 border border-stone-850">
                      <button
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                        className="text-stone-400 hover:text-amber-500 font-bold"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-amber-100 text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="text-stone-400 hover:text-amber-500 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-stone-400 block">${(item.finalPrice * item.quantity).toFixed(2)}</span>
                      <span className="text-[9px] text-stone-600 block">{(item.finalCalories * item.quantity)} kcal</span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* Coupon apply box */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2 border-t border-stone-850">
            <input
              type="text"
              placeholder="VOUCHER (E.G. BAGGERVIP)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="bg-stone-950 border border-stone-850 focus:border-amber-500 text-stone-300 text-[11px] font-mono px-3 py-2 rounded-xl outline-none flex-1 uppercase"
            />
            <button
              type="submit"
              className="bg-stone-850 border border-stone-800 text-amber-550 hover:bg-amber-500 hover:text-stone-950 text-[11px] font-extrabold px-3 py-2 rounded-xl uppercase transition-colors"
            >
              Apply
            </button>
          </form>

          {couponFeedback && (
            <p className="text-[10px] font-mono font-bold text-amber-500">
              {couponFeedback}
            </p>
          )}

        </div>
      )}

      {/* Sidebar Checkout Controls */}
      {!checkingOut && cart.length > 0 && (
        <div className="p-5 bg-stone-950 border-t border-stone-850 space-y-4" id="cart-footer-bill-summary">
          <div className="space-y-1.5 text-xs font-mono text-stone-400">
            <div className="flex justify-between">
              <span>Basket Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {discountPercent > 0 && (
              <div className="flex justify-between text-amber-500 font-bold">
                <span>Coupon Sale ({discountPercent}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery Dispatch Fee:</span>
              <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between border-t border-stone-900 pt-2 text-sm text-stone-100 font-sans font-black uppercase">
              <span className="text-amber-50">Consolidated Bill:</span>
              <span className="text-amber-500">${total.toFixed(2)}</span>
            </div>
            
            <div className="text-[10px] text-stone-500 flex items-center space-x-1 justify-end pt-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Earn {earnedPoints} Perks Crowns on placing!</span>
            </div>
          </div>

          <button
            onClick={handleCheckoutSequence}
            className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl font-sans font-black text-sm tracking-wide shadow-lg hover:shadow-amber-500/10 transition-all flex items-center justify-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="cart-checkout-trigger-btn"
          >
            <span>PLACE ROYAL ORDER ORDER</span>
            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1 shrink-0" />
          </button>
          
          <div className="flex items-center justify-center space-x-1.5 text-[10px] text-stone-500 font-mono">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span>Secure SSL checkout system integration</span>
          </div>
        </div>
      )}

    </div>
  );
}
