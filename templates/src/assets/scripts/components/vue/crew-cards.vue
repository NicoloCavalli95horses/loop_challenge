<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-v-model-argument -->
<template>
	<div class="crew__main">
		<div v-if="items.length" class="crew__main__cards" :style="layoutStyle">
			<card
				v-for="item in items"
				:key="item.id"
				:disabled="hoverId && item.id != hoverId"
				:item="item"
				@hover="(i) => (hoverId = i)"
			/>
		</div>
		<div v-else class="crew__main__loading">
			<p>Loading...</p>
		</div>
	</div>
</template>

<script setup>
// ===========================
// Import
// ===========================
import {
	watch,
	ref,
	computed,
	onBeforeMount,
} from 'vue';
import {
	listen,
	toastMsg,
} from '../../models/utils/event-bus';
import {
	apiGetCrewMembers,
} from '../../models/http-request';

import card from './card.vue';

// ===========================
// Consts
// ===========================
const page = ref(0);
const items = ref([]);
const hoverId = ref(undefined);
const filter = ref(undefined);
const meta = ref(undefined);
const layout = ref(undefined);

const maxPage = computed(() => meta.value?.pagination?.limit);

const layoutStyle = computed(() => typeof layout.value === 'number'
	? { 'grid-template-columns': `repeat(${layout.value}, 1fr)` }
	: undefined);

const apiOpt = computed(() => {
	return {
		page: page.value,
		...(filter.value ? { duty: filter.value } : {}),
	};
});

// ===========================
// Functions
// ===========================
function setNextPage () {
	if (!maxPage.value) {
		page.value++;
		return;
	}
	if (page.value < maxPage.value) {
		page.value++;
		return;
	}
	page.value = 1;
	toastMsg({ msg: 'Last paged reached, coming back to page 1', time: 6500 });
}

async function fetchData ({ loadmore } = false) {
	if (loadmore) {
		setNextPage();
	}
	const res = await apiGetCrewMembers(apiOpt.value);
	if (res?.data) {
		if (loadmore) {
			meta.value = res.data.meta;
			items.value.push(...res.data.data);
		} else {
			items.value = [...res.data.data];
		}
		return res.data.data;
	}
}

// ===========================
// Watchers
// ===========================
watch(filter, async (newFilter) => {
	const res = await fetchData();
	if (res?.length) {
		toastMsg({ msg: `Required page ${page.value} with duty: ${newFilter || 'none'}`, time: 1500 });
	}
});

// ===========================
// Life cycle
// ===========================
onBeforeMount(async () => {
	await fetchData({ loadmore: true });
});

// ===========================
// Events
// ===========================
listen('filter', (e) => {
	// DEV NOTE: This implementation assumes that as a new filter is requested, the first page of the filtered data is requested
	page.value = 1;
	filter.value = e.detail === 'default' ? undefined : e.detail;
});

listen('new-layout', (e) => {
	layout.value = e.detail === 'default' ? e.detail : parseInt(e.detail);
	toastMsg({ msg: `New layout: ${layout.value}`, time: 3000 });
});

listen('load-more', async () => {
	// DEV NOTE: This implementation assumes that as a new data is requested, the current filter is kept
	const res = await fetchData({ loadmore: true });
	res?.length
		? toastMsg({ msg: `Required page ${page.value} with duty: ${filter.value || 'none'}`, time: 1500 })
		: toastMsg({ msg: `No data available for page: ${page.value} with duty: ${filter.value || 'none'}`, time: 1500 });
});
</script>

<style></style>
