<template>
    <div class="download">

        <div class="center">

            <!-- LOGO -->
            <div class="logo">
                <van-image width="100" height="100" :src="require('../assets/logo.png')" />
            </div>

            <!-- 描述文字 -->
            <div>
                <div class="text">
                    全球最刺激的游戏。
                </div>
            </div>

            <!-- 下载按钮 -->
            <div class="download">
                <van-row>
                    <van-col span="8" offset="4">
                        <van-button type="default" @click="safari">苹果本地下载</van-button>
                    </van-col>
                    <van-col span="8">
                        <a href="http://imnms.com/imnms.apk">
                            <van-button type="default">安卓本地下载</van-button>
                        </a>
                    </van-col>
                </van-row>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            safari() {
                if(window.navigator.userAgent.indexOf("Safari") >= 0) {
                    window.location.href = 'itms-services://?action=download-manifest&url=http://imnms.com/imnms.plist'
                } else {
                    this.$notify('请使用Safari浏览器下载安装')
                }
            },
        },
    }
</script>


<style lang="scss">

.download {



    padding-bottom: 100%;
    background-color: #211515;


    .center {
        text-align: center;
        padding-top: 10rem;
    }


    .download {
        .van-button {
            color: white;
            border-color:red;
            border-width:2px;
            margin-top: 10px;
            border-style:solid;
            border-radius: 10px;
            background-color: #1d2343;
        }
    }

}

</style>