<script setup lang="ts">
import { ref } from "vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import Tags from "../components/Tags.vue";

const error = ref("");
</script>

<template>
	<div class="max-w-[1200px]">
		<SearchBar />
		<span v-if="error"> {{ error }}</span>
		<div class="flex gap-2">
			<Tags class="hidden md:block" />
			<ProductList />
		</div>
	</div>
</template>
