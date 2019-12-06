<template>
    <div class="ld-login">
        <div class="logo">
            <img src="../assets/images/forwardx.png" alt="">
        </div>
        <h2>灵动科技仓储管理系统</h2>
        <div class="form">
            <input type="text" v-model="username" :class="{'checkShib': !formValidate.username}" @input="inputUserName($event)" placeholder="用户名">
            <input type="text" v-model="password" :class="{'checkShib': !formValidate.password}" @input="inputPassWord($event)" placeholder="密码">
            <div class="workspace">
                <van-dropdown-menu direction="up">
                    <van-dropdown-item v-model="value1" :options="option1" />
                </van-dropdown-menu>
            </div>
        </div>
        <van-button class="login" :disabled="isDisabled" type="info" @click="login">登录</van-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            formValidate: {
                username: true,
                password: true
            }, // 通过为true
            isDisabled: false,

            value1: 0,
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ]
        }
    },
    mounted() {
        
    },
    methods: {
        inputUserName(e) {
            if (!e.target.value) {
                this.formValidate.username = false
                return false
            }
            this.formValidate.username = true
        },
        inputPassWord(e) {
            if (!e.target.value) {
                this.formValidate.password = false
                return false
            }
            this.formValidate.password = true
        },
        login() {
            this.formValidate.username = this.username ? true : false
            this.formValidate.password = this.password ? true : false
            if (!this.formValidate.username || !this.formValidate.password) { return false }

            this.isDisabled = true
            let password = this.$md5.encryption(this.password, this.username)
            this.$store.dispatch('login', {userName: this.username, password: password}).then((res) => {
                if (!res) {
                    this.$toast.loading({
                        message: '加载中...',
                        forbidClick: true,
                        loadingType: 'spinner'
                    });
                    setTimeout(() => {
                        this.$loading.hide()
                        this.$router.push({path: "/funcMenu"})
                    }, 500)
                } else {
                   this.$toast(res)
                }
                this.isDisabled = false
            })

            

        }
    }
}
</script>

<style lang="scss">
.ld-login {
    $fontColor: #d8d8d8;
    padding: 1rem 0 0;
    text-align: center;
    .logo {
        img {
            width: 10rem;
        }
    }
    h2 {
        line-height: 2rem;
        font-size: 1.2rem;
    }
    .form {
        input, .workspace {
            display: block;
            margin: 0 auto .5rem;
            padding: 0 1rem;
            width: 15rem;
            line-height: 2rem;
            font-size: 1rem;
            color: #333;
            border: 1px solid $fontColor;
            border-radius: 3px;
            outline: none;
            &::placeholder {
                font-size: 1rem;
            }
        }
        .checkShib {
            border-color: red;
        }
        .workspace {
            width: 17.1rem;
            .van-dropdown-menu {
                height: 2rem;
                .van-dropdown-menu__item {
                    justify-content: flex-start;
                    .van-dropdown-menu__title {
                        padding-left: 0;
                        .van-ellipsis {
                            font-size: 1rem;
                        }
                        &::after {
                            right: -10.6rem;
                        }
                    }
                    .van-dropdown-menu__title--active {
                        color: #1989fa;
                        .van-ellipsis {
                            font-size: 1rem;
                            color: #1989fa;
                        }
                    }
                }
            }
            .van-dropdown-item {
                .van-dropdown-item__content {
                    .van-cell__title {
                        span {
                            font-size: .9rem;
                        }
                    }
                }

            }
        }
    }
    .login {
        width: 17rem; height: 3rem;
        line-height: 3rem;
        margin: 0 auto;
        font-size: 1.4rem;
        color: #fff;
        background: #3F50B5;
        border-radius: 3px;
    }
}
</style>