import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import Authentication from './routes/authentication/authentication.component';
import ChecOut from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import { CheckUserSession } from './store/user/user.action';
const App = () =>  {

  const dispatch = useDispatch();

  useEffect( () => {
   dispatch(CheckUserSession());
    // getCurrentUser().then((user) =>{
    //   console.log(user);
    //   return dispatch(setCurrentUser(user));
    // }) 
}, [dispatch])
  return (
    <Routes>

      <Route path="/" element = {<Navigation />} >
        <Route index element = {<Home />} />
        <Route path="shop/*" element = {<Shop />} />
        <Route path="auth" element = {<Authentication />} />
        <Route path="checkout" element = {<ChecOut />} />
      </Route> 
    </Routes>
  );
}

export default App;
