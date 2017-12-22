<template>
	<div class="starScore">
		<span v-for="(item, index) in starNum" class="item">
			<i class="icon-star"></i>
			<i :class="getColorStar(index)"></i>
		</span>
	</div>
</template>

<script>
const STAR = 'icon-star'
const STAR_HALF = 'icon-star-half'
export default {
	name: 'starScore',
	props: { 
		starNum: { 
			type: Number,
			default: 5,
			required: false
		},
		scoreNum: { 
			type: Number,
			default: 3.2,
			required: false
		},
		fontSize: { 
			type: String,
			default: '18px',
			required: false
		}
	},
	data() { 
		return { 
			scoreArr: []
		}
	},
	computed: { 

	},
	methods: { 
		scoreToArr() { 
			let scoreNum = this.scoreNum
			let starNum = this.starNum
			let arr = []
			let integer = parseInt(scoreNum)
			let decimals = /(\.\d*)/.exec(scoreNum)
			for (var i = 0; i < integer; i++) { 
				arr[i] = 1
			}
			arr[arr.length] = decimals
			if (arr.length < starNum) { 
				arr.length = starNum
			}
			return arr
		},
		getColorStar(index) { 
			let arr = this.scoreToArr()
			let score = arr[index]
			if (score) { 
				if (score === 1) { 
					return STAR
				} else { 
					return STAR_HALF
				}
			}
			return ''
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.starScore { 
		.item { 
			position: relative;
			font-size: 0;
			[class*="icon-star"] { 
				font-size: 18px;
			}
			.icon-star:first-child { 
				position: absolute;
				color: #737577;
			}
			.icon-star:last-child, .icon-star-half { 
				position: relative;
				color: #ff9900;
			}
		}
	}
</style>
