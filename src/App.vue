<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab line-bottom">
    	<div class="tab-item">
    		 <router-link to="/goods">商品</router-link>
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
import header from 'components/header'
import {ERR_OK} from 'api/config'

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
  			res = res.body
  			if (res.errno === ERR_OK) { 
	  			this.seller = res.data
	  			console.log(this.seller)
  			}
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
