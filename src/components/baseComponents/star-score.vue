<template>
	<div class="starScore">
		<span v-for="(item, index) in starNum" class="item" :style="size">
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
			default: 4.3,
			required: false
		},
		fontSize: { 
			type: String,
			default: '24px',
			required: false
		},
		margin: { 
			type: String,
			default: '4px',
			required: false
		}
	},
	data() { 
		return { 
			scoreArr: []
		}
	},
	computed: { 
		size() { 
			return {
				fontSize: this.fontSize, 
				width: this.fontSize, 
				height: this.fontSize,
				marginRight: this.margin
			}
		}
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
			decimals && (arr[arr.length] = decimals[0] * 1)
			return arr
		},
		getColorStar(index) { 
			let arr = this.scoreToArr()
			let score = arr[index]
			if (score === 1) { 
				return STAR
			} else if (score >= 0.5) { 
				return STAR_HALF
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
			float: left;
			width: 18px;
			height: 18px;
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
