<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left" :class="highlightByTotalCount">
                    <div class="logo-wrapper">
                        <div class="logo">
                            <i class="fa fa-shopping-cart"></i>
                        </div>
                        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                    </div>
                    <div class="price">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop="pay">
                    <div class="pay" :class="highlightByMinPrice">{{payDesc}}</div>
                </div>
            </div>
            <transition 
                name="ballWrap"
                @before-enter="beforeEnter"
                @enter="enter">
                <div class="ballWrap" v-show="show" ref="ballWrap" @transitionend="transitionend">
                    <transition 
                        name="ball"
                        @before-enter="beforeEnter"
                        @enter="enter">
                        <div class="ball" v-show="show" ref="ball" @transitionend="transitionend"></div>
                    </transition>
                </div>
            </transition>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content">
                        <ul>
                            <li class="food line-bottom" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>${{food.price * food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <shopcart-control :food="food"></shopcart-control>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <mask-layer :show="listShow" @click.native="toggleList"></mask-layer>
    </div>
</template>

<script>
    import {CSS_INTERACTION} from 'assets/js/config.js'
    import {eventHub} from 'assets/js/event.js'
    import $ from 'jquery'
    import ShopcartControl from 'components/shopcart-control'
    import MaskLayer from 'components/baseComponents/mask-layer'
    export default {
        name: 'ShopCart',
        props: { 
            selectFoods: { 
                type: Array,
                default() { 
                    return [{ 
                        price: 10,
                        count: 1
                    }]
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
        },
        components: {
            ShopcartControl,
            MaskLayer
        },
        data() {
            return {
                show: false,
                expanded: false
            }
        },
        computed: { 
            totalPrice() { 
                let total = 0
                this.selectFoods.forEach((item) => { 
                    total += item.price * item.count
                })
                return total
            },
            totalCount() { 
                let count = 0
                this.selectFoods.forEach((item) => { 
                    count += item.count
                })
                return count
            },
            highlightByTotalCount() { 
                return this.totalCount > 0 ? CSS_INTERACTION.HIGHLIGHT : ''
            },
            highlightByMinPrice() { 
                return this.totalPrice >= this.minPrice ? CSS_INTERACTION.HIGHLIGHT : ''
            },
            payDesc() { 
                if (this.totalPrice === 0) { 
                    return `￥${this.minPrice}元起送`
                } else if (this.totalPrice < this.minPrice) { 
                    return `还差￥${this.minPrice - this.totalPrice}元起送`
                } else { 
                    return '去结算'
                }
            },
            listShow() {
                if (this.totalCount && this.expanded) {
                    return true
                }
                return false
            }
        },
        methods: {
            drop(el) {
                this.$nextTick(() => {  // 加入队列，解决手机上同时执行多个动画慢的问题
                    let $target = $(el)
                    let originOffset = $target.offset()
                    originOffset.width = $target.outerWidth()
                    originOffset.height= $target.outerHeight()

                    let $ballWrap = $(this.$refs.ballWrap),
                        ballWrapWidth = $ballWrap.outerWidth(),
                        ballWrapHeight = $ballWrap.outerHeight()
                    this.offset = {
                        x: originOffset.left - 32 + (originOffset.width - ballWrapWidth) / 2, // 点击目标左边距离页面左边距 - 动画小球左边距离页面左边距 + (点击目标宽 - 动画小球宽) / 2
                        y: -( window.innerHeight - originOffset.top - 38 - (originOffset.height - ballWrapHeight) / 2) // 视口高 - 点击目标上边距离页面上边距 - (点击目标高 - 动画小球高) / 2
                    }
                    this.show = true
                })
            },
            beforeEnter(el) {
                let x = this.offset.x,
                    y = this.offset.y
                this.ballWrap = $(this.$refs.ballWrap)
                this.ball = $(this.$refs.ball)
                this.ballWrap.css({
                    '-webkit-transform': `translate3d(0, ${y}px, 0)`,
                    'transform': `translate3d(0, ${y}px, 0)`
                })
                this.ball.css({
                    '-webkit-transform': `translate3d(${x}px, 0, 0)`,
                    'transform': `translate3d(${x}px, 0, 0)`
                })
            },
            enter(el, done) {
                let rf = el.offsetHeight // 触发浏览器重绘
                this.ballWrap.css({
                    '-webkit-transform': 'translate3d(0, 0, 0)',
                    'transform': 'translate3d(0, 0, 0)'
                })
                this.ball.css({
                    '-webkit-transform': `translate3d(0, 0, 0)`,
                    'transform': `translate3d(0, 0, 0)`
                })

               /* if (this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.show = false
                }, 400)*/
            },
            transitionend() { // 有bug，连续快速点击时，个别的会从右边水平的位置移入
                this.show = false
            },
            toggleList() {
                if (this.totalCount) {
                    this.expanded = !this.expanded
                }
            },
            empty() {
                this.selectFoods.forEach((item) => {
                    item.count = 0
                })
                this.expanded = false
            },
            pay() {
                if (this.totalPrice > this.minPrice) {
                    alert(`您需要支付${this.totalPrice}元`)
                }
            }
        },
        created() {
            eventHub.$on('cart-add', this.drop)
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
                        color: #80858a;
                        .fa-shopping-cart { 
                            font-size: 24px;
                            line-height: 44px;
                        }
                    }
                }
                .num { 
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: white;
                    background-color: rgb(240,20,20);
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
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
                    &.HIGHLIGHT { 
                        color: white;
                    }
                }
                .desc { 
                    display: inline-block;
                    line-height: 24px;
                    vertical-align: top;
                    margin: 12px 0 0 12px;
                    font-size: 10px;
                }
                &.HIGHLIGHT { 
                    .logo-wrapper { 
                        .logo { 
                            background-color: rgb(0,160,220);
                            color: white;
                        }
                    }
                    .price { 
                        color: white;
                    }
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
                    &.HIGHLIGHT { 
                        background-color: #00b43c;
                        color: white;
                    }
                }
            }
        }
        .ballWrap {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            .ball {
                width: 16px;
                height: 16px;
                background-color: rgb(0, 160, 220);
                border-radius: 50%;
                &.ball-enter-active {    // 定义过渡的状态（时间，延迟和曲线函数）
                  transition: all .4s linear;
                }
            }
            &.ballWrap-enter-active {    // 定义过渡的状态（时间，延迟和曲线函数）
              transition: all .4s cubic-bezier(.49,-0.29,.75,.41);
            }
        }
        .shopcart-list {
            position: absolute;
            bottom: 48px;
            left: 0;
            z-index: -1;
            width: 100%;
            .list-header {
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background-color: #f3f5f7;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                .title {
                    float: left;
                    font-size: 14px;
                    color: rgb(7,17,21);
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: rgb(0,160,220);
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                background-color: #fff;
                overflow: auto; // 这个作者用的better-scroll，我这里没用
                .food {
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    .name {
                        line-height: 24px;
                        font-size: 14px;
                        color: rgb(7,17,27);
                    }
                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
            &.fold-enter-active, &.fold-leave-active {
                transition: all 0.4s linear;
            }
            &.fold-enter, &.fold-leave-to {
                transform: translate3d(0, 100%, 0);
            }
        }
    }
</style>