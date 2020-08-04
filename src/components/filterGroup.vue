<template>
	<div class="filter">
	<div class="filter__title">{{filterCap}}</div>
	<div class="filter__group">
		<div v-for="(group, index) in items" :key="index" class="filter__item">
			<label class="filter__item-lb">
				<input type="checkbox" name="" :value=group.value class="filter__chk" v-model="selectedItems" @change="select">
				<span>{{group.value}}</span>
			</label>
		</div>
	</div>
		<div class="filter__group-count">Выбранно: {{countItems}}</div>
	</div>
</template>

<script>
export default {
    props: {
		items: Array,
		filterColName: String,
		filterCap: String
	},
	data () {
		return {
			selectedItems: [],
			countItems: 0
		}
	},
	methods: {
		select (){
			this.$store.commit('addToFilterArr', { "colName":this.filterColName, "selectedItms": this.selectedItems })
			this.countItems = this.selectedItems.length
		}
	},
	created() {
    	this.resetDefSubscribe = this.$store.subscribe((mutation) => {
    	  if (mutation.type === 'resetDef') {
    	    // console.log(`Updating to ${state.filterArr}`);
			this.selectedItems = []
			this.countItems = 0
    	  }
    	});
  	},
 	beforeDestroy() {
    	this.resetDefSubscribe();
  	},
}
</script>

<style scoped>
.filter {
  /*border: 1px dotted #c7c7c7;*/
  /*padding: 10px 20px;*/
  margin-bottom: 10px;
}

.filter__group {
  max-width: 300px;
  /* height: 200px; */
  overflow: hidden;
  overflow-y: scroll;
}

.filter__title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #ffe255;
}

.filter__group-count {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  color: #636262;
  background-color: #eaeaea;
  padding: 5px 0;
}

.filter__item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 3px 5px;
    margin: 3px 0;
}

.filter__item-lb{
    font-size: 12px;
    color:#0073BE;
    display: flex;
    align-items: flex-start;
}

.filter__item-lb:hover {
  cursor: pointer;
}



.filter__chk {
  margin: 0px 7px 0px 0px;
  font-size: 16px;
  flex: 0 0 auto;
}

</style>