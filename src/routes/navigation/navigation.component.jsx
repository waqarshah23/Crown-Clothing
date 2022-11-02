import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/users.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles.jsx';
const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    const signOuthandler = async () => {
        await signOutUser();
    }
    return (

      <Fragment>
        <NavigationContainer >
            <LogoContainer to='/'>
                <CrownLogo className="logo"/>
            </LogoContainer>

            <NavLinks >
                <NavLink to='/shop'>SHOP</NavLink>
                <NavLink to='/'>CONTACT</NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' className="nav-link" onClick={signOuthandler}>SIGNOUT</NavLink>
                    ) : (
                        <NavLink className="nav-link" to='/auth'>SIGN IN</NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            { 
                isCartOpen && <CartDropdown />
            }
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  };

  export default Navigation;