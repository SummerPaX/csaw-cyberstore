import {
	createRouter,
	createWebHistory,
	RouteLocationNormalized,
	RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const authGuard = (to: RouteLocationNormalized) => {
	const store = useAuthStore();

	return store.isLoggedIn ? true : { name: "Login", query: { ref: to.name?.toString() } };
};

const routes = [
	{ name: "Home", path: "/", component: import("../pages/Home.vue") },
	{ name: "Login", path: "/login", component: import("../pages/Login.vue") },
	{
		name: "Profile",
		path: "/profile",
		component: import("../pages/Profile.vue"),
		beforeEnter: authGuard,
	},
	{
		name: "Products",
		path: "/products",
		component: import("../pages/Products.vue"),
		beforeEnter: authGuard,
	},
];

export default createRouter({
	history: createWebHistory(),

	routes,
});
