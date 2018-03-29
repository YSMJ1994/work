<template>
    <section class="list-container">
        <div class="header">
            <el-button type="text" size="small" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        </div>
        <div class="main" v-loading="loading" @mousewheel="mousewheel" ref="main">
            <StateCell :data="item" v-for="(item, idx) in list" :key="item.id || idx"/>
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
import { getStateList } from '@/api/state';
import StateCell from './stateCell';

export default {
    props: {
        postMethod: Function
    },
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
    components: {
        StateCell
    },
    mounted() {
        this.refresh()
    },
    methods: {
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
.list-container {
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
    .loading-msg {
        font-size: 0.75rem;
        text-align: center;
        padding: 0.5rem 0;
    }
}
</style>