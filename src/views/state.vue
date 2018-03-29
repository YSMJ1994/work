<template>
    <section class="state-container">
        <div class="header">
            <el-button type="text" size="small" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        </div>
        <div class="main" v-loading="loading" @mousewheel="mousewheel" ref="main">
            <div class="main-row" v-for="(item, idx) in list" :key="item.id || idx">
                <div class="photo-box">
                    <img class="photo" :src="item.photo" :alt="item.name" />
                </div>
                <div class="msg-box">
                    <div class="msg-text">{{item.name}}</div>
                    <div class="msg-time">{{formatTime(item.time)}}</div>
                </div>
                <div class="time-box">
                    <div class="create-time">{{parseTime(item.time)}}</div>
                </div>
            </div>
            <div class="loading-msg">
                <span v-if="loadMoreLoading">
                    <span>
                        <span class="el-icon-loading"></span>
                        <span>正在加载中...</span>
                    </span>
                </span>
                <span v-else>
                    <el-button v-if="hasMore" type="text" size="small" @click="loadMore">点击加载更多</el-button>
                    <span v-else>没有了...</span>
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import { parseTime } from "../utils"
import { getStateList } from '../api/state';

export default {
    data() {
        return {
            list: [],
            loading: true,
            loadMoreLoading: false,
            page: 1,
            pageSize: 7,
            total: 0,
            hasMore: false
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        parseTime(time) {
            return parseTime(time)
        },
        formatTime(time) {
            let cTime = new Date().getTime()
            time = parseInt(time)
            let gap = Math.abs(cTime - time)
            let suffix = cTime - time > 0 ? '前' : '后',
                prefix = ''
            if(gap < 60000) {
                prefix = parseInt(gap / 1000) + '秒'
                return prefix + suffix
            }
            if(gap >= 60000 && gap < 3600000) {
                prefix = parseInt(gap / 60000) + '分钟'
                return prefix + suffix
            }
            if(gap >= 3600000 && gap < 86400000) {
                prefix = parseInt(gap / 3600000) + '小时'
                return prefix + suffix
            }
            if(gap >= 86400000 && gap < 31536000000) {
                prefix = parseInt(gap / 86400000) + '天'
                return prefix + suffix
            }
            if(gap >= 31536000000) {
                prefix = parseInt(gap / 31536000000) + '年'
                return prefix + suffix
            }
        },
        loadData() {
            let para = {
                page: this.page,
                pageSize: this.pageSize
            }
            getStateList(para).then(res => {
                console.log(res)
                this.loading = false
                this.loadMoreLoading = false
                this.total = res.total
                this.list = this.list.concat(res.list)
                this.hasMore = this.total > this.list.length
            }).catch(() => {
                this.loading = false
                this.loadMoreLoading = false
                this.$message({
                    type: 'warning',
                    message: '获取部门动态异常'
                })
            })
        },
        loadMore() {
            this.loadMoreLoading = true
            this.page++
            this.loadData()
        },
        refresh() {
            this.page = 1
            this.loading = true
            this.list = []
            this.loadData()
        },
        mousewheel() {
            if(!this.hasMore || this.loading || this.loadMoreLoading) return
            let targetDom = this.$refs.main
            // console.dir(targetDom)
            let bottomScroll = targetDom.offsetHeight + targetDom.scrollTop
            if(bottomScroll > targetDom.scrollHeight * 0.7 && bottomScroll < targetDom.scrollHeight) {
                this.loadMore()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.state-container {
    $itemHeight: 4rem;
    $photoHeight: $itemHeight / 1.8;

    width: 600px;
    height: 400px;
    margin-left: 10%;
    margin-top: 10%;
    box-shadow: 0 0 1px 0 rgba($color: #000000, $alpha: 0.2);

    .header {
        width: 100%;
        height: 2rem;
        border-bottom: 1px solid #ccc;
        text-align: right;
    }
    .main {
        height: calc(100% - 2rem);
        padding: 0 10px;
        overflow: auto;
    }
    .main-row {
        font-size: 0;
        display: flex;
        align-items: center;
        height: $itemHeight;
        border-bottom: 1px solid #f2f2f2;
    }
    .photo-box {
        width: $itemHeight;
        height: $photoHeight;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .photo {
        width: $photoHeight;
        height: $photoHeight;
    }
    .msg-box {
        flex: auto;
        height: $itemHeight / 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .msg-text {
        color: #1a1a1a;
        font-size: 0.825rem;
    }
    .msg-time {
        color: #ccc;
        font-size: 0.75rem;
    }
    .time-box {
        height: $itemHeight;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 0 0.5rem;
    }
    .create-time {
        color: #ccc;
        margin-bottom: 5px;
        font-size: 0.75rem;
    }
    .loading-msg {
        font-size: 0.75rem;
        text-align: center;
        padding: 0.5rem 0;
    }
}
</style>