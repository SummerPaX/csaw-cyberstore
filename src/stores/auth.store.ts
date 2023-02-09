import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ProfileType } from "../interfaces";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: useLocalStorage("access_token", ""),
		profile: undefined as ProfileType | undefined,
	}),
	getters: {
		// computed Property to check if we are logged in
		isLoggedIn: (state) => {
			return state.token ? true : false;
		},
	},
	actions: {
		async logIn(username: string, password: string) {
			const response = await axios.post<{ access_token: string }>(
				"http://localhost:3000/auth/login",
				{ username, password }
			);

			// If no access_token was returned return success false
			if (!response?.data?.access_token) return { success: false };

			// set the token variable in the store
			this.token = response.data.access_token;

			// Sets Global Auth header for Axios
			axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

			return { success: true };
		},
		async logOut() {
			// send the logout request to the server
			const response = await axios.get("http://localhost:3000/auth/logout");

			// reset all data, including the axios default header
			this.token = "";
			this.profile = undefined;
			axios.defaults.headers.common.Authorization = undefined;

			return response;
		},
		async getProfile() {
			const response = await axios.get("http://localhost:3000/auth/profile?delay=2000");
			this.profile = response.data;
			return response.data;
		},
		async checkEmail() {
			const response = await axios.get("http://localhost:3000/auth/check-email");
			return response.data;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
