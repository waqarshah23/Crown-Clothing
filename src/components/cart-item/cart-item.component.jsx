import {CartItemContainer, ItemDetails, Name} from './cart-item.styles.jsx';

const CartItem = ({cartItem}) => {
    const {name,price, imageUrl, quantity} = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <Name stProp='name'>{name}</Name>
                <Name > {quantity} X ${price} </Name>
            </ItemDetails>
        </CartItemContainer>
    );
}

export default CartItem;