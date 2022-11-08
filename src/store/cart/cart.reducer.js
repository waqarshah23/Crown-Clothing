import { Cart_Action_Types } from "./cart.types";

const Initial_State = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartReducer = (state = Initial_State, action) => {
    const {type, payload} = action;

    switch(type){
        case Cart_Action_Types.Set_Cart_Items: 
            return{
                ...state,
                cartItems: payload
            }
        case Cart_Action_Types.Set_Is_Cart_Open: 
            return{
                ...state,
                isCartOpen: payload
            }
        default: 
            return state;
    }
}