<template id="clearBtn">
	<button @click="clearFilters" class="btn clear-btn">Очистить фильтр</button>
</template>

<script>
export default {
	methods: {
		clearFilters(){
			this.$store.commit('resetDef')
		}
	}
}
</script>


<style scoped>

</style>