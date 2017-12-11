<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab line-bottom">
    	<div class="tab-item">
    		 <router-link to="/goods"><i class="fa fa-camera-retro"></i>商品</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/ratings">评论</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/seller">商家</router-link>
    	</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header'

export default {
  name: 'app',
  components: { 
    vHeader: header
  },
  data () { 
  	return { 
  		seller: {}
  	}
  },
  created () { 
  	this.$http.get('/api/seller')
  		.then((res) => { 
  			this.seller = res.body.data
  			console.log(this.seller)
  		})
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.tab { 
	display: flex;
	height: 40px;
	line-height: 40px;
	text-align: center;
	position: relative;
	.tab-item { 
		flex: 1;
		a { 
			display: block;
			font-size: 14px;
			color: rgb(77, 85, 93);
		}
		.router-link-active { 
			color: rgb(240, 20, 20);
		}
	}
}
</style>
