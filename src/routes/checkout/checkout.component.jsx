import { useSelector } from 'react-redux';
import ChecOutItems from '../../components/checkout-items/checkout-items.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import PaymentForm from '../../components/payment-form/payment-form.component';
import './checkout.styles.scss';
const ChecOut = () => {

    //const {cartItem, cartTotal} = useContext(CartContext);
    const cartItem = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    return (
        <div className='checkout-container'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>  
        </div>
        {
            cartItem.map((cartItem) => {
                return (
                    <ChecOutItems key={ cartItem.id } cartItem={cartItem} />
                );
            })
        }
        <span className='total'>Total: ${cartTotal}</span>
        <PaymentForm/>
        </div>
    );
}

export default ChecOut;


// <div key={id}>
// <h3>{name}</h3>
// <span>{quantity}</span>
// <br/>
// <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
// <br/>
// <span onClick={() => addItemToCart(cartItem) }>increment</span>
// </div>