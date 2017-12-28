<template>
  <div class="goods">
  	<div class="menu-wrapper">
  		<ul>
  			<li class="menu-item line-bottom" v-for="item in goods">
  				<div class="itemWrap">
	  				<discount-type :type="item.type" v-if="item.type > 0"></discount-type>
	  				<span>{{item.name}}</span>
  				</div>
  			</li>
  		</ul>
  	</div>
  	<div class="foods-wrapper">
  		
  	</div>
  </div>
</template>

<script>
	import {ERR_OK} from 'api/config'
	import DiscountType from 'components/discount-type'
	export default {
	  name: 'Goods',
	  components: { 
	  	DiscountType
	  },
	  data () {
	    return {
	      goods: []
	    }
	  },
	  created () { 
	  	this.$http.get('/api/goods').then((res) => { 
	  		res = res.body
	  		if (res.errno === ERR_OK) { 
	  			this.goods = res.data
	  			console.log(this.goods)
	  		}
	  	})
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.goods { 
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper { 
			width: 80px;
			background-color: #f3f5f7;
			.menu-item { 
				margin: 0 12px;
				width: 56px;
				height: 54px;
				font-size: 12px;
				display: table;
				.itemWrap { 
					display: table-cell;
					vertical-align: middle;
					line-height: 14px;
				}
			}
		}
		.foods-wrapper { 
			flex: 1;
		}
	}
</style>
