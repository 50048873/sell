<template>
	<div class="price">
		<span class="new">￥{{newPrice}}</span>
		<span class="old" v-if="oldPrice">￥{{oldPrice}}</span>
	</div>
</template>

<script>
export default {
	name: 'NewOldPrice',
	props: {
		newPrice: {
			type: [Number, String],
			required: true
		},
		oldPrice: {
			type: [Number, String],
			required: false
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.price { 
		font-weight: 700;
		line-height: 24px;
		.new { 
			margin-right: 8px;
			font-size: 14px;
			color: rgb(240, 20, 20);
		}
		.old { 
			text-decoration: line-through;
			font-size: 10px;
			color: rgb(147, 153, 159);
		}
	}
</style>
