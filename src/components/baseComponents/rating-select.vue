<template>
	<div class="ratingSelect">
		<div class="selectWrap">
			<span :class="{'ON': currentIndex === index}" :style="{backgroundColor: item.color}" v-for="(item, index) in types" @click="select(index)">
				{{item.name}}
				{{item.count}}
			</span>
		</div>
		<div class="withContent" @click="toggleContent">
			<i class="fa fa-check-circle" :class="{'ON': hasContented}"></i>
			<span>只看有内容的评介</span>
		</div>
	</div>
</template>

<script>
	const ON = 'ON'
	let types = [
		{
			name: '全部',
			color: '#ccecf7'
		},
		{
			name: '推荐',
			color: '#ccecf7'
		},
		{
			name: '吐槽',
			color: '#eaebed'
		}
	]
	export default {
		name: 'RatingSelect',
		props: { 
			types: {
				type: Array,
				default() {
					return types
				},
				required: false
			}
		},
		data() { 
			return { 
				currentIndex: 0,
				hasContented: false
			}
		},
		methods: { 
			select(index) {
				this.currentIndex = index
				this.$emit('onSelect', index)
			},
			toggleContent() {
				this.hasContented = !this.hasContented
				this.$emit('onToggleContent', this.hasContented)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.ratingSelect { 
		position: relative;
		.selectWrap {
			font-size: 0;
			padding-bottom: 18px;
			border-bottom: 1px solid #e8e8e8;
			margin-bottom: 14px;
			span {
				display: inline-block;
				font-size: 12px;
				width: 60px;
				height: 32px;
				line-height: 32px;
				text-align: center;
				color: #45525a;
				margin-right: 8px;
				border-radius: 2px;
				&.ON {
					background-color: #00a0dc!important;
					color: white;
				}
			}
		}
		.withContent {
			padding-bottom: 14px;
			.fa {
				font-size: 20px;
				color: #b8bbc0;
				vertical-align: middle;
				&.ON {
					color: #00a0dc;
				}
			}
			span {
				font-size: 10px;
				color: #929699;
				vertical-align: middle;
			}
		}
		&:after {
			content: '';
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 1px;
			background-color: #e8e8e8;
			margin-right: -18px;
			margin-left: -18px;
		}
	}
</style>