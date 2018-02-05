<template>
	<transition name="fade">
		<div class="maskLayer" v-show="show"></div>
	</transition>
</template>

<script>
export default {
	name: 'MaskLayer',
	props: { 
		show: { 
			type: Boolean,
			default: false,
			required: false
		}
	},
	methods: { 
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.fade-enter-active, .fade-leave-active { 
		transition: all 0.4s linear;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.maskLayer {
		position: fixed;
		z-index: 9;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(7, 17, 27, 0.6);
		backdrop-filter: blur(10px);
	}
</style>
