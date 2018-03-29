<template>
    <div class="state-row">
        <div class="photo-box">
            <img class="photo" :src="data.photo" :alt="data.name" />
        </div>
        <div class="msg-box">
            <div class="msg-text">{{data.name}}</div>
            <div class="msg-time">{{formatTime(data.time)}}</div>
        </div>
        <div class="time-box">
            <div class="create-time">{{parseTime(data.time)}}</div>
        </div>
    </div>
</template>
<script>
import { parseTime } from "@/utils"

export default {
    props: {
        data: Object
    },
    methods: {
        parseTime(time) {
            return parseTime(time)
        },
        formatTime(time) {
            let cTime = new Date().getTime()
            time = parseInt(time)
            let gap = Math.abs(cTime - time)
            let suffix = cTime - time > 0 ? "前" : "后",
                prefix = ""
            if (gap < 60000) {
                prefix = parseInt(gap / 1000) + "秒"
                return prefix + suffix
            }
            if (gap >= 60000 && gap < 3600000) {
                prefix = parseInt(gap / 60000) + "分钟"
                return prefix + suffix
            }
            if (gap >= 3600000 && gap < 86400000) {
                prefix = parseInt(gap / 3600000) + "小时"
                return prefix + suffix
            }
            if (gap >= 86400000 && gap < 31536000000) {
                prefix = parseInt(gap / 86400000) + "天"
                return prefix + suffix
            }
            if (gap >= 31536000000) {
                prefix = parseInt(gap / 31536000000) + "年"
                return prefix + suffix
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$itemHeight: 4rem;
$photoHeight: $itemHeight / 1.8;
.state-row {
    font-size: 0;
    display: flex;
    align-items: center;
    height: $itemHeight;
    border-bottom: 1px solid #f2f2f2;

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
}
</style>