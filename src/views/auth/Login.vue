<template>
	<div>

		<van-nav-bar :fixed="true" title="登录" left-text="" right-text="" @click-left="onClickLeft" @click-right="onClickRight" />

		<div class="auth">

			<div class="logo">
				<van-image :src="require('../../assets/logo.png')" />
			</div>

			<van-cell-group>
				<van-field v-model="params.phone" clearable placeholder="请输入手机号" />
				<van-field v-model="params.password" clearable placeholder="请输入密码" type='password' />
			</van-cell-group>

			<div class="center auth_button">
				<van-button type="info" size="large" :round="true" :hairline="true" :square="true" @click="login">立即登录</van-button>
			</div>

			<div class="center margin-top-10">
				<span style="color: black;">还没有账号？</span>
				<router-link :to="{ name: 'register' }" class="info">点击注册</router-link>
			</div>

			<div class="center margin-top-10">
				<router-link :to="{ name: 'password' }" style="color: #656b89;">忘记密码</router-link>
			</div>

		</div>
	</div>

</template>


<script>
	export default {
		data() {
			return {
				params: {
					phone: '',
					password: '',
				},
			}
		},
		methods: {
			async onClickLeft() {
				this.$router.go(-1)
			},
			async onClickRight() {
				// this.$toast('按钮');
				this.$router.push({
					name: 'my.payment.add'
				})
			},
			async login() {
				this.$axios.post('/login', this.params).then(response => {
					this.$store.commit('login', response.data.access_token)
					this.$router.push({
						name: 'home'
					})
				})
			},
		},
	}
</script>

<style lang="scss">

.auth {
	margin-top: 8rem;
}

.logo {
	text-align: center;
}

.center {
	text-align: center;
}

.margin-top-10 {
	margin-top: 10px;
}

.auth_button {
	margin: 10px 20px 0 20px;
}

.info {
	color: #1989fa;
}

</style>