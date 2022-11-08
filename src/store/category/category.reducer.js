
import { Categories_Action_Type } from "./category.types";
const Categories_Initial_State = {
    categories: [],
    isLoading: false,
    error:  null
}

export const CategoriesReducer = (state = Categories_Initial_State, action) => {
    const {type, payload} = action;

    switch(type){
        case Categories_Action_Type.Set_Categories: 
            return {
                ...state,
                categories: payload
            }
        case Categories_Action_Type.Fetch_Categories_Start:
            return {
                ...state,
                isLoading: true
            }
        case Categories_Action_Type.Fetch_Categories_Success:
            return {
                ...state,
                categories: payload,
                isLoading: false
            }
        case Categories_Action_Type.Fetch_Categories_Failed:
            return {
                ...state,
                error: payload, 
                isLoading: false
            }
        default: 
            return state;
    }
}