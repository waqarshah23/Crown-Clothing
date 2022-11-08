import { useDispatch, useSelector } from 'react-redux';
import './checkout-items.styles.scss';
import {clearItemFromCart, removeItemFromCart, addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
const ChecOutItems = ({cartItem} ) => {
    //const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const incrementItems = () => dispatch(addItemToCart(cartItems,cartItem));
    const decrementItems = () => dispatch(removeItemFromCart(cartItems,cartItem));
    const clearItems = () => dispatch(clearItemFromCart(cartItems,cartItem));
    return (
        <div className='checkout-item-container'>
            
        <div className='image-container'>
            <img src={imageUrl} alt={name} />
        </div>
        <span className='name'> {name} </span>
        <span className='quantity'>
            <div className='arrow' onClick={decrementItems}>
                &#10094;
            </div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={incrementItems}>
                &#10095;
            </div>
        </span>
        <span className='price'> {price*quantity} </span>
        <div className='remove-button' onClick={clearItems}>
            &#10005;
        </div>
        </div>
    );
}

export default ChecOutItems;