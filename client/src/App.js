import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Components/Shop/Shop";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Admin from "./Components/Admin/Admin";
import Productdetails from "./Components/Productdetails/Productdetails";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categoryhome from "./Components/CategoryHome/Categoryhome";
import Searchfilter from "./Components/Search/SearchFilter";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import History from "./Components/History/History";
import Profile from "./Components/Profile/Profile";
import Whislist from "./Components/Whislist/Whislist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product-details/:id" component={Productdetails} />
          <Route path="/shop" component={Shop} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/category/:slug" component={Categoryhome} />
          <Route path="/search/filter/:query" component={Searchfilter} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route path="/history" component={History} />
          <Route path="/profile" component={Profile} />
          <Route path="/whislist" component={Whislist} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
