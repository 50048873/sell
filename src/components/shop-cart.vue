<template>
  <div class="shopcart">
  	<div class="content">
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo">
  					<i class="fa fa-shopping-cart"></i>
  				</div>
  			</div>
  			<div class="price"></div>
  			<div class="desc"></div>
  		</div>
  		<div class="content-right">
  			
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.shopcart { 
		position: fixed;
	}
</style>
