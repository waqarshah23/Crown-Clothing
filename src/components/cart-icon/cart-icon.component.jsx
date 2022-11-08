import { useDispatch, useSelector } from 'react-redux';
import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
const CartIcon = () => {

    //const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();
    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));
     }
    return (
        <CartIconContainer onClick={ toggleIsCartOpen }>
            <ShoppingIcon />
            <ItemCount >{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;    