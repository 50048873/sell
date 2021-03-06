<template>
	<div>
	  <div class="goods">
	  	<div class="menu-wrapper" ref="menuWrapper">
	  		<ul>
	  			<li class="menu-item line-bottom" :class="{on: index === currentIndex}" v-for="(item, index) in goods" @click="selectMenu(index, $event)">
	  				<div class="itemWrap">
		  				<discount-type :type="item.type" v-if="item.type > 0"></discount-type>
		  				<span>{{item.name}}</span>
	  				</div>
	  			</li>
	  		</ul>
	  	</div>
	  	<div class="foods-wrapper" ref="foodsWrapper">
	  		<ul>
	  			<li class="food-list food-list-hook" v-for="item in goods">
	  				<h1 class="title">{{item.name}}</h1>
	  				<ul>
	  					<li class="food-item line-bottom" v-for="food in item.foods" @click="showFoodDetail(food)">
	  						<div class="icon">
	  							<img width="57" height="57" :src="food.icon" alt="">
	  						</div>
	  						<div class="content">
	  							<h2 class="name">{{food.name}}</h2>
	  							<p class="desc">{{food.description}}</p>
	  							<div class="extra">
	  								<span class="count">月售{{food.sellCount}}</span>
	  								<span>好评率{{food.rating}}%</span>
	  							</div>
	  							<new-old-price :new-price="food.price" :old-price="food.oldPrice"></new-old-price>
								<div class="shopcart-control-wrap"><shopcart-control :food="food"></shopcart-control></div>
	  						</div>
	  					</li>
	  				</ul>
	  			</li>
	  		</ul>
	  	</div>
	  	<shop-cart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
	  </div>
	  <v-food :food="selectedFood" ref="food"></v-food>
	</div>
</template>

<script>
	import {ERR_OK} from 'api/config'
	import DiscountType from 'components/discount-type'
	import ShopCart from 'components/shop-cart'
	import ShopcartControl from 'components/shopcart-control'
	import BScroll from 'better-scroll'
	import $ from 'jquery'
	import VFood from 'components/v-food'
	import NewOldPrice from 'components/baseComponents/new-old-price'
	export default {
	  name: 'Goods',
	  props: { 
	  	seller: { 
	  		type: Object,
	  		default: function() { 
	  			return {}
	  		}
	  	}
	  },
	  components: { 
	  	DiscountType,
	  	ShopCart,
	  	ShopcartControl,
	  	VFood,
	  	NewOldPrice
	  },
	  data() {
	    return {
	      goods: [],
	      listHeight: [],
	      scrollY: 0,
	      selectedFood: {}
	    }
	  },
	  computed: { 
	  	currentIndex() { 
	  		const len = this.listHeight.length
	  		for (let i = 0; i < len; i++) { 
	  			let height1 = this.listHeight[i]
	  			let height2 = this.listHeight[i + 1]
	  			if ( !height2 || this.scrollY >= height1 && this.scrollY < height2) { 
	  				return i
	  			}
	  		}
	  		return 0
	  	},
	  	selectFoods() {
	  		let foods = []
	  		this.goods.forEach((good) => {
	  			good.foods.forEach((food) => {
	  				if (food.count) {
	  					foods.push(food)
	  				}
	  			})
	  		})
	  		return foods
	  	}
	  },
	  created() { 
	  	this.$http.get('/api/goods').then((res) => { 
	  		res = res.body
	  		if (res.errno === ERR_OK) { 
	  			this.goods = res.data
	  			//console.log(this.goods)
	  			this._initScroll()
	  			this.$nextTick(() => { 
	  				this._calculateHeight()
	  			})
	  		}
	  	})
	  },
	  methods: { 
	  	selectMenu(index, event) { 
	  		this.foodsScroll.scrollToElement($('.food-list-hook')[index], 400)
	  	},
	  	_initScroll() { 
	  		this.menuScroll = new BScroll(this.$refs.menuWrapper, { 
	  			click: true
	  		})
	  		this.foodsScroll = new BScroll(this.$refs.foodsWrapper, { 
	  			click: true,
	  			probeType: 3
	  		})
	  		this.foodsScroll.on('scroll', (pos) => { 
	  			this.scrollY = Math.abs(pos.y)
	  		})
	  	},
	  	_calculateHeight() { 
	  		let $foodList = $('.food-list-hook')
	  		let height = 0
	  		this.listHeight.push(height)
	  		$foodList.each((index, val) => { 
	  			height += $(val).outerHeight()
	  			this.listHeight.push(height)
	  		})
	  	},
	  	showFoodDetail(food) {
	  		this.selectedFood = food
	  		this.$refs.food.show()
	  	}
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
			.on { 
				background-color: white;
				margin: 0;
				padding: 0 12px;
				font-weight: 700;
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
				margin-right: 18px;
				margin-left: 18px;
				padding-top: 18px;
				padding-bottom: 18px;
				&:last-child { 
					&:after { 
						display: none;
					}
				}
				.icon { 
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content { 
					flex: 1;
					.name { 
						margin: 2px 0 8px;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7, 17, 27);
					}
					.desc, .extra { 
						color: rgb(147, 153, 159);
					}
					.desc { 
						font-size: 10px;
						margin-bottom: 8px;
						line-height: 12px;
					}
					.extra { 
						font-size: 0;
						line-height: 10px;
						.count { 
							margin-right: 12px;
						}
						:nth-child(n) { 
							font-size: 10px;
						}
					}
					.shopcart-control-wrap { 
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>