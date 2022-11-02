import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-items.styles.scss';

const ChecOutItems = ({cartItem} ) => {
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const {name, imageUrl, price, quantity} = cartItem;

    const incrementItems = () => addItemToCart(cartItem);
    const decrementItems = () => removeItemFromCart(cartItem);
    const clearItems = () => clearItemFromCart(cartItem);
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