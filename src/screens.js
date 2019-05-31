/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Drawer from './modules/_global/Drawer';
import Home from './modules/app/Home';
import ProductsList from './modules/app/ProductsList';
import WishList from './modules/app/WishList';
import Product from './modules/app/Product';
import Search from './modules/app/Search';
import Initializing from './modules/Initializing'
import SignIn from './modules/authentication/SignIn'
import SignUp from './modules/authentication/SignUp'
import Camera from './modules/app/Camera';
import Profile from './modules/app/Profile';
import Notifications from './modules/app/Notifications';
//import cameraIcon from "./modules/app/components/cameraIcon";
//import  Title  from "./modules/app/components/topbarTitle";

export function registerScreens(store) {

    //Navigation.registerComponent('leaflet.cameraIcon', () => cameraIcon);
    //Navigation.registerComponent('leaflet.Title', () => Title);

    Navigation.registerComponent('leaflet.Initializing', () => (props) => (
        <Provider store={store}>
            <Initializing {...props} />
        </Provider>
    ), () => Initializing);


    //Navigation.registerComponent('leaflet.SignIn', () => SignIn);


    Navigation.registerComponent('leaflet.SignIn', () => (props) => (
        <Provider store={store}>
            <SignIn {...props} />
        </Provider>
    ), () => SignIn);


    //Navigation.registerComponent('leaflet.SignUp', () => SignUp);

    Navigation.registerComponent('leaflet.SignUp', () => (props) => (
        <Provider store={store}>
            <SignUp {...props} />
        </Provider>
    ), () => SignUp);


    Navigation.registerComponent('leaflet.Home', () => (props) => (
        <Provider store={store}>
            <Home {...props} />
        </Provider>
    ), () => Home);

    
    Navigation.registerComponent('leaflet.Product', () => (props) => (
        <Provider store={store}>
            <Product {...props} />
        </Provider>
    ), () => Product);


    Navigation.registerComponent('leaflet.Camera', () => (props) => (
        <Provider store={store}>
            <Camera {...props} />
        </Provider>
    ), () => Camera);

    Navigation.registerComponent('leaflet.ProductsList', () => (props) => (
        <Provider store={store}>
            <ProductsList {...props} />
        </Provider>
    ), () => ProductsList);

    Navigation.registerComponent('leaflet.WishList', () => (props) => (
        <Provider store={store}>
            <WishList {...props} />
        </Provider>
    ), () => WishList);

    Navigation.registerComponent('leaflet.Notifications', () => (props) => (
        <Provider store={store}>
            <Notifications {...props} />
        </Provider>
    ), () => Notifications);

    Navigation.registerComponent('leaflet.Search', () => (props) => (
        <Provider store={store}>
            <Search {...props} />
        </Provider>
    ), () => Search);

    Navigation.registerComponent('leaflet.Profile', () => (props) => (
        <Provider store={store}>
            <Profile {...props} />
        </Provider>
    ), () => Profile);

    Navigation.registerComponent('leaflet.Drawer', () => (props) => (
        <Provider store={store}>
            <Drawer {...props} />
        </Provider>
    ), () => Drawer);

}
