import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyItem } from './cart-dropdown.styles.jsx';
const CartDropdown = () => {
    //const { cartItem, isCartOpen,setIsCartOpen  } = useContext(CartContext);
    const cartItem = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goToCheckOutPage = () => {
        dispatch(setIsCartOpen(!isCartOpen));
        navigate('/checkout');
    }
    return (
        <CartDropdownContainer >
        <CartItems >
                {
                    cartItem.length > 0 ? (
                        cartItem.map((item, i) => <CartItem key={`${item.id}_${i}`} cartItem={item} />)
                    ): 
                    (
                        <EmptyItem>Your Cart is Empty</EmptyItem>
                    )
                        
                }
                <Button name='Go to Checkout' onClick={goToCheckOutPage} />
            </CartItems>
        </CartDropdownContainer>
    );
}

export default CartDropdown;