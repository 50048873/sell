<template>
  <div class="shopcart-control">
    <transition name="move">
        <i class="fa fa-minus-circle decrease" v-show="food.count > 0" @click.stop="decreaseCart"></i>
    </transition>
    <span class="count" v-show="food.count > 0">{{food.count}}</span>
    <i class="fa fa-plus-circle add" @click.stop="addCart"></i>
  </div>
</template>

<script>
    import {eventHub} from 'assets/js/event.js'
    import $ from 'jquery'
    import {getPosition} from 'assets/js/mixin.js'
    export default {
      name: 'ShopcartControl',
      props: { 
        food: { 
            type: Object,
            default() { 
                return {}
            }
        }
      },
      methods: {
        addCart(event) {
            if (this.food.count) {
                this.food.count++
            } else {
                this.$set(this.food, 'count', 1)
            }

            eventHub.$emit('cart-add', event.target)
        },
        decreaseCart() {
            if (this.food.count) {
                this.food.count--
            } 
        }
      }
    }  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .shopcart-control { 
        font-size: 0;
        .move-enter-active, .move-leave-active {    // 定义过渡的状态（时间，延迟和曲线函数）
          transition: all .4s linear;
        }
        .move-enter, .move-leave-to {   // 动画开始、动画结束状态
          transform: translateX(24px) rotate(360deg);
          opacity: 0;
        }
        .count {
            display: inline-block;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            vertical-align: top;
            color: rgb(147,153,129);
        }
        .add, .decrease { 
            display: inline-block;
            font-size: 24px;
            line-height: 24px;
            padding: 6px;
            color: rgb(0, 160, 220);
        }
    }
</style>