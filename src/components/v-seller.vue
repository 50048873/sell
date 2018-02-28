<template>
  <div class="seller" ref="seller">
  	<div class="seller-content">
  		<div class="overview">
  			<h2 class="title">{{seller.name}}</h2>
  			<div class="desc line-bottom">
  				<star-score fontSize="18" :score="seller.score"></star-score>
  				<span class="text">({{seller.ratingCount}})</span>
  				<span class="text">月售{{seller.sellCount}}单</span>
  			</div>
  			<ul class="remark">
  				<li class="block line-right">
  					<h3>起送价</h3>
  					<div class="content">
  						<span class="stress">{{seller.minPrice}}</span>元
  					</div>
  				</li>
  				<li class="block line-right">
  					<h3>商家配送</h3>
  					<div class="content">
  						<span class="stress">{{seller.deliveryPrice}}</span>元
  					</div>
  				</li>
  				<li class="block">
  					<h3>平均配送时间</h3>
  					<div class="content">
  						<span class="stress">{{seller.deliveryTime}}</span>分钟
  					</div>
  				</li>
  			</ul>
  			<div class="favorite" @click="toggleFavorite">
  				<i class="fa fa-heart" :class="{ON: favorite}"></i>
  				<span class="text">{{favoriteText}}</span>
  			</div>
  		</div>
  		<split-vertical></split-vertical>
  		<div class="bulletin">
  			<h2 class="title">公告与活动</h2>
  			<div class="content-wrapper line-bottom">
  				<p class="content">{{seller.bulletin}}</p>
  			</div>
  			<ul class="supports">
				<li class="support-item line-bottom" v-for="(item, index) in seller.supports">
					<discount-type class="iconWrap" :type="seller.supports[index].type" size="16"></discount-type>
					<span class="text">{{seller.supports[index].description}}</span>
				</li>
			</ul>
  		</div>
  		<split-vertical></split-vertical>
  		<div class="pics">
  			<h2 class="title">商家实景</h2>
			<div class="pic-wrapper" id="picWrapper" ref="picWrapper">
				<ul class="pic-list">
					<li class="pic-item" v-for="pic in seller.pics">
						<img :src="pic" width="120" height="90" alt="">
					</li>
				</ul>
			</div>
  		</div>
  		<split-vertical></split-vertical>
  		<div class="info">
  			<h2 class="title line-bottom">商家信息</h2>
  			<ul>
  				<li class="info-item line-bottom" v-for="info in seller.infos">{{info}}</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script>
import StarScore from 'components/baseComponents/star-score'
import SplitVertical from 'components/baseComponents/split-vertical'
import DiscountType from 'components/discount-type'
import BScroll from 'better-scroll'
import $ from 'jquery'
import {ON} from 'assets/js/config'
export default {
  name: 'seller',
  props: {
  	seller: {
  		type: Object
  	}
  },
  components: {
  	StarScore,
  	SplitVertical,
  	DiscountType
  },
  data() {
  	return {
  		favorite: false
  	}
  },
  computed: {
  	favoriteText() {
  		return this.favorite ? '已收藏' : '请收藏'
  	}
  },
  methods: {
  	initScroll() {
    	this.betterScroll = new BScroll(this.$refs.seller, {
            click: true,
            bounceTime: 200
        })
  	},
  	initPicScroll() {
  		if (this.seller.pics && this.seller.pics.length) {
	  		let picWidth = 120,
				marginR = 6,
				len = this.seller.pics.length,
				width = picWidth * len + marginR * (len - 1)
			$('#picWrapper .pic-list').css('width', width)
	    	this.picScroll = new BScroll(this.$refs.picWrapper, {
	            scrollX: true
	        })
        }
  	},
  	toggleFavorite() {
  		this.favorite = !this.favorite
  		if (this.seller.id) {
  			let seller = JSON.parse(localStorage.getItem('seller')) || {}
	  		seller[this.seller.id] = {
	  			favorite: this.favorite
	  		}
	  		localStorage.setItem('seller', JSON.stringify(seller))
  		}
  	},
  	initFavorite() {
  		let seller = JSON.parse(localStorage.getItem('seller'))
  		if (!seller) return
  		let obj = seller[this.seller.id]
  		if (obj && obj['favorite']) {
  			this.favorite = true
  		}
  	}
  },
  created() {
  	this.$nextTick(() => {
    	this.initScroll()
    })
  },
  mounted() {
  	this.initPicScroll()
  },
  watch: {
    seller(newVal, oldVal) {
      this.initPicScroll()
      this.initFavorite()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.seller {
		position: absolute;
	    top: 174px;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    overflow: hidden;
	    .title {
    		font-size: 14px;
    		margin-bottom: 8px;
    		color: rgb(7,17,27);
    		height: 14px;
    		line-height: 14px;
    	}
	    .overview {
	    	padding: 18px;
	    	position: relative;
	    	.desc {
	    		font-size: 0;
	    		padding-bottom: 18px;
	    		.starScore {
	    			display: inline-block;
	    			margin-right: 8px;
					vertical-align: top;
	    		}
	    		.text {
	    			display: inline-block;
					vertical-align: top;
					margin-right: 12px;
					font-size: 10px;
					color: rgb(77,85,93);
					line-height: 18px;
	    		}
	    	}
	    	.remark {
	    		display: flex;
	    		padding-top: 18px;
	    		.block {
	    			flex: 1;
	    			text-align: center;
	    			h3 {
	    				font-size: 10px;
	    				margin-bottom: 4px;
	    				line-height: 10px;
	    				color: rgb(147, 153, 159);
	    			}
	    			.content {
	    				line-height: 24px;
	    				font-size: 10px;
	    				color: rgb(7, 17, 27);
	    				.stress {
	    					font-size: 24px;
	    				}
	    			}
	    		}
	    	}
	    	.favorite {
	    		position: absolute;
	    		top: 18px;
	    		right: 18px;
	    		text-align: center;
	    		.fa {
	    			display: block;
	    			line-height: 24px;
	    			color: #d4d6d9;
	    			font-size: 24px;
	    			margin-bottom: 4px;
	    			&.ON {
		    			color: rgb(240, 20, 20);
		    		}
	    		}
	    		.text {
	    			line-height: 10px;
	    			font-size: 10px;
	    			color: rgb(77,85,93);
	    		}
	    	}
	    }
	    .bulletin {
	    	padding: 18px 18px 0 18px;
	    	.content-wrapper {
	    		padding: 0 12px 16px 12px;
	    		.content {
	    			font-size: 12px;
	    			line-height: 24px;
	    			color: rgb(240,20,20);
	    		}
	    	}
	    	.supports {
	    		.support-item {
	    			padding: 16px 12px;
	    			&:last-child:after {
		    			border-bottom: none;
		    		}
	    		}
	    		.text {
	    			font-size: 12px;
	    			color: rgb(7, 17, 27);
	    			line-height: 16px;
	    		}
	    	}
	    }
	    .pics {
	    	padding: 18px;
	    	.title {
	    		margin-bottom: 12px;
	    	}
	    	.pic-wrapper {
	    		width: 100%;
	    		overflow: hidden;
	    		white-space: nowrap;
	    		.pic-list {
	    			font-size: 0;
	    			.pic-item {
	    				display: inline-block;
	    				margin-right: 6px;
	    				width: 120px;
	    				height: 90px;
	    				&:last-child {
	    					margin-right: 0;
	    				}
	    			}
	    		}
	    	}
	    }
	    .info {
	    	padding: 18px 18px 0 18px;
	    	.title {
				margin-bottom: 0;
	    		padding-bottom: 12px;
	    	}
	    	.info-item {
	    		padding: 16px 12px;
	    		font-size: 12px;
	    		color: rgb(7, 17, 27);
	    		line-height: 16px;
	    		&:last-child:after {
	    			border-bottom: none;
	    		}
	    	}
	    }
	}
</style>