<template>
  <div class="shopcart">
  	<div class="content">
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo">
  					<i class="fa fa-shopping-cart"></i>
  				</div>
  			</div>
  			<div class="price">0元</div>
  			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
  		</div>
  		<div class="content-right">
  			<div class="pay">
  				￥{{minPrice}}元起送
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart',
  props: { 
  	selectFoods: { 
  		type: Array,
  		default() { 
  			return []
  		}
  	},
  	deliveryPrice: { 
  		type: Number,
  		default: 0
  	},
  	minPrice: { 
  		type: Number,
  		default: 0
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.shopcart { 
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		background-color: black;
		.content { 
			display: flex;
			background-color: #141d27;
			font-size: 0;
			color: rgba(255,255,255,0.4);
			.content-left { 
				flex: 1;
				.logo-wrapper { 
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					border-radius: 50%;
					background-color: #141d27;
					.logo { 
						width: 100%;
						height: 100%;
						border-radius: 50%;
						text-align: center;
						background-color: #2b343c;
						.fa-shopping-cart { 
							font-size: 24px;
							color: #80858a;
							line-height: 44px;
						}
					}
				}
				.price { 
					display: inline-block;
					line-height: 24px;
					vertical-align: top;
					margin-top: 12px;
					padding-right: 12px;
					box-sizing: border-box;
					border-right: 1px solid rgba(255,255,255,0.1);
					font-size: 16px;
					font-weight: 700;
					
				}
				.desc { 
					display: inline-block;
					line-height: 24px;
					vertical-align: top;
					margin: 12px 0 0 12px;
					font-size: 10px;
				}
			}
			.content-right { 
				flex: 0 0 105px;
				width: 105px;
				.pay { 
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					background-color: #2b333b;
				}
			}
		}
	}
</style>