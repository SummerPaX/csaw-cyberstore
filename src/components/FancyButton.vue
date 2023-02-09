<script setup lang="ts">
import { computed } from "vue";

type Colors = "red" | "green" | "blue";

const props = defineProps<{
	bg?: Colors;
}>();

const emit = defineEmits(["fancy-click"]);

const computedBg = computed(() => {
	if (props.bg === "red") {
		return "bg-red-800";
	} else if (props.bg === "green") {
		return "bg-green-800";
	} else if (props.bg === "blue") {
		return "bg-blue-800";
	} else {
		return "bg-stone-800";
	}
});
</script>

<template>
	<button :class="computedBg" @click="emit('fancy-click')">
		<slot></slot>
	</button>
</template>
