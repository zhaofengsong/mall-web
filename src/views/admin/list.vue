<template>
	<div>
		<el-card shadow="always">
			<div class="title">
				用户列表
			</div>
			<el-table :data="tableData">
				<el-table-column sortable prop="id" label="#" width="60">
				</el-table-column>
				<el-table-column prop="avatar" label="头像" width="80">
					<template slot-scope="scope">
						<el-image style="width: 50px;" :src="scope.row.avatar"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="账号" width="140">
				</el-table-column>
				<el-table-column prop="fullname" label="姓名" width="100">
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="70">
				</el-table-column>
				<el-table-column prop="tel" label="手机" width="130">
				</el-table-column>
				<el-table-column sortable prop="role_name" label="角色" width="120">
					<template slot-scope="scope">
						<el-tag :type=" scope.row.id == 1 ? 'danger' : '' ">{{scope.row.role_name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="login_time" label="上次登录" width="180">
				</el-table-column>
				<el-table-column sortable prop="login_count" label="登录次数" width="100">
				</el-table-column>
				<el-table-column prop="operate" label="操作" width="170">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click='editHandle(scope.row.id)' plain><i class="el-icon-edit"></i></el-button>
						<el-button :disabled="scope.row.id==1" size="mini" type="primary" @click='deleteHandle(scope.row.id)' style="margin-left: 10px;"><i
							 class="el-icon-delete"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 编辑弹窗 -->
			<el-dialog title="编辑分类" :visible.sync="editModalShow" :show-close = 'false'>
				<el-form :model="editForm" :rules="rules">
					<el-form-item label="账户" prop="fullname" label-width="60px">
						<el-input v-model="editForm.fullname" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex" label-width="60px">
						<el-radio-group v-model="editForm.sex">
							<el-radio label="男"></el-radio>
							<el-radio label="女"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="手机" prop="tel" label-width="60px">
						<el-input v-model="editForm.tel" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="角色" prop="role" label-width="60px">
						<el-select v-model="editForm.role" placeholder="暂无数据">
							<el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="头像" prop="avatar" label-width="60px">
						<el-upload :limit="1" :on-success="editImgSuccess" :file-list="editImgFileList" :headers="headers" action="/api/upload/avatar"
						 list-type="picture-card" :on-remove="editImgRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<p style="margin-left: 50px; font-size: 11px;color:red;">请注意！只能上传一张图片，体积<2M，尺寸（120~300）必须是正方形</p>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="closeEditModal">取 消</el-button>
					<el-button type="primary" @click="edit">编 辑</el-button>
				</div>
			</el-dialog>
		</el-card>
	</div>

</template>

<script>
	import { AdminUser, AdminRole, AdminImage } from '@/api/index.js'

	export default {
		data() {
			return {
				tableData: [],
				editForm: {},
				editImgFileList: [],
				role: [],
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				dialogImageUrl: '',
				dialogVisible: false,
				editModalShow: false,
				rules: {
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
			async loadRole() {
				let { status, data } = await AdminRole.list();
				if (status) {
					this.role = data;
				}
			},
			async editImgRemove() {
				if (this.editForm.avatar = '/images/avatar/default.jpg') {
					this.editImgFileList = [];
					this.$message({
						type: 'success',
						message: '取消默认图片'
					})
				} else {
					this.editForm.avatar = '.' + this.editForm.avatar;
					let { status, msg } = await AdminImage.remove({ src: this.editForm.avatar });
					if (status) {
						this.$message({
							type: 'success',
							message: '删除成功'
						})
					};
					this.editImgFileList = [];
				}
			},
			editImgSuccess(response, file, fileList) {
				this.editForm.avatar = response.src;
				let avatar = { url: response.src };
				this.editImgFileList.push(avatar);
			},
			async edit() {
				let { status, msg } = await AdminUser.update({ ...this.editForm });
				if (status) {
					this.$message({
						type: 'success',
						message: '编辑成功'
					})
				}
				this.editModalShow = false;
				this.editForm = {};
				this.editImgFileList = [];
				this.loadList();
			},
			async loadList() {
				this.loadRole();
				let { status, data } = await AdminUser.list();
				if (status) {
					this.tableData = data;
				}
			},
			async editHandle(id) {
				this.editModalShow = true
				let { status, data } = await AdminUser.info({ id });
				if (status) {
					this.editForm = data;
					// 头像
					let avatar = { url: data.avatar };
					this.editImgFileList.push(avatar);
				}
			},
			closeEditModal() {
				this.editForm = {};
				this.editImgFileList = [];
				this.editModalShow = false;
			},
			deleteHandle(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let res = AdminUser.remove({ id: id });
					this.$message({
						type: 'success',
						message: '删除成功'
					})
					this.loadList();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				this.loadList();
			}
		},
		created() {
			this.loadList();

		},
	}
</script>

<style scoped="scoped">
	.el-card {
		width: calc(100vw - 245px);
		margin: 20px;
	}

	.title {
		padding-bottom: 20px;
		border-bottom: 1px solid lightgray;
	}

	.el-table {
		font-size: 12px;
	}
</style>
