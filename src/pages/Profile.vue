<script setup lang="ts">
import { AxiosError } from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const authStore = useAuthStore();
const router = useRouter();

const error = ref("");

// if the Profile has not been loaded start the getProfile action in the auth store
if (authStore.profile === undefined) {
	authStore.getProfile().catch((e: AxiosError<{ message: string }>) => {
		// catch errors and set the Error Object to the Error Message or a generic Message
		error.value = e.response?.data?.message || "Failed to get Profile";
	});
}

// start logOut action of the auth store and redirect to the Login Page
function logOut() {
	authStore.logOut();
	router.push({ name: "Login" });
}

const date = computed(() => {
	const date = new Date(authStore.profile?.joinDate || "2000");

	return date.toDateString();
});

const idStyle = computed(() => {
	if (authStore.profile?.id === 10000) {
		return "bg-red-500";
	} else {
		return "bg-green-500";
	}
});
</script>

<template>
	<main class="w-fit flex flex-col">
		<!-- if-else-if Block to implement Loading and Error States -->
		<div v-if="error" class="text-red-400 text-3xl">Error: {{ error }}</div>
		<div v-else-if="authStore.profile === undefined" class="animate-pulse">Loading...</div>
		<div v-else class="flex flex-col gap-6 items-center">
			<h1>Welcome, {{ authStore.profile.firstName }}!</h1>
			<div class="grid grid-cols-2 rounded-xl py-8 px-16 text-xl bg-stone-100">
				<label :class="idStyle">ID:</label>
				<span> {{ authStore.profile.id }}</span>
				<label>Username:</label>
				<span> {{ authStore.profile.username }}</span>
				<label>First name:</label>
				<span> {{ authStore.profile.firstName }}</span>
				<label>Last name:</label>
				<span> {{ authStore.profile.lastName }}</span>
				<label>Department:</label>
				<span> {{ authStore.profile.department }}</span>
				<label>Level:</label>
				<span> {{ authStore.profile.level }}</span>
				<label>Email:</label>
				<span> {{ authStore.profile.email }}</span>
				<label>Joined:</label>
				<span> {{ date }}</span>
			</div>
			<button @click="logOut" class="w-56">Log Out</button>
		</div>
	</main>
</template>

<style scoped></style>
