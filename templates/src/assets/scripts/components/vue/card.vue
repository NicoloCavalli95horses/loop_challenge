<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="cardRef"
		class="crew__main__cards__card"
		@mouseenter="onMouseEnter(item.id)"
		@mouseleave="onMouseLeave"
	>
		<div
			class="crew__main__cards__card__image"
			:class="{ 'disabled black-white': disabled }"
			:style="{ 'background-image': `url(${item.image})` }"
		/>
		<div
			v-show="isHover"
			class="crew__main__cards__card__hidden"
			:class="[isMobile ? '' : isLastCard ? 'from-right' : 'from-left']"
		>
			<h2>{{ item.name }}</h2>
			<p>{{ item.duties }}</p>
			<div class="crew__main__cards__card__hidden__tags">
				<div v-for="tag in item.duty_slugs" :key="tag" class="crew__main__cards__card__hidden__tags__tag">
					<p>{{ tag }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// ===========================
// Import
// ===========================
import { ref } from 'vue';
import { listen } from '../../models/utils/event-bus';

// ===========================
// Props
// ===========================
defineProps({
	item: Object,
	disabled: Boolean,
});
const emit = defineEmits(['hover']);

// ===========================
// Consts
// ===========================
const SINGLE_COL_CARD_W = 580;
const isHover = ref(false);
const isLastCard = ref(false);
const isMobile = ref(window.innerWidth <= SINGLE_COL_CARD_W);
const cardRef = ref(undefined);
const cardRect = ref(undefined);

// ===========================
// Functions
// ===========================
function onMouseEnter (id) {
	cardRect.value = cardRef.value.getBoundingClientRect();
	isLastCard.value = window.innerWidth - (cardRect.value.left + cardRect.value.width) < cardRect.value.width;
	isHover.value = true;
	emit('hover', id);
}

function onMouseLeave () {
	isHover.value = false;
	isLastCard.value = false;
	emit('hover', undefined);
}

// ===========================
// Events
// ===========================
listen('window-resized', (e) => {
	isMobile.value = e.detail.width <= SINGLE_COL_CARD_W;
});

</script>

<style></style>
