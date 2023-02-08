<script setup lang="ts">
import { ref } from "vue";
import { useProductStore } from "../stores/product.store";

const productStore = useProductStore();
const search = ref("");

if (!productStore.products.length) {
	productStore.fetchProducts();
}
</script>

<template>
	<div>
		<form class="w-full flex" @submit.prevent="productStore.fetchProducts(search)">
			<input type="text" class="rounded-r-none h-10 flex-grow m-0 text-lg" v-model="search" />
			<button class="rounded-l-none h-10 bg-amber-500 text-black border border-black">🔎</button>
		</form>
		<div class="w-full py-1 px-2 flex text-sm items-center gap-2">
			<span>
				{{ productStore.products.length }} Ergebnisse für "{{ search || "Alle Produkte" }}"</span
			>
			<label for="sort" class="ml-auto text-end">Sortieren nach: </label>
			<select name="sort" v-model="productStore.sort" class="rounded-lg px-1">
				<option disabled value="id">Please select one</option>
				<option value="name asc">Name: Aufsteigend</option>
				<option value="name desc">Name: Absteigend</option>
				<option value="price asc">Preis: Aufsteigend</option>
				<option value="price desc">Preis: Absteigend</option>
			</select>
		</div>
	</div>
</template>
