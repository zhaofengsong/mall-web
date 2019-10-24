<template>
	<div>
		<el-card shadow="always">
			<div class="title">
				账户信息
			</div>
			<el-form :rules="rules" ref="form" label-width="200px" style="width: 900px;padding: 30px;">
				<el-form-item label="账户" prop="username">
					<el-input :disabled="form.id == 1" v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="form.fullname"></el-input>
				</el-form-item>
				<el-form-item label="性别"  prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机"  prop="tel">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="权限"  prop="role">
					<el-select v-model="form.role" placeholder="暂无数据">
						<el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="头像" prop="avatar">
					<el-upload :limit="1" :file-list="fileList" :headers="headers" action="/api/upload/avatar" list-type="picture-card"
					 :on-success="uploadSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
					<p style="margin: 0; font-size: 11px;color:red;">请注意！只能上传一张头像</p>
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

	export default {
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				form: [],
				fileList: [],
				role: [],
				dialogImageUrl: '',
				dialogVisible: false,
				rules:{
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
			uploadSuccess(response) {
				this.form.avatar = response.src;
				this.fileList = '';
				this.fileList.push(response.src);
			},
			async handleRemove(file, fileList) {
				let src = '.' + file.url;
				let { status, msg } = await AdminImage.remove({ src });
				this.fileList = '';
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			async loadList() {
				this.loadRole();
				let id = 1;
				let { status, data } = await AdminUser.info({ id });
				if (status) {
					this.form = data;
					// 头像
					let avatar = { url: data.avatar };
					this.fileList.push(avatar);
				}
			},
			async loadRole() {
				let { status, data } = await AdminRole.list();
				if (status) {
					this.role = data;
				}
			},
			async onSubmit() {
				let { status, msg } = await AdminUser.update({ ...this.form })
				if (status) {
					this.$message({
						type: 'success',
						message: '编辑成功!',
					})
					this.fileList = '';
					this.loadList();
				}
			}
		},
		created() {
			this.loadList();
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
