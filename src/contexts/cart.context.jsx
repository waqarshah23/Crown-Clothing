import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItem, itemToAdd) => {
    const existingItem = cartItem.find((item) => item.id === itemToAdd.id);
    if(existingItem){
         return cartItem.map((item) => (
            item.id === itemToAdd.id ? 
            {...item, quantity: item.quantity + 1} 
            : item
         ));    
    }

    return [...cartItem, {...itemToAdd, quantity: 1}];
}

const removeItem = (cartItem, itemToRemove) => {
    const item = cartItem.find((item) => item.id === itemToRemove.id);
    if(item && item.quantity === 1){
        return cartItem.filter((item) => item.id !== itemToRemove.id);
    }

    return cartItem.map((item) => (
        item.id === itemToRemove.id?
        {...item, quantity: item.quantity - 1} : item
    ))
};

const ClearCartItem = (cartItem, itemToClear) => {
    return cartItem.filter((item) => item.id !== itemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCardOpen: () => {},
    cartItem: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCardOpen] = useState(false);
    const [cartItem, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const addItemToCart = (itemToAdd) => {
        setCartItems(addCartItem(cartItem, itemToAdd));
    }

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeItem(cartItem, itemToRemove));
    }

    const clearItemFromCart = (itemToClear) => {
        setCartItems(ClearCartItem(cartItem, itemToClear));
    }
    useEffect(() => {
        const newCartCount = cartItem.reduce((total, cartItem) => total + cartItem.quantity , 0);
        setCartCount(newCartCount); 
    }, [cartItem])

    useEffect(() => {
        const newCarttotal = cartItem.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
        setCartTotal(newCarttotal);
    },[cartItem])
    const value = {isCartOpen, setIsCardOpen, addItemToCart,removeItemFromCart,clearItemFromCart, cartItem, cartCount,cartTotal};
    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}