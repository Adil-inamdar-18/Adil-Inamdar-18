import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const getStoredCart = () => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  };

  useEffect(() => {
    setCartItems(getStoredCart());
  }, []);

  const getItemId = (item, index = 0) => {
    return String(
      item?._id ||
        item?.id ||
        item?.productId ||
        item?.sku ||
        `${item?.name || item?.title || "item"}-${index}`,
    );
  };

  const normalizeItem = (item, index = 0) => {
    return {
      id: item?.id || item?._id || item?.productId || getItemId(item, index),
      name:
        item?.name ||
        item?.title ||
        item?.productName ||
        item?.medicineName ||
        "Medicine",
      category: item?.category || item?.type || item?.brand || "Medicine",
      price: Number(item?.price || item?.mrp || item?.cost || 0),
      image:
        typeof (item?.image || item?.imageUrl || item?.img) === "string" &&
        !(item?.image || item?.imageUrl || item?.img || "").startsWith(
          "data:image",
        )
          ? item?.image || item?.imageUrl || item?.img
          : "",
      qty: Number(item?.qty || 1),
    };
  };

  const saveCartSafely = (items) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart:", error);

      if (error.name === "QuotaExceededError") {
        alert(
          "Cart storage is full. Clearing old cart data and saving smaller cart.",
        );

        const slimItems = items.map((item, index) => ({
          id: item?.id || getItemId(item, index),
          name: item?.name || "Medicine",
          category: item?.category || "Medicine",
          price: Number(item?.price || 0),
          image:
            typeof item?.image === "string" &&
            !item.image.startsWith("data:image")
              ? item.image
              : "",
          qty: Number(item?.qty || 1),
        }));

        try {
          localStorage.removeItem("cart");
          localStorage.setItem("cart", JSON.stringify(slimItems));
        } catch (e) {
          console.error("Still failed after slimming cart:", e);
        }
      }
    }
  };

  useEffect(() => {
    saveCartSafely(cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) return;

    const normalized = normalizeItem(product);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item, index) => getItemId(item, index) === getItemId(normalized),
      );

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, qty: Number(item.qty || 1) + 1 }
            : item,
        );
      }

      return [...prev, normalized];
    });
  };

  const addManyToCart = (products) => {
    if (!Array.isArray(products) || products.length === 0) return;

    setCartItems((prev) => {
      const updatedCart = [...prev];

      products.forEach((product, index) => {
        const normalized = normalizeItem(product, index);
        const normalizedId = getItemId(normalized, index);

        const existingIndex = updatedCart.findIndex(
          (item, itemIndex) => getItemId(item, itemIndex) === normalizedId,
        );

        if (existingIndex !== -1) {
          updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            qty: Number(updatedCart[existingIndex].qty || 1) + 1,
          };
        } else {
          updatedCart.push(normalized);
        }
      });

      return updatedCart;
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item, index) =>
        getItemId(item, index) === String(id)
          ? { ...item, qty: Number(item.qty || 1) + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item, index) =>
          getItemId(item, index) === String(id)
            ? { ...item, qty: Number(item.qty || 1) - 1 }
            : item,
        )
        .filter((item) => Number(item.qty || 0) > 0),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item, index) => getItemId(item, index) !== String(id)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + Number(item.qty || 1), 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
      0,
    );
  }, [cartItems]);

  const tax = useMemo(() => subtotal * 0.05, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        addManyToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
