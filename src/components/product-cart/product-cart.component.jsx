import Button, {Button_Type_Classes} from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './product-cart.styles.scss';
const ProductCart = ({product}) => { 
    const {addItemToCart    } = useContext(CartContext);
    const {name, price, imageUrl} = product;   
    
    const addItemToCartFunc = () => {
        addItemToCart(product);
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