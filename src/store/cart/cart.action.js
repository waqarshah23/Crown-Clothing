import { Cart_Action_Types } from "./cart.types";

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

export const addItemToCart = (cartItem,itemToAdd) => {
    const newCartItems = addCartItem(cartItem, itemToAdd);
    return {
        type: Cart_Action_Types.Set_Cart_Items,
        payload: newCartItems
    }
}

export const removeItemFromCart = (cartItem,itemToRemove) => {
    const newCartItems = removeItem(cartItem, itemToRemove);
    return {
        type: Cart_Action_Types.Set_Cart_Items,
        payload: newCartItems
    }
}

export const clearItemFromCart = (cartItem,itemToClear) => {
    const newCartItems =  ClearCartItem(cartItem, itemToClear);
    return {
        type: Cart_Action_Types.Set_Cart_Items,
        payload: newCartItems
    }
}

export const setIsCartOpen = (bool) => (
    {
        type: Cart_Action_Types.Set_Is_Cart_Open,
        payload: bool
    }
)