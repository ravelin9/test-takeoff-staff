import React from 'react';
import Login from "../pages/Login";
import Contacts from '../pages/contacts'
export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}
export enum RouteNames {
    LOGIN = '/login',
    CONTACTS = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN , exact: true, component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.CONTACTS, exact: true, component: Contacts}
]