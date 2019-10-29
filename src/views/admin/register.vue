<template>
	<div class="bg">
		<div class="from">
			<p style="font-size: 18px;padding-bottom: 10px; border-bottom: 1px solid lightgray;">注册</p>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="fullname">
					<el-input type="text" v-model="ruleForm.fullname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号" prop="tel">
					<el-input type="text" v-model="ruleForm.tel"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
					<el-link @click="loginHandle" style="float: right;">已有账号登录</el-link>
				</el-form-item>
			</el-form>

		</div>
	</div>
</template>

<script>
	import { AdminUser } from '@/api/index.js'

	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',
					fullname: '',
					sex: '',
					tel: '',

				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, message: '用户名至少3位', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 18, message: '密码为6-18位', trigger: 'blur' },
					],
					fullname: [
						{ required: true, message: '请输入昵称', trigger: 'blur' },
					],
					sex: [
						{ required: true, message: '请选择性别', trigger: 'blur' }
					],
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
					],

				}
			};
		},
		methods: {
			loginHandle() {
				this.$router.push('/');
			},
			async submitForm(form) {
				let data = { ...this.ruleForm };
				this.$refs.ruleForm.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await AdminUser.register(data);
						if (status) {
							this.$message({
								showClose: true,
								message: '注册成功!',
								type: 'success',
								duration: 700,
								onClose: () => {
									// replace跳转路由
									this.$router.replace('/');
								}
							});
						} else {
							this.$message({
								showClose: true,
								message: '注册失败，请重新输入!',
								type: 'warning',
							});
						}
					}
				});


			}
		}
	}
</script>

<style scoped="scoped">
	.bg {
		height: 100vh;
		width: 100vw;
		position: relative;
		background: url(../../assets/login-bg.jpg);
		background-size: cover;
	}

	.from {
		position: absolute;
		width: 380px;
		top: 100px;
		right: 60px;
		background: white;
		border-radius: 8px;
		padding: 20px;
	}
</style>
