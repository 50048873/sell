<template>
    <transition name="toggleFromRight">
        <div class="food" v-if="isVisible" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image " alt="">
                    <span class="back" @click="close">
                        <i class="fa fa-angle-left"></i>
                    </span>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <new-old-price :new-price="food.price" :old-price="food.oldPrice"></new-old-price>
                    <div class="cartcontrol-wrapper">
                        <shopcart-control :food="food"></shopcart-control>
                    </div>
                    <transition name="fade"> 
                        <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
                    </transition>
                </div>
                <split-vertical v-if="food.info"></split-vertical>
                <div class="info" v-if="food.info">
                    <h3 class="title">商品信息</h3>
                    <p class="text">{{food.info}}</p>
                </div>
                <split-vertical></split-vertical>
                <div class="rating">
                    <h3 class="title">商品评价</h3>
                    <rating-select :data="getRatingSelect" @onSelect="onSelect" @onToggleContent="onToggleContent"></rating-select>
                    <rating-list :data="getRatings"></rating-list>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import NewOldPrice from 'components/baseComponents/new-old-price'
    import BScroll from 'better-scroll'
    import ShopcartControl from 'components/shopcart-control'
    import $ from 'jquery'
    import {eventHub} from 'assets/js/event.js'
    import {getPosition} from 'assets/js/mixin.js'
    import SplitVertical from 'components/baseComponents/split-vertical'
    import RatingSelect from 'components/baseComponents/rating-select'
    import RatingList from 'components/baseComponents/rating-list'
    import {getRatingsSelectTypes} from 'assets/js/mixin'
    import {POSITIVE, NEGATIVE, ALL} from 'assets/js/config'

    export default {
        name: 'VFood',
        props: {
            food: {
                type: Object
            }
        },
        components: {
            NewOldPrice,
            ShopcartControl,
            SplitVertical,
            RatingSelect,
            RatingList
        },
        mixins: [getRatingsSelectTypes],
        data() {
            return {
                isVisible: false,
                selectedIndex: 0,
                hasContented: false
            }
        },
        computed: {
            getRatingSelect() {
                let types = [
                    {
                        name: '全部',
                        color: '#ccecf7'
                    },
                    {
                        name: '推荐',
                        color: '#ccecf7'
                    },
                    {
                        name: '吐槽',
                        color: '#eaebed'
                    }
                ]

                return this.getRatingsSelectTypes(types, this.food.ratings)
            },
            getRatings() {
                let res = this.food.ratings

                if (this.selectedIndex === 0 && !this.hasContented) {
                    return res
                }

                if (this.selectedIndex !== 0) {
                    res = res.filter((item) => {
                        switch (this.selectedIndex) {
                            case 1: 
                                return item.rateType === POSITIVE
                            case 2: 
                                return item.rateType === NEGATIVE
                        }
                    })
                }
                
                if (this.hasContented) {
                    res = res.filter((item) => {
                        return !!item.text
                    })
                }

                return res
            }
        },
        methods: {
            show() {
                this.isVisible = true
                this.$nextTick(() => {
                    this.betterScroll = new BScroll(this.$refs.food, {
                        click: true,
                        bounceTime: 200 //默认值为700ms。在默认值700的情况下，如果滑动过程中快速点击，会出现点击无效的情况，只有当动画结束时，点击才有效
                    })
                })
            },
            close() {
                this.isVisible = false
            },
            addFirst(event) {
                this.$set(this.food, 'count', 1)

                eventHub.$emit('cart-add', event.target)
            },
            onSelect(index) {
                this.selectedIndex = index
            },
            onToggleContent(hasContented) {
                this.hasContented = hasContented
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .food {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 48px;
        left: 0;
        z-index: 5;
        background-color: white;
        //overflow-y: auto;
        &.toggleFromRight-enter-active, &.toggleFromRight-leave-active {
            transition: all 0.4s ease-out;
        }
        &.toggleFromRight-enter, &.toggleFromRight-leave-to {
            transform: translate3d(100%, 0, 0);
        }
        .image-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                top: 0;
                left: 0;
                padding: 10px;
                .fa {
                    font-size: 20px;
                    color: white;
                    text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
                }
            }
        }
        .content {
            position: relative;
            padding: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(7,17,27);
            }
            .detail {
                margin-bottom: 12px;
                line-height: 10px;
                font-size: 0;
                .sell-count, .rating {
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .sell-count {
                    margin-right: 12px;
                }
            }
            .cartcontrol-wrapper {
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
            .buy {
                position: absolute;
                right: 18px;
                bottom: 18px;
                z-index: 2;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                box-sizing: border-box;
                font-size: 10px;
                border-radius: 12px;
                color: white;
                background-color: rgb(0,160,220);
                &.fade-enter-active, &.fade-leave-active {
                    transition: opacity 0.2s linear;
                }
                &.fade-enter, &.fade-leave-to {
                    opacity: 0;
                }
            }
        }
        .info {
            padding: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: rgb(7,17,27);
            }
            .text {
                font-size: 12px;
                color: rgb(77,85,93);
                //padding: 0 8px;
                line-height: 24px;
            }
        }
        .rating {
            padding: 18px;
            .title {
                margin-bottom: 18px;
            }
        }
    }
</style>