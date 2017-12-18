<template>
  <div class="header">
  	<div class="content-wrapper">
  		<div class="avator">
  			<img width="64" height="64" :src="seller.avatar" alt="">
  		</div>
  		<div class="content">
  			<div class="title">
  				<span class="brand"></span>
  				<span class="name">{{seller.name}}</span>
  			</div>
  			<div class="description">
  				{{seller.description}}/{{seller.deliveryTime}}分钟送达
  			</div>
  			<div v-if="seller.supports" class="support">
  				<span class="icon"><i :class="iconMap[seller.supports[0].type]"></i></span>
  				<span class="text">{{seller.supports[0].description}}</span>
  			</div>
  		</div>
  		<div v-if="seller.supports" class="support-count" @click="showDetail">
  			<span class="count">{{seller.supports.length}}个</span>
  			<i class="fa fa-angle-right"></i>
  		</div>
  	</div>
  	<div class="bulletin-wrapper" @click="showDetail">
  		<span class="bulletin-title"></span>
  		<span class="bulletin-text">{{seller.bulletin}}</span>
  		<i class="fa fa-angle-right"></i>
  	</div>
  	<div class="background" :style="{backgroundImage: 'url(' + seller.avatar + ')'}"></div>
  	<div class="detail" v-show="detailShow">
  		<div class="detail-main">
			<h1 class="name">{{seller.name}}</h1>
		</div>
  		<div class="detail-close">
  			<i class="fa fa-close"></i>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: { 
  	seller: { 
  		type: Object,
  		default: {}
  	}
  },
  data() { 
  	return { 
  		detailShow: false
  	}
  },
  methods: { 
  	showDetail() { 
  		this.detailShow = true;
  	}
  },
  created() { 
  	this.iconMap = ['icon-decrease', 'icon-discount', 'icon-special', 'icon-invoice', 'icon-guarantee'];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	@import '../assets/less/function.less';
	.header { 
		color: #fff;
		background-color: rgba(7, 17, 27, 0.5);
		position: relative;
		overflow: hidden;
		.content-wrapper { 
			padding: 24px 12px 18px 24px;
			font-size: 0;
			position: relative;
			.avator { 
				display: inline-block;
				vertical-align: top;
				img { 
					border-radius: 2px;
				}
			}
			.content { 
				display: inline-block;
				margin-left: 16px;
				.title { 
					margin: 2px 0 8px 0;
					.brand { 
						display: inline-block;
						vertical-align: top;
						width: 30px;
						height: 18px;
						.bg-image('../imgs/brand@2x.png', '../imgs/brand@3x.png');
						background-size: 30px 18px;
						background-repeat: no-repeat;
					}
					.name { 
						margin-left: 6px;
						font-size: 16px;
						line-height: 18px;
						font-weight: bold;
					}
				}
				.description { 
					margin-bottom: 10px;
					line-height: 12px;
					font-size: 12px;
				}
				.support { 
					.icon { 
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-color: white;
						border-radius: 2px;
						i { 
							display: block;
							transform: scale(0.8);
							font-size: 12px;
						}
						.icon-decrease { 
							color: #f67272;
						}
						.icon-discount { 
							color: #1595cc;
						}
						.icon-special { 
							color: #14ba4a;
						}
						.icon-invoice { 
							color: #80006e;
						}
						.icon-guarantee { 
							color: #00c48a;
						}
					}
					.text { 
						font-size: 10px;
						line-height: 12px;
						vertical-align: 2px;
					}
				}
			}
			.support-count { 
				position: absolute;
				right: 12px;
				bottom: 14px;
				padding: 0 8px;
				height: 24px;
				line-height: 24px;
				border-radius: 14px;
				background-color: rgba(0, 0, 0, 0.2);
				text-align: center;
				font-size: 10px;
				.count { 
					vertical-align: top;
				}
				.fa { 
					margin-left: 2px;
				}
			}
		}
		.bulletin-wrapper { 
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 0 22px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			background-color: rgba(7, 17, 27, 0.2);
			.bulletin-title { 
				display: inline-block;
				vertical-align: middle;
				width: 22px;
				height: 12px;
				.bg-image('../imgs/bulletin@2x.png', '../imgs/bulletin@3x.png');
				background-size: 22px 12px;
				background-repeat: no-repeat;
			}
			.bulletin-text { 
				vertical-align: middle;
				font-size: 10px;
				margin: 0 4px 0 2px;
			}
			.fa { 
				position: absolute;
				font-size: 10px;
				right: 12px;
				top: 8px;
			}
		}
		.background { 
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			filter: blur(10px);
		}
		.detail { 
			position: fixed;
			z-index: 100;
			width: 100%;
			height: 100%;
			overflow: auto;
			background-color: rgba(7, 17, 27, 0.8);
			top: 0;
			left: 0;
			.detail-main { 
				min-height: 100%;
				padding-top: 64px;
				padding-bottom: 64px;
				box-sizing: border-box;
				.name { 
					line-height: 16px;
					text-align: center;
					font-size: 16px;
					font-weight: 700;
				}
			}
			.detail-close { 
				line-height: 64px;
				margin-top: -64px;
				text-align: center;
				.fa { 
					font-size: 20px;
					padding: 10px;
				}
			}
		}
	}
</style>
