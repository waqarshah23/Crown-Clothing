import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Form, useNavigate } from 'react-router-dom';
import {CartDropdownContainer, EmptyItem, CartItems} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const { cartItem, isCartOpen,setIsCardOpen  } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckOutPage = () => {
        setIsCardOpen(!isCartOpen);
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