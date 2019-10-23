<template>
	<div>
		<el-card shadow="always" id="firstCard">
			<div class="title" style="position: relative;">
				<span>角色列表</span>
				<el-button @click='addRole' size="small" type="primary" plain style="position: absolute; right: 10px; top: -3px;"><i
					 class="el-icon-circle-plus-outline"></i>添加角色</el-button>
			</div>
			<el-table :data="tableData">
				<el-table-column prop="id" label="#" width="85">
				</el-table-column>
				<el-table-column prop="name" label="角色" width="170">
					<template slot-scope="scope">
						<el-tag :type=" scope.row.id == 1 ? 'danger' : '' ">{{scope.row.name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button :disabled="scope.row.id==1" size="mini" type="primary" @click='editHandle(scope.row.id,scope.row.name)'
						 plain><i class="el-icon-edit"></i></el-button>
						<el-button plain :disabled="scope.row.id==1" size="mini" type="danger" @click='deleteHandle(scope.row.id)' style="margin-left: 10px;"><i
							 class="el-icon-delete"></i></el-button>
						<el-button size="mini" type="primary" @click='setHandle(scope.row.id)' plain><i class="el-icon-setting"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<div style="float: left;">
			<el-card shadow="always" class="roleCard" v-for="item in roleData">
				<div class="roleTitle">
					<span><i class="el-icon-collection-tag"></i>{{item.name}}</span>
					<el-switch change='item.checked = !item.checked' style="float: right;" v-model="item.checked"></el-switch>
				</div>
				<div style="padding: 10px 0;" v-for="itemChildren in item.children">
					<span>{{itemChildren.name}}</span>
					<el-switch change='item.checked = !item.checked' style="float: right;" v-model="itemChildren.checked"></el-switch>
				</div>
			</el-card>
		</div>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑角色" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="名称" label-width="60px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeEditModal">取 消</el-button>
				<el-button type="primary" @click="edit">编 辑</el-button>
			</div>
		</el-dialog>
		<!-- 添加角色 -->
		<el-dialog title="添加角色" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="名称" label-width="60px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeInsertModal">取 消</el-button>
				<el-button type="primary" @click="add">添 加</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { AdminRole } from '@/api/index.js'

	export default {
		data() {
			return {
				tableData: [],
				roleData: [],
				editModalShow: false,
				editForm: {
					name: '',
				},
				insertModalShow: false,
				insertForm: {
					name: '',
				},
			}
		},
		methods: {
			// 添加角色
			addRole() {
				this.insertModalShow = true;
				this.insertForm.name = name;
			},
			async add() {
				let { status, msg } = await AdminRole.add({ ...this.insertForm });
				if (status) {
					this.$message({
						type: 'success',
						message: '添加成功'
					})
				}
				this.insertModalShow = false;
				this.insertForm.name = '';
				this.loadList();
			},
			closeInsertModal() {
				this.insertModalShow = false;
				this.insertForm.name = '';
			},
			// 编辑
			editHandle(id, name) {
				this.editModalShow = true;
				this.editForm.id = id;
				this.editForm.name = name;
			},
			async edit() {
				let { status, msg } = await AdminRole.update({ ...this.editForm });
				if (status) {
					this.$message({
						type: 'success',
						message: '修改成功'
					})
				}
				this.editModalShow = false;
				this.editForm.name = '';
				this.editForm.id = '';
				this.loadList();
			},
			closeEditModal() {
				this.editModalShow = false;
				this.editForm.name = '';
				this.editForm.id = '';
			},
			// 删除角色
			deleteHandle(id) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await AdminRole.remove({ id });
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

			},
			// 设置权限
			setHandle(id) {
				this.loadRole(id);
			},
			async loadList() {
				let { status, data } = await AdminRole.list();
				if (status) {
					this.tableData = data;
				}
			},
			async loadRole(id) {
				let { status, data } = await AdminRole.config({ id })
				if (status) {
					this.roleData = data;
					console.log(data);
				}
			}
		},
		created() {
			this.loadList();
		}
	}
</script>

<style scoped="scoped">
	#firstCard {
		width: calc(100vw - 945px);
		margin: 20px;
		float: left;
	}

	.roleCard {
		width: 600px;
		margin: 20px;
		font-size: 12px;
	}

	.title {
		padding-bottom: 20px;
		border-bottom: 1px solid lightgray;
	}

	.roleTitle {
		padding-bottom: 20px;
		margin-bottom: 5px;
		border-bottom: 1px solid lightgray;
		font-size: 14px;
		color: #409eff;
	}
</style>
