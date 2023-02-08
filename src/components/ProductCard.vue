<script setup lang="ts">
import { computed } from "vue";
import { Product } from "../interfaces";

const props = defineProps<{
	product: Product;
}>();

const decimalPlaces = computed(() => {
	const price = props.product.price;
	const decimals = (price - Math.floor(price)) * 100;
	return decimals > 0 ? decimals.toPrecision(2) + " " : " ";
});
</script>

<template>
	<div class="flex flex-col sm:flex-row border rounded-lg p-2 gap-2">
		<img class="h-40 w-40 shrink-0 object-contain" :src="product.image" :alt="product.name" />
		<div class="min-h-40 flex flex-col justify-between w-full">
			<div class="flex items-start w-full">
				<h2 class="text-2xl">{{ product.name }}</h2>
				<button class="hidden md:block bg-amber-300 text-black ml-auto whitespace-nowrap" disabled>
					Add to Cart
				</button>
			</div>
			<div class="text-3xl flex">
				{{ Math.floor(product.price) }}
				<span class="text-base">{{ decimalPlaces }}€</span>
			</div>
			<p>{{ product.description }}</p>
			<button class="md:hidden bg-amber-300 text-black mr-auto whitespace-nowrap" disabled>
				Add to Cart
			</button>
		</div>
	</div>
</template>
