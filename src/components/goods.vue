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
  		<ul>
  			<li class="food-list" v-for="item in goods">
  				<h1 class="title">{{item.name}}</h1>
  				<ul>
  					<li class="food-item line-bottom" v-for="food in item.foods">
  						<div class="icon">
  							<img :src="food.icon" alt="">
  						</div>
  						<div class="content">
  							<h2 class="name">{{food.name}}</h2>
  							<p class="desc">{{food.description}}</p>
  							<div class="extra">
  								<span>月售{{food.sellCount}}</span>
  								<span>好评率{{food.rating}}%</span>
  							</div>
  							<div class="price">
  								<span>￥{{food.price}}</span>
  								<span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
  							</div>
  						</div>
  					</li>
  				</ul>
  			</li>
  		</ul>
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
			.title { 
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147, 153, 159);
				background-color: #f3f5f7;
			}
			.food-item { 
				display: flex;
				padding: 18px;
				&:last-child { 
					&:after { 
						display: none;
					}
				}
			}
		}
	}
</style>
