<template>
<div class="wrap">
  <header class="header">
    <button href="#" @click.prevent="filtersShowHide" class="slidepanel__btn-open">
    	<svg id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m420.404 0h-328.808c-50.506 0-91.596 41.09-91.596 91.596v328.809c0 50.505 41.09 91.595 91.596 91.595h328.809c50.505 0 91.595-41.09 91.595-91.596v-328.808c0-50.506-41.09-91.596-91.596-91.596zm61.596 420.404c0 33.964-27.632 61.596-61.596 61.596h-328.808c-33.964 0-61.596-27.632-61.596-61.596v-328.808c0-33.964 27.632-61.596 61.596-61.596h328.809c33.963 0 61.595 27.632 61.595 61.596z"/><path d="m432.733 112.467h-228.461c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-35.661c-8.284 0-15 6.716-15 15s6.716 15 15 15h35.662c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h228.461c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-273.133 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z"/><path d="m432.733 241h-35.662c-6.281-18.655-23.927-32.133-44.672-32.133s-38.39 13.478-44.671 32.133h-228.461c-8.284 0-15 6.716-15 15s6.716 15 15 15h228.461c6.281 18.655 23.927 32.133 44.672 32.133s38.391-13.478 44.672-32.133h35.662c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-80.333 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z"/><path d="m432.733 369.533h-164.194c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-99.928c-8.284 0-15 6.716-15 15s6.716 15 15 15h99.928c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h164.195c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-208.866 32.134c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.685 17.133 17.132-7.686 17.134-17.133 17.134z"/></g></svg>
    </button>
  </header>

<div class="slidepanel">
	<div class="filters" >
	  <query/>
	  <range-slider :data="gridData" rangeName="price"/>
    <filter-group :items="carMakeData" filterColName="carMake" filterCap="Марка"/>
    <filter-group :items="carYearData" filterColName="year" filterCap="Год выпуска"/>
    <clearBtn/>
	</div>
	<a href="#" @click.prevent="filtersShowHide" class="slidepanel__btn slidepanel__btn-close"></a>
</div>
<dataGrid :data="gridData"/>

</div>
</template>

<script>
import dataGrid from './components/dataGrid.vue'
import Query from './components/query.vue'
import filterGroup from './components/filterGroup.vue'
import rangeSlider from './components/rangeSlider.vue'
import clearBtn from './components/clearBtn.vue'




export default {
  name: 'App',
  data() {
    return {
      carMakeData: this.$store.state.carMake,
      carYearData: this.$store.state.year,
      gridData: this.$store.state.cars
      }
    
  },
  components: {
    dataGrid,
    Query,
    filterGroup,
    rangeSlider,
    clearBtn
  },
  methods: {
    filtersShowHide () {
      document.querySelector(".slidepanel").classList.toggle("slidepanel--open");
      document.querySelector("body").classList.toggle("body--scrdisable");
    }
    
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style-type: none;
  box-sizing: border-box;
}

*:before, *:after
{
  box-sizing: inherit;
}


body {
	font-family: 'Roboto', sans-serif;
  -webkit-overflow-scrolling: touch;
  min-height: 100vh;
  // overflow-y: scroll;
}


.body--scrdisable {
  overflow-y: hidden;
    &::after{
      content: '';
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
    }
}


.wrap {
	display: flex;
  background-color: #ffffff;
  // margin-bottom: 50px;
  padding: 50px 30px;

  @media only screen and (max-width: 820px) {
    // flex-direction: column;
    padding: 50px 10px;
  }
}

.header {
  display: none;
  @media only screen and (max-width: 820px) {
    height: 50px;
    background-color: #ffffff;
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }
}
.filters {
  padding: 0px 30px 0 0px;

  @media only screen and (max-width: 820px) {
    padding: 30px;
  }
}

.data-grid {
  flex: 1;
  width: 100%;
}

.btn {
	border: none;
  width: 100%;
  border-radius: 5px;
  font-family: inherit;
  background-color: #5ebdb9;
  color: white;
  font-size: 15px;
  padding: 10px 15px;

  &:hover,& :focus {
    background-color: #3a8e8a;;
  }
}
.clear-btn {
	margin-top: 20px;
}

.slidepanel {
  flex: 1;
  max-width: 380px;
  @media only screen and (max-width: 820px) {
    display: flex;
    flex-direction: column;
    height: 0%;
    width: 100%;
    position: fixed;
    top: 50px;
    left: 0;
    background-color: #ffffff;
    overflow: hidden;
    transition: height 0.5s;
    max-width: 100%;
    box-shadow: 1px 7px 30px -10px #ababab;
    z-index: 3;

    &--open {
      overflow-y: scroll;
      height: 75%;
      box-shadow: inset 0 1px 3px #ddd;
      // &::after{
      //   content: '';
      //   position: fixed;
      //   z-index: 1;
      //   left: 0;
      //   top: 0;
      //   width: 100%;
      //   height: 100%;
      //   background-color: rgba(0,0,0,0.4);
      // }
    }
  }

  &__btn-open {
  display: none;

    @media only screen and (max-width: 820px) {
      display: flex;
      position: fixed;
      background-color: #ffffff;
      border: none;
      top: 10px;
      right: 10px;
      width: 30px;
      height: auto;
      z-index: 10;
    }
  }
}

.fieldset {
	display: flex;
  flex-direction: column;
	border: none;
	margin: 0;
	padding: 0;

  &__input {
	  width: 100%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 15px;
  }
}

</style>
