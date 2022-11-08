import { combineReducers } from 'redux'
import { UserReducer } from './user/user.reducer';
import { CategoriesReducer } from './category/category.reducer';
import { CartReducer } from './cart/cart.reducer';
export const RootReducer = combineReducers(
    {
        user: UserReducer,
        categories: CategoriesReducer,
        cart: CartReducer
    }
);