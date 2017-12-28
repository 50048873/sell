<template>
  <span class="icon" :style="[iconSize, bgColor]">
  	<i :class="iconMap[type]" :style="color"></i>
  </span>
</template>

<script>
export default {
  name: 'DiscountType',
  props: { 
  	type: { 
  		type: Number,
  		required: true
  	},
  	size: { 
  		type: [String, Number],
  		default: '12px'
  	},
  	reverse: { 
  		type: Boolean,
  		default: true
  	}
  },
  computed: { 
  	iconSize() { 
  		if (this.size) { 
  			const size = parseInt(this.size) + 'px'
  			return { 
  				width: size,
  				height: size,
  				fontSize: size
  			}
  		}
  	},
  	bgColor() { 
  		return this.reverse ? { backgroundColor: this.colorMap[this.type] } : { backgroundColor: 'white'}
  	},
  	color() { 
  		return this.reverse ? { color: 'white' } : { color: this.colorMap[this.type] }
  	}
  },
  created() { 
  	this.iconMap = ['icon-decrease', 'icon-discount', 'icon-special', 'icon-invoice', 'icon-guarantee']
  	this.colorMap = ['#f67272', '#1595cc', '#14ba4a', '#80006e', '#00c48a']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.icon { 
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: 2px;
		i { 
			display: block;
			font-size: 75%;
		}
	}
</style>