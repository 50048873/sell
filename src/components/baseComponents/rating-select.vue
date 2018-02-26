<template>
	<div class="ratingSelect">
		<div class="selectWrap line-bottom">
			<span class="select" :class="{ON: current_index === index}" :style="{backgroundColor: item.color}" v-for="(item, index) in data" @click="select(index)">
				<span>{{item.name}}</span>
				<span>{{parseInt(item.count) >= 0 ? item.count : ''}}</span>
			</span>
		</div>
		<div class="withContent" @click="toggleContent">
			<i class="fa fa-check-circle" :class="{ON: has_contented}"></i>
			<span>只看有内容的评介</span>
		</div>
	</div>
</template>

<script>
	import {ON} from 'assets/js/config.js'
	let data = [
		{
			name: '全部',
			color: '#ccecf7',
			count: -1
		},
		{
			name: '满意',
			color: '#ccecf7',
			count: -1
		},
		{
			name: '不满意',
			color: '#eaebed',
			count: -1
		}
	]
	export default {
		name: 'RatingSelect',
		props: { 
			data: {
				type: Array,
				default() {
					return data
				},
				required: false
			},
			hasContented: {
				type: Boolean,
				default: false,
				required: false
			},
			currentIndex: {
				type: Number,
				default: 0,
				required: false
			}
		},
		data() {
			return {
				has_contented: this.hasContented,
				current_index: this.currentIndex
			}
		},
		methods: { 
			select(index) {
				this.current_index = index
				this.$emit('onSelect', index)
			},
			toggleContent() {
				this.has_contented = !this.has_contented
				this.$emit('onToggleContent', this.has_contented)
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
			
			.select {
				display: inline-block;
				font-size: 12px;
				padding: 10px 12px;
				text-align: center;
				color: #45525a;
				margin-right: 8px;
				border-radius: 2px;
				&.ON {
					background-color: #00a0dc!important;
					color: white;
				}
				span:last-child {
					font-size: 8px;
				}
			}
		}
		.withContent {
			padding-top: 14px;
			padding-bottom: 14px;
			.fa {
				font-size: 20px;
				color: #b8bbc0;
				vertical-align: middle;
				&.ON {
					color: #00c850;
				}
			}
			span {
				font-size: 10px;
				color: #929699;
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