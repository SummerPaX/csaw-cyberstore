<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const authStore = useAuthStore();

const router = useRouter();

function logOut() {
	authStore.logOut();
	router.push({ name: "Login" });
}
</script>

<template>
	<div class="bg-stone-900 flex w-full justify-center items-center gap-4 p-2 text-white">
		<div class="flex grow max-w-[1200px] gap-4 p-2">
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/profile">Profile</RouterLink>
			<div class="ml-auto">
				<span v-if="authStore.profile" class="mr-2 opacity-50"
					>Hello, {{ authStore.profile.firstName }}</span
				>
				<a class="cursor-pointer" v-if="authStore.isLoggedIn" @click="logOut">Logout</a>
				<RouterLink v-else to="/login">Login</RouterLink>
			</div>
		</div>
	</div>
</template>
