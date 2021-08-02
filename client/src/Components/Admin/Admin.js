import React from "react";
import "./Admin.css";
import AdminNav from "./AdminNavbar/AdminNav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dasnboard/Dashboard";
import Products from "./Products/Products";
import Category from "./Category/Category";
import Subcategory from "./Subcategory/Subcategory";
import ProductList from "./productList/ProductList";
import Editproducts from "./EditProducts/Editproducts";
import Coupon from "./Coupon/Coupon";
import User from "./User/User";

const Admin = () => {
  return (
    <>
      <BrowserRouter>
        <AdminNav />
        <Switch>
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/products" component={Products} />
          <Route exact path="/admin/category" component={Category} />
          <Route exact path="/admin/sub-category" component={Subcategory} />
          <Route exact path="/admin/products/List" component={ProductList} />
          <Route
            exact
            path="/admin/products/edit/:id"
            component={Editproducts}
          />
          <Route exact path="/admin/users" component={User} />
          <Route exact path="/admin/coupon" component={Coupon} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Admin;
