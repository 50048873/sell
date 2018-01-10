<template>
  <div class="shopcart-control">
	<i class="decrease fa fa-minus-circle" v-show="food.count > 0"></i>
	<span class="count" v-show="food.count > 0">{{food.count}}</span>
	<i class="add fa fa-plus-circle"></i>
  </div>
</template>

<script>
	export default {
	  name: 'ShopcartControl',
	  props: { 
	  	food: { 
	  		type: Object,
	  		default() { 
	  			return {}
	  		}
	  	}
	  },
	  created() { 
	  	//console.log(this.food)
	  }
	}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.shopcart-control { 
		font-size: 0;
		.decrease, .add { 
			font-size: 24px;
			line-height: 24px;
			padding: 6px;
			color: rgb(0, 160, 220);
		}
		.count { 
			display: inline-block;
		}
	}
</style>