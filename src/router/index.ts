import React from "react";
import Login from "../pages/login";
import Home from "../pages/home";
import Words from "../pages/words";
import Test from "../pages/test";

export interface IRoute {
	path: string;
	component: React.ComponentType;
	exact?: boolean;
}

export enum RouteNames {
	LOGIN = "/login",
	HOME = "/",
	USERS = "/users",
	WORDS = "/words",
	LEVELS = "/levels",
	TEST = "/test",
}

export const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN, exact: true, component: Login }];

export const privateRoutes: IRoute[] = [
	{
		path: RouteNames.HOME,
		exact: true,
		component: Home,
	},
	{
		path: RouteNames.WORDS,
		exact: true,
		component: Words,
	},
	{
		path: RouteNames.TEST,
		exact: true,
		component: Test,
	},
];
