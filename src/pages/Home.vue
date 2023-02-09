<script setup lang="ts">
import { ref } from "vue";
import FancyButton from "../components/FancyButton.vue";

const open = ref(false);
</script>

<template>
	<div class="text-center">
		<h1>Welcome to CyberStore</h1>
		<h2>your Store for the best Cyberware.</h2>
	</div>

	<FancyButton bg="red" @fancy-click="">Fancy</FancyButton>
	<FancyButton bg="blue" @fancy-click="">Button</FancyButton>
	<FancyButton @fancy-click="">is Fancy</FancyButton>
</template>
