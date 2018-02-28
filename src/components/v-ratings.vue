<template>
  <div class="ratings" ref="ratings">
  	<div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star-score :score="seller.serviceScore" fontSize="12" margin="6"></star-score> 
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star-score :score="seller.foodScore" fontSize="12" margin="6"></star-score> 
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split-vertical></split-vertical>
      <div class="rating">
          <rating-select :data="getRatingSelect" @onSelect="onSelect" @onToggleContent="onToggleContent"></rating-select>
          <rating-list :data="getRatings"></rating-list>
      </div>
    </div>
  </div>
</template>

<script>
import StarScore from 'components/baseComponents/star-score'
import SplitVertical from 'components/baseComponents/split-vertical'
import RatingSelect from 'components/baseComponents/rating-select'
import RatingList from 'components/baseComponents/rating-list'
import {ERR_OK} from 'api/config'
import {POSITIVE, NEGATIVE, ALL} from 'assets/js/config'
import {getRatingsSelectTypes} from 'assets/js/mixin'
import BScroll from 'better-scroll'

export default {
  name: 'ratings',
  components: { 
    StarScore,
    SplitVertical,
    RatingSelect,
    RatingList
  },
  props: {
    seller: {
      type: Object
    }
  },
  mixins: [getRatingsSelectTypes],
  data() {
      return {
          ratings: [],
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
                  name: '满意',
                  color: '#ccecf7'
              },
              {
                  name: '不满意',
                  color: '#eaebed'
              }
          ]

          return this.getRatingsSelectTypes(types, this.ratings)
      },
      getRatings() {
          let res = this.ratings

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
      _getRating() {
        this.$http.get('/api/ratings').then((res) => { 
          res = res.body
          if (res.errno === ERR_OK) { 
            this.ratings = res.data
            this.$nextTick(() => {
               this.betterScroll = new BScroll(this.$refs.ratings, {
                    click: true,
                    bounceTime: 200
                })
            })
          }
        })
      },
      onSelect(index) {
          this.selectedIndex = index
      },
      onToggleContent(hasContented) {
          this.hasContented = hasContented
      }
  },
  created() {
    this._getRating()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .ratings {
    position: absolute;
    top: 174px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        border-right: 1px solid #e6e6e6;
        text-align: center;
        padding: 6px 0;
        .score {
          font-size: 24px;
          color: rgb(255,153,0);
          line-height: 28px;
          margin-bottom: 6px;
        }
        .title {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 12px;
          margin-bottom: 8px;
        }
        .rank {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
      }
      @media screen and (max-width: 320px) {
        .overview-left {
          flex: 0 0 127px;
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7,17,27);
          }
          .starScore {
            margin: 0 12px;
            position: relative;
            top: 1px;
          }
          .score {
            font-size: 12px;
            line-height: 18px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7,17,27);
          }
          .delivery {
            font-size: 12px;
            color: rgb(147, 153, 159);
            margin-left: 12px;
          }
        }
      }
      @media screen and (max-width: 320px) {
        .overview-right {
          padding-left: 10px;
          .score-wrapper {
            .starScore {
              margin: 0 6px;
            }
          }
        }
      }
    }
    .rating {
      padding: 18px;
    }
  }
</style>