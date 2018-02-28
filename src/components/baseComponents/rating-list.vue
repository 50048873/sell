<template>
    <ul class="ratingList">
        <li v-for="item in data" class="line-bottom">
            <div>
                <time class="rateTime">{{item.rateTime | dateFormat('yyyy-mm-dd hh:MM')}}</time>
                <span class="avatar" :style="{backgroundImage: 'url(' + item.avatar + ')'}"></span>
                <span class="username">{{item.username}}</span>
            </div>
            <div>
                <i class="fa" :class="getIcon(item.rateType)"></i>
                <span class="text">{{item.text}}</span>
            </div>
        </li>
        <li class="noRating" v-if="data.length === 0">暂无评价</li>
    </ul>
</template>

<script>
    import {dateFormat} from 'assets/js/mixin.js'
    const up = 'fa-thumbs-up',
          down = 'fa-thumbs-down'
    export default {
        name: 'RatingList',
        props: { 
            data: {
                type: Array,
                required: false
            }
        },
        mixins: [dateFormat],
        methods: { 
            getIcon(rateType) {
                switch (rateType) {
                    case 0:
                        return up
                    case 1: 
                        return down
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ratingList { 
        li {
            padding: 18px;
            div:first-child {
                line-height: 1;
                .rateTime {
                    color: #94999f;
                    font-size: 10px;
                    vertical-align: top;
                }
                .avatar {
                    float: right;
                    width: 12px;
                    height: 12px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    border-radius: 50%;
                }
                .username {
                    float: right;
                    color: #94999f;
                    font-size: 10px;
                    margin-right: 6px;
                    margin-top: 2px;
                }
            }
            div:last-child {
                margin-top: 10px;
                .fa-thumbs-up {
                    color: #06a6e4;
                }
                .fa-thumbs-down {
                    color: #b7babf;
                }
                .text {
                    color: black;
                    font-size: 12px;
                }
            }
        }
        .noRating {
            padding: 16px 0;
            font-size: 12px;
            color: rgb(7,17,27);
        }
    }
</style>