import axios from "axios";
import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

// Per-Route Guard to check if user is allowed to access the page,
// and if not, he will be redirected to the Login Page.
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
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Global navigation Guard to set the Axios Header if user is logged in and the header has not been set yet
router.beforeEach(() => {
	const store = useAuthStore();

	if (store.isLoggedIn && !axios.defaults.headers.common.Authorization) {
		axios.defaults.headers.common.Authorization = `Bearer ${store.token}`;
	}
});

export default router;
