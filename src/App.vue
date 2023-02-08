<script setup lang="ts">
import { useFavicon, useTitle } from "@vueuse/core";
import NavBar from "./components/NavBar.vue";

useTitle("Pinia Store Login");
useFavicon("/pinia.svg");
</script>

<template>
	<NavBar />
	<div class="flex w-full justify-center p-4">
		<div>
			<RouterView></RouterView>
		</div>
	</div>
</template>

<style>
h1 {
	@apply text-3xl;
}

button {
	@apply rounded-xl text-white bg-stone-900 py-0.5 px-3;
}

input,
select {
	@apply rounded-xl border border-black py-0.5 px-3 m-0;
}

.router-link-active {
	@apply underline;
}

button:disabled {
	@apply opacity-50 -z-10;
}
</style>
