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
import { watch, ref, computed, onBeforeMount } from 'vue';
import { apiGetCrewMembers } from '../../models/http-request';
import { listen, toastMsg } from '../../models/utils/event-bus';

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
const layoutStyle = computed(() => typeof layout.value === 'number' ? { 'grid-template-columns': `repeat(${layout.value}, 1fr)` } : undefined);
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
	toastMsg({ msg: 'Last paged reached, coming back to page 1' });
}

async function loadMore () {
	setNextPage();
	const res = await apiGetCrewMembers(apiOpt.value);
	if (res?.data) {
		meta.value = res.data.meta;
		items.value.push(...res.data.data);
		return res.data.data;
	} else {
		toastMsg({ msg: 'Unable to fetch data', error: true });
	}
}
async function filterMembers () {
	const res = await apiGetCrewMembers(apiOpt.value);
	if (res?.data) {
		items.value = [...res.data.data];
	}
}

// ===========================
// Watchers
// ===========================
watch(filter, async (newFilter) => {
	await filterMembers();
	toastMsg({ msg: `Required page ${page.value} with duty: ${newFilter || 'none'}`, time: 1500 });
});

// ===========================
// Life cycle
// ===========================
onBeforeMount(async () => {
	await loadMore();
});

// ===========================
// Events
// ===========================
listen('filter', (e) => {
	/* DEV NOTE:
	  Not clear from spec what should happen to the existing data when a filter is requested.
	  This implementation assumes that as a new filter is requested, the first page of the filtered data is requested
	*/
	page.value = 1;
	filter.value = e.detail === 'false' ? undefined : e.detail;
});

listen('layout', (e) => {
	layout.value = e.detail === 'auto' ? e.detail : parseInt(e.detail);
	toastMsg({ msg: `New layout: ${layout.value}`, time: 3000 });
});

listen('loadmore', async () => {
	// DEV NOTE: This implementation assumes that as a new data is requested, the current filter is kept
	const res = await loadMore();
	if (res.length) {
		toastMsg({ msg: `Required page ${page.value} with duty: ${filter.value || 'none'}`, time: 1500 });
	} else {
		toastMsg({ msg: `No data available for page: ${page.value} with duty: ${filter.value || 'none'}`, time: 1500 });
	}
});
</script>

<style></style>
