<template>
	<div class="header">

		<div class="nav">
			<van-nav-bar :fixed="true" title="找回密码" left-arrow left-text=" " right-text="" @click-left="onClickLeft" @click-right="onClickRight" />
		</div>

		<div class="text">

			<van-cell-group>

				<van-field v-model="phone" clearable placeholder="请输入手机号码" />
				<van-field v-model="password" clearable placeholder="新密码" type='password'/>
				<van-field v-model="password_confirm" clearable placeholder="请确认新密码" type='password'/>

				<van-field v-model="code" center clearable placeholder="请输入短信验证码">
					<van-button v-show="show" @click="getCode()" slot="button" size="small" type="primary">发送验证码</van-button>
					<van-button v-show="!show" :disabled="!show" slot="button" size="small" type="primary">{{ count }}秒后重试</van-button>
				</van-field>

			</van-cell-group>

			<div class="goin">
				<van-button type="primary" :hairline="true" :square="true">登入</van-button>
			</div>
			<div class="text-center register_and_password">
				已经有账号？
				<router-link :to="{ name: 'login' }" style="color: #07c160;">登录</router-link>
			</div>
		</div>
	</div>


</div>
</template>


<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				password_confirm: '',
				code: '',

				show: true,
				count: '',
				timer: null,
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				// this.$toast('按钮');
				this.$router.push({
					name: 'my.payment.add'
				})
			},
			getCode(){
				if (!this.timer) {
					this.count = 60;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= 60) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
		},
	}
</script>

<style lang="scss">
</style>