import { Injectable } from '@angular/core';
import { IMenu } from '../models/menu.modal';

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
  adminMenu: IMenu[] = [
    { id: '001', name: 'Dashbaord', icon: 'th', url: '/admin/dashboard' },
    { id: '002', name: 'Category', icon: 'th', url: '/admin/categories' },
    {
      id: '003',
      name: 'Subcategory',
      icon: 'th',
      url: '/admin/sub-categories',
    },
    { id: '004', name: 'Cuisines', icon: 'th', url: '/admin/cuisines' },
    { id: '005', name: 'Outlets', icon: 'th', url: '/admin/outlets' },
    { id: '006', name: 'Recipes', icon: 'th', url: '/admin/recipes' },
    { id: '006', name: 'Users', icon: 'th', url: '/admin/users' },
  ];
  constructor() {}
}
