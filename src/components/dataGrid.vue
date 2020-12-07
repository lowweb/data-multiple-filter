<template>
<table class="data-grid">
	<thead>
	  <tr>
	    <th v-for="(column, index) in colName" :key="index" @click="sortByColumn(column.key)">{{column.name}}
	    	<span class="data-grid__head-arrow" :class="sortOrders[column.key] > 0 ? 'asc' : 'dsc'"></span>
		</th>
	  </tr>
	 </thead>	

	 <tbody>
	 	<tr v-for="(car,index) in dataGrid" :key="index">
	        <td v-for="(column, index) in colName" :key="index">
	          {{car[column.key]}}
	        </td>
	 	 </tr>
	 </tbody>
	  <tbody v-if="Object.keys(dataGrid).length == 0">
	  	<tr>
	 		<th class="data-grid--noresult" colspan="5" scope="colgroup">Позиции не найдены</th>
	 	</tr>
	  </tbody>
	</table>
</template>

<script>
export default {
	props: {
		data: Array
	},
	name: 'dataGrid',
	data() {
		var sortOrders = {}
		var colName = this.$store.state.colName
          	colName.forEach((item) => 
				sortOrders[item.key] = 1
			)
    return {
    		sortKey: "",
			sortOrders,
			colName
    	}
 	},
  	methods: {
	  sortByColumn (key) {
		this.sortKey = key;
		this.sortOrders[key] = this.sortOrders[key] * -1; 
		
	  }      
	},
	computed: {
		dataGrid() {
			let data = this.data
			let sortKey = this.sortKey
			let order = this.sortOrders[sortKey]
			let searchQuery = this.$store.state.query && this.$store.state.query.toLowerCase()
			let filterArr = this.$store.state.filterArr
			let minMax = this.$store.state.minMaxArr

		
			//search filter
			if (searchQuery) {
              data = data.filter((row) => {
                return Object.keys(row).some((key) => {
                  return (
                    String(row[key])
                      .toLowerCase()
                      .indexOf(searchQuery) > -1
                  )
								})
              })
			}
			
			//params filter
			Object.keys(filterArr).some((key) => {
				if (filterArr[key].length > 0)
				{
					data = data.filter((data) => {
					return (filterArr[key].includes(data[key]))						
				})
				}					
			})

			//max min 
			if (minMax["min"]>=0 && minMax["max"]>=0 && minMax["field"]) {
				data = data.filter((res) => {
					return ( res[minMax["field"]] >= minMax["min"] && res[minMax["field"]] <= minMax["max"] )
				})
			}

			//sorting
			if (sortKey) {
              data = data.slice().sort((a, b) => {
                a = a[sortKey];
                b = b[sortKey];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
              });
            }
			return data 
		},
		

	}
 
}
</script>

<style lang="scss">

.data-grid {
  font-family: inherit;
  border-collapse: collapse;


	& thead {
		background-color: #5ebdb9;
	  color: #ffffff;
	}
	
	& thead th {
	  text-align: left;
	 }
	
	& tbody td:last-child {
	  text-align: center;
	}
	& td, th {
	  border: 1px solid #f3f3f3;
	  text-align: left;
	  padding: 8px;
	}
	& td:last-child, th:last-child {
	    min-width: 80px;
	  }
	
	& tr:nth-child(even) {
	  background-color: #f3f3f3;
	}
	
	
	&--noresult {
		color: #c1c1c1;
	    font-weight: normal;
	    text-align: center;
	}
	
	
	&__head-arrow {
	  display: inline-block;
	  vertical-align: middle;
	  width: 0;
	  height: 0;
	  margin-left: auto;
	  opacity: 0;
	}
	
	&__head-arrow.asc {
	  opacity: 1;
	  border-left: 4px solid transparent;
	  border-right: 4px solid transparent;
	  border-bottom: 4px solid #fff;
	}
	
	&__head-arrow.dsc {
	  opacity: 1;	
	  border-left: 4px solid transparent;
	  border-right: 4px solid transparent;
	  border-top: 4px solid #fff;
	}

}


</style>