import { createContext, useReducer } from "react";

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

const Initial_State = {
    isCartOpen: false,
    cartItem: [],
    cartCount: 0,
    cartTotal: 0
}

const Cart_Action_Types = {
    Set_Cart_Items: 'Set_Cart_Items',
    Set_Is_Cart_Open: 'Set_Is_Cart_Open' 
}
const CartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case Cart_Action_Types.Set_Cart_Items: 
            return{
                ...state,
                ...payload
            }
        case Cart_Action_Types.Set_Is_Cart_Open: 
            return{
                ...state,
                isCartOpen: payload
            }
        default: 
            throw new Error('unhandled action type: ', {type});
    }
}
export const CartProvider = ({children}) => {

    const [{cartItem, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(CartReducer, Initial_State);

    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
    
        const newCarttotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
    
        dispatch({type: Cart_Action_Types.Set_Cart_Items, payload: {
            cartItem: newCartItems, cartCount: newCartCount, cartTotal: newCarttotal
        }});
        
    }

    const setIsCartOpen = (bool) => {
        dispatch({
            type: Cart_Action_Types.Set_Is_Cart_Open,
            payload: bool
        })
    }
    const addItemToCart = (itemToAdd) => {
        const newCartItems = addCartItem(cartItem, itemToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (itemToRemove) => {
        const newCartItems = removeItem(cartItem, itemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (itemToClear) => {
        const newCartItems =  ClearCartItem(cartItem, itemToClear);
        updateCartItemsReducer(newCartItems);
    }
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart, 
        cartItem, 
        cartCount,
        cartTotal
    };
    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}


    // const [isCartOpen, setIsCardOpen] = useState(false);
    // const [cartItem, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);
    // useEffect(() => {
    //     const newCartCount = cartItem.reduce((total, cartItem) => total + cartItem.quantity , 0);
    //     setCartCount(newCartCount); 
    // }, [cartItem])

    // useEffect(() => {
    //     const newCarttotal = cartItem.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
    //     setCartTotal(newCarttotal);
    // },[cartItem])