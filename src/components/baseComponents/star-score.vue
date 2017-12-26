<template>
	<div class="starScore">
		<span v-for="(item, index) in star" class="item" :style="size">
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
		star: { 
			type: Number,
			default: 5,
			required: false
		},
		score: { 
			type: Number,
			default: 0,
			required: false
		},
		fontSize: { 
			type: String,
			default: '18',
			required: false
		},
		margin: { 
			type: String,
			default: '4',
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
				fontSize: parseInt(this.fontSize) + 'px', 
				width: parseInt(this.fontSize) + 'px', 
				height: parseInt(this.fontSize) + 'px',
				marginRight: parseInt(this.margin) + 'px'
			}
		}
	},
	methods: { 
		scoreToArr() { 
			let score = this.score
			let star = this.star
			let arr = []
			let integer = parseInt(score)
			let decimals = /(\.\d*)/.exec(score)
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
		display: inline-block;
		.item { 
			position: relative;
			float: left;
			width: 18px;
			height: 18px;
			i { 
				display: inline-block;
				width: 100%;
				height: 100%;
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
