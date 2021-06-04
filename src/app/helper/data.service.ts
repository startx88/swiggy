import { Injectable } from '@angular/core';
import { NavMenu } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  name: string = 'Swiggy';
  year: number = new Date().getFullYear();
  login: string = 'Login';
  loginText: string = "If you don't have an account, please click on";
  register: string = 'Register';
  registerText: string = 'If you have an account, please click on';
  rememberMe: string = 'remember me';
  forgotPassword: string = 'Forgot Password';
  welcomeTitle: string = 'Welcome to Swiggy';
  welcomeText: string =
    'At Swiggy, we build products & solutions that redefine the food ordering & delivery space in India, every single day. The best part? Every bit of your work at Swiggy will help us change the way India eats!';
  footerText: string = 'All rights reserved, powerd by ';
  poweredBy: string = 'startx.com';
  singin: string = 'Sign In';
  signup: string = 'Sign Up';
  socialText: string = 'Sign in with google and facebook';
  googleText: string = 'Google';
  fbText: string = 'Facebook';
  registerdRestaurant: string = 'Register restaurant';
  totalRecipes: string = 'Total recipes';
  satisfyUser: string = 'Satisfy user';
  adminMenu: NavMenu[] = [
    { id: '001', name: 'Dashbaord', icon: 'th', url: '/dashboard' },
    {
      id: '002',
      name: 'Category',
      icon: 'long-arrow-right',
      url: '/categories',
    },
    {
      id: '003',
      name: 'Subcategory',
      icon: 'long-arrow-right',
      url: '/sub-categories',
    },
    {
      id: '004',
      name: 'Cuisines',
      icon: 'long-arrow-right',
      url: '/cuisines',
    },
    {
      id: '005',
      name: 'Outlets',
      icon: 'long-arrow-right',
      url: '/outlets',
    },
    {
      id: '006',
      name: 'Recipes',
      icon: 'long-arrow-right',
      url: '/recipes',
    },
    { id: '006', name: 'Users', icon: 'long-arrow-right', url: '/users' },
  ];
  partnerMenu: NavMenu[] = [
    { id: '001', name: 'Dashbaord', icon: 'th', url: '/dashboard' },
    { id: '002', name: 'Outlet', icon: 'building ', url: '/outlet' },
    { id: '004', name: 'Product', icon: 'coffee', url: '/products' },
    { id: '005', name: 'Orders', icon: 'long-arrow-right', url: '/orders' },
    { id: '006', name: 'Users', icon: 'users', url: '/users' },
  ];
  constructor() {}
}
