import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
//import { UserContext } from "../../contexts/users.context";
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { SignOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.styles.jsx';


const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch();
    //const {currentUser} = useContext(UserContext);
    const  isCartOpen  = useSelector(selectIsCartOpen);
    const signOuthandler = () => {
        //await signOutUser();
        dispatch(SignOutStart());
        //dispatch(clearCurrentUser());
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