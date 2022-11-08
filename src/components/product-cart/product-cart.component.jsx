import Button, {Button_Type_Classes} from '../button/button.component';
import './product-cart.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
const ProductCart = ({product}) => { 
    //const {addItemToCart    } = useContext(CartContext);
     
    const {name, price, imageUrl} = product;   
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addItemToCartFunc = () => {
        //addItemToCart(product);
        dispatch(addItemToCart(cartItems,product));

    }
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={Button_Type_Classes.inverted} name='Add to Cart' onClick={addItemToCartFunc} ></Button>
        </div>
    );
}

export default ProductCart;