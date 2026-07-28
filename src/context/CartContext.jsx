import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add To Cart
  const addToCart = (product) => {
    const exist = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === product.size
    );

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id &&
          item.size === product.size
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  // Remove
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Increase
  const increaseQuantity = (id, size) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease
  const decreaseQuantity = (id, size) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

