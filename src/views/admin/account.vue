<template>
	<div>
		<el-card shadow="always">
			<div class="title">
				账户信息
			</div>
			<el-form :rules="rules" :model="form" ref="form" label-width="200px" style="width: 900px;padding: 30px;">
				<el-form-item label="账户" prop="username">
					<el-input disabled v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="form.fullname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="权限" prop="role">
					<el-select v-model="form.role" placeholder="暂无数据">
						<el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="头像" prop="avatar">
					<el-upload :headers="headers" action="/api/upload/avatar" :show-file-list="false" :on-success="uploadSuccess"
					 :on-error='uploadFalse'>
						<img style="width: 150px;border-radius: 5px;" v-if="form.avatar" :src="form.avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<p style="margin: 0;color: red;">点击头像进行更换！</p>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">修 改</el-button>
				</el-form-item>
			</el-form>

		</el-card>
	</div>
</template>

<script>
	import { AdminUser, AdminRole, AdminImage } from '@/api/index.js'
	import { createNamespacedHelpers } from 'vuex'
	const { mapState, mapActions } = createNamespacedHelpers('User')

	export default {
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				form: {},
				role: [],
				rules: {
					username: [
						{ required: true, message: '请输入账户', trigger: 'blur' },
					],
					fullname: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
					],
					sex: [
						{ required: true, message: '请选择性别', trigger: 'blur' },
					],
					tel: [
						{ required: true, message: '请输入手机', trigger: 'blur' },
					],
					role: [
						{ required: true, message: '请选择角色', trigger: 'blur' },
					],
					avatar: [
						{ required: true, message: '请插入头像', trigger: 'blur' },
					],
				}
			}
		},
		methods: {
			// 在User模块中查找
			...mapActions(['loadInfo']),

			// 头像处理
			async uploadSuccess(response) {
				// 删除旧头像
				let src = '.' + this.form.avatar;
				let { status, msg } = await AdminImage.remove({ src });
				// 更换新头像
				this.form.avatar = response.src;
				this.$message({
					type: 'success',
					message: '更换头像成功!',
				})
			},
			uploadFalse(err) {
				if (err.status) {
					this.$message({
						type: 'warning',
						message: '头像上传失败！图片尺寸120-300，请重新处理!!',
						duration: 3000,
					})
				}

			},
			async loadRole() {
				let { status, data } = await AdminRole.list();
				if (status) {
					this.role = data;
				}
			},
			onSubmit() {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await AdminUser.update({ ...this.form })
						if (status) {
							this.$message({
								type: 'success',
								message: '编辑成功!',
							})
							// 更新数据
							this.loadInfo();
						}
					}

				})
			}
		},
		created() {
			this.loadRole();
			this.loadInfo().then(user => {
				this.form = { ...user };
			});

		}
	}
</script>

<style scoped="scoped">
	.el-card {
		width: calc(100vw - 265px);
		margin: 20px;
	}

	.title {
		padding-bottom: 20px;
		border-bottom: 1px solid lightgray;
	}
</style>
