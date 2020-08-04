<template>
	<div class="range">
			<fieldset class="fieldset">
				<label for="min">Мин. цена</label>
				<input class="fieldset__input" type="number" name="min" step="200" v-model.lazy="min"  @change="changeLeftInput">
			</fieldset>
			<fieldset class="fieldset">
				<label for="max">Макс. цена</label>
			<input class="fieldset__input" type="number" name="max" step="200" v-model.lazy="max" @change="changeRightInput">
			</fieldset>
			
		<div class="slider" >
			<div class="slider__range" :style="rangeStyle"></div>
			<span class="slider__handle slider__handle-l" :style="handleLeftStyle"  @mousedown="dragLeft" @touchstart="dragLeft"></span>
			<span class="slider__handle slider__handle-r" :style="handleRightStyle" @mousedown="dragRight" @touchstart="dragRight"></span>
		</div>
		
	</div>
</template>

<script>
export default {
	props: {
		data: Array,
		rangeName: String
	},
    data () {
	return {
		
		rangeStyle: {
			left: '0%',
			width: '100%'
		},
		handleLeftStyle: {
			left: '0%'
		},
		handleRightStyle: {
			left: '100%'
		},
		dragging: false,
	  	containerWidth: 0,
	  	containerPos: 0,
  		positionLHandle: 0,
  		positionRHandle: 100,
  		DIFF_MINMAX: Number, //
  		MIN_INPUT: Number, //
  		MAX_INPUT: Number, //
  		min: Number, //
  		max: Number, //
		handleWidth: Number,
		mousePos: Number,
	  }},

 	
	created () {	
		this.min = 0
		this.max = Math.max(...this.data.map( (element) => {
			         				return Math.ceil(element[this.rangeName])
								 }));
 
		this.MIN_INPUT=0;
		this.MAX_INPUT=this.max;
		this.DIFF_MINMAX = this.max - this.min;

		this.resetDefSubscribe = this.$store.subscribe((mutation) => {
    	  if (mutation.type === 'resetDef') {
    	    this.min = 0
			this.max = Math.max(...this.data.map( (element) => {
			         				return Math.ceil(element[this.rangeName])
								 }));
			this.positionLHandle = 0
			this.positionRHandle = 100
			this.handleLeftStyle.left = this.positionLHandle  + '%'
			this.handleRightStyle.left = this.positionRHandle  + '%'
			this.rangeStyle.left = this.positionLHandle  + '%'
	    	this.rangeStyle.width = this.positionRHandle - this.positionLHandle  + '%'						 
    	  }
    	});
	},
	beforeDestroy() {
    	this.resetDefSubscribe();
  	}, 
 	mounted () {
	  this.$nextTick(function () {
	    this.containerWidth = document.querySelector(".slider").offsetWidth;
	    this.containerPos = document.querySelector(".slider").getBoundingClientRect().left;
	   	this.handleWidth = document.querySelector(".slider__handle").offsetWidth;
	   	})
	},
	methods: {
		dragLeft () {
			// event = event.changedTouches ? event.changedTouches[0] : event
			this.dragging = true;
		    window.addEventListener('mouseup', this.stopDrag);
	    	window.addEventListener('mousemove', this.moveLeft);
	    	window.addEventListener('touchend',this.stopDrag);
	    	window.addEventListener('touchmove',this.moveLeft);
		},
	    dragRight() {	
	      	this.dragging = true;
	        window.addEventListener('mouseup', this.stopDrag);
    		window.addEventListener('mousemove', this.moveRight);
    		window.addEventListener('touchend',this.stopDrag);
	    	window.addEventListener('touchmove',this.moveRight);

	    },
	    stopDrag() {
	    	this.dragging = false;
	    	window.removeEventListener('mouseup', this.stopDrag);
	    	window.removeEventListener('touchend',this.stopDrag);
    		window.removeEventListener('mousemove', this.moveLeft);
    		window.removeEventListener('mousemove', this.moveRight);
    		window.removeEventListener('touchmove',this.moveLeft);
			window.removeEventListener('touchmove',this.moveRight);
			this.$store.commit('setMinMax', { "field":this.rangeName, "minVal": this.min, "maxVal": this.max })	
	    },

	    moveLeft(event) { 	
	      	if (this.dragging) {
			var xMousePos = parseInt(event.clientX);	
	        this.positionLHandle = (xMousePos - this.containerPos + this.handleWidth/2) * 100 / this.containerWidth;

			if (this.positionLHandle < 0) {
				this.positionLHandle = 0
				this.min = this.MIN_INPUT
			}
			
	        if ( (this.positionLHandle >= 0) && (this.positionLHandle <= this.positionRHandle)) {
	        	this.handleLeftStyle.left = this.positionLHandle  + '%'
	    		this.rangeStyle.left = this.positionLHandle  + '%'
				this.rangeStyle.width = this.positionRHandle - this.positionLHandle  + '%'
				this.min = Math.round((this.positionLHandle <= 0 ? this.MIN_INPUT :  (this.DIFF_MINMAX * this.positionLHandle/100)),2)
			
			}
			
			if ( this.positionLHandle > this.positionRHandle) {
				this.positionLHandle = this.positionRHandle - (this.handleWidth * 100 / this.containerWidth)
				this.handleLeftStyle.left = this.positionRHandle + '%'
				this.rangeStyle.width = '0%'
				this.min = this.max
			}
	      }
	    },
	    moveRight(event) {
	    	// event = event.changedTouches ? event.changedTouches[0] : event
	      	if (this.dragging) {
			var xMousePos = event.clientX;
			this.mousePos = xMousePos
			this.positionRHandle = (xMousePos - this.containerPos - this.handleWidth/2) * 100 / this.containerWidth;
			
			if (this.positionRHandle > 100) this.positionRHandle = 100;
			
	        if (this.positionRHandle > this.positionLHandle && this.positionRHandle <= 100){
	        	this.handleRightStyle.left = this.positionRHandle + '%'
	    		this.rangeStyle.width = this.positionRHandle - this.positionLHandle  + '%'
	    		this.max = Math.round((this.positionRHandle >= 100 ? this.MAX_INPUT :(this.DIFF_MINMAX * this.positionRHandle/100)),2)
			}

			if (this.positionRHandle <= this.positionLHandle) {
				this.positionRHandle = this.positionLHandle + (this.handleWidth* 100 / this.containerWidth)
				this.handleRightStyle.left = this.positionLHandle + '%'
				this.rangeStyle.width = '0%'
				this.max = this.min
			}
	      }
	    },

	    changeLeftInput() {
			if (parseInt(this.min) >= parseInt(this.MIN_INPUT)) {
				if (parseInt(this.min) <= parseInt(this.max)) {
					this.positionLHandle = this.min*100/this.DIFF_MINMAX					
				}
				else {
					this.min=this.max
					this.positionLHandle = this.positionRHandle
				}
			}
			else {
				this.min = this.MIN_INPUT
				this.positionLHandle = 0
			}

			this.handleLeftStyle.left = this.positionLHandle  + '%'
			this.rangeStyle.left = this.positionLHandle  + '%'
	    	this.rangeStyle.width = this.positionRHandle - this.positionLHandle  + '%'	
			this.$store.commit('setMinMax', { "field":this.rangeName, "minVal": this.min, "maxVal": this.max })	
   
		},

		changeRightInput() {
			if (parseInt(this.max) >= parseInt(this.MIN_INPUT) && parseInt(this.max) <= parseInt(this.MAX_INPUT)) {
				if (parseInt(this.max) >= parseInt(this.min)) {
					this.positionRHandle = this.max*100/this.DIFF_MINMAX	
				}
				else {
					this.max=this.min
					this.positionRHandle = this.positionLHandle
				}
			}
			else {
				this.max = this.MAX_INPUT
				this.positionRHandle = 100
			}

			this.handleRightStyle.left = this.positionRHandle  + '%'
	    	this.rangeStyle.width = this.positionRHandle - this.positionLHandle  + '%'	
			this.$store.commit('setMinMax', { "field":this.rangeName, "minVal": this.min, "maxVal": this.max })	
		},
		
		},
}
</script>

<style scoped>


.range {
	position: relative;
    display: flex;
    flex-wrap: wrap;
   	justify-content: space-between;
    margin-bottom: 20px;
}

.range fieldset {
	width: 47%;
	margin-bottom: 30px;
}


.slider {
			display: block;
			margin: 0 auto;
			width: calc(100% - 40px);
			height: 3px;
			background-color: #dad7de;
			position: relative;

		}

.slider__handle {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
  background-color: #ffffff;
	border-radius: 50%;
	top: 50%;
  transform: translate(0%, -50%);
  opacity: 1;
  transition: height 0.1s, width 0.1s, border 0.2s;
  z-index: 2;
  border: 2px solid #845bc5;
 }

 .slider__handle:hover  {
  width: 27px;
  height: 27px;
  border: 2px solid #370080;

 }

.slider__handle-l {
  transform: translate(-100%, -50%);
}



 .slider__range {
	position: absolute;
	height: 100%;
	background-color: #97e0dd;
	width: 100%;
}




</style>