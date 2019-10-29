<template>
	<div>
		<el-card shadow="always">
			<div class="title" style="position: relative;">
				菜单权限
			</div>
			<el-tree node-key="id" :default-expanded-keys="[1]" :props="defaultProps" lazy :load="loadNode" ref="tree">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button :disabled="node.level == 1" type="text" size="mini" @click.stop="() => openIconModal(node,data)" :icon="data.icon">
							图标
						</el-button>
						<el-button :disabled="node.level == 1" type="text" size="mini" @click.stop="() => openEditModal(node,data)" icon="el-icon-edit">
							编辑
						</el-button>
						<el-button type="text" size="mini" @click.stop="() => openInsertModal(node,data)" icon="el-icon-plus">
							添加
						</el-button>
						<el-button :disabled="node.level == 1" type="text" size="mini" @click.stop="() => remove(node, data)" icon="el-icon-delete">
							删除
						</el-button>
						<span style="font-size: 12px;margin-left: 10px;">显示序号：{{data.order}}</span>
					</span>
				</span>
			</el-tree>
			<!-- 编辑弹窗 -->
			<el-dialog title="编辑分类" :visible.sync="editModalShow">
				<el-form :model="editForm" :rules="rules">
					<el-form-item label="菜单名称" prop="name" label-width="100px">
						<el-input v-model="editForm.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="链接地址" prop="path" label-width="100px">
						<el-input v-model="editForm.path" autocomplete="off" placeholder="指定此菜单的链接地址,选填"></el-input>
					</el-form-item>
					<el-form-item label="显示顺序" prop="order" label-width="100px">
						<el-input v-model="editForm.order" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="closeEditModal">取 消</el-button>
					<el-button type="primary" @click="edit">编 辑</el-button>
				</div>
			</el-dialog>
			<!-- 插入弹窗 -->
			<el-dialog title="插入分类" :visible.sync="insertModalShow">
				<el-form :model="insertForm" :rules="rules">
					<el-form-item label="菜单名称" prop="name" label-width="100px">
						<el-input v-model="insertForm.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="链接地址" prop="path" label-width="100px">
						<el-input v-model="insertForm.path" autocomplete="off" placeholder="指定此菜单的链接地址,选填"></el-input>
					</el-form-item>
					<el-form-item label="显示顺序" prop="order" label-width="100px">
						<el-input v-model="insertForm.order" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="closeInsertModal">取 消</el-button>
					<el-button type="primary" @click="append">编 辑</el-button>
				</div>
			</el-dialog>
			<!-- 图标弹窗 -->
			<el-dialog title="选择图标" :visible.sync="iconModalShow" width='80%' style="padding: 10px;">
				<ul class="icon-list">
					<li v-for="item in icons" :class="{isChecked: item.isChecked}" @click="checkedIcon(item)">
						<i :class="item.name"></i>
						<p style="">{{item.name}}</p>
					</li>
					<div class="clear"></div>
				</ul>
				<div class="block" style="float: right;">
					<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, total" :total="total"
					 :page-size="30">
					</el-pagination>
				</div>
				<div slot="footer" class="dialog-footer" style="margin-right: 20px;">
					<el-button @click="closeIconModal">取 消</el-button>
					<el-button type="primary" @click="setIcon">编 辑</el-button>
				</div>
				<div class="clear"></div>
			</el-dialog>

		</el-card>
	</div>
</template>

<script>
	import { AdminMenu } from '@/api/index.js'

	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				editForm: {},
				editModalShow: false,
				insertForm: {},
				insertModalShow: false,
				node: '',
				iconModalShow: false,
				icons: [],
				total: 0,
				rules: {

				},
			}
		},
		methods: {
			// 编辑
			openEditModal(node, data) {
				this.editForm = { ...data, id: data.id };
				this.editModalShow = true;
			},
			closeEditModal() {
				this.editForm = {};
				this.editModalShow = false;
			},
			async edit() {
				let { status, msg } = await AdminMenu.update({ ...this.editForm })
				if (status) {
					this.$message({
						type: 'success',
						message: '编辑成功!',
					})
				}
				this.editForm = {};
				this.editModalShow = false;
			},
			// 图标
			checkedIcon(item) {
				if (item.isChecked == true) {
					item.isChecked = !item.isChecked;
				} else {
					for (let i = 0; i < this.icons.length; i++) {
						this.icons[i].isChecked = false;
					}
					item.isChecked = !item.isChecked;
				}
			},
			async setIcon() {
				let id = this.node.data.id;
				let icon;
				for (let i = 0; i < this.icons.length; i++) {
					if (this.icons[i].isChecked == true) {
						icon = this.icons[i].id.toString();
					}
				}
				let { status, msg } = await AdminMenu.set({ id, icon })
				if (status) {
					this.$message({
						type: 'success',
						message: '设置成功!'
					});
				}
				this.iconModalShow = false;
				this.node = '';
			},
			async handleCurrentChange(val) {
				let { status, msg, icons, total } = await AdminMenu.icon({ pageSize: 30, pageIndex: val });
				if (status) {
					let newIcons = icons.map(item => {
						return {
							id: item.id,
							name: 'el-icon-' + item.name,
							isChecked: false,
						}
					});
					this.icons = newIcons;
				}
			},
			async openIconModal(node, data) {
				this.node = node;
				this.iconModalShow = true;
				let { status, msg, icons, total } = await AdminMenu.icon({ pageSize: 30 });
				if (status) {
					let newIcons = icons.map(item => {
						return {
							id: item.id,
							name: 'el-icon-' + item.name,
							isChecked: false,
						}
					});
					this.icons = newIcons;
					this.total = total;
				}
			},
			closeIconModal() {
				this.iconModalShow = false;
				this.node = '';
			},

			// 添加
			openInsertModal(node, data) {
				this.node = node; //转存节点node
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
			},
			async append() {
				let { status, msg, data } = await AdminMenu.add({ ...this.insertForm });
				if (status) {
					let id = data.id;
					this.$refs.tree.append({ ...this.insertForm, id }, this.node);
					// 提示信息
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
					// 添加表单置空
					this.insertForm = {};
					this.node = '';
					this.insertModalShow = false;
				}
			},
			closeInsertModal() {
				this.insertForm = {};
				this.insertModalShow = false;
			},
			// 删除
			async remove(node, data) {
				let id = data.id;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status, msg } = await AdminMenu.remove({ id });
					if (status) {
						node.remove();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 加载分类
			async loadNode(node, resolve) {
				if (node.level == 0) {
					let { status, data } = await AdminMenu.sub({ pId: 0 })
					return resolve(data);
				}
				if (node.level > 0) {
					let pId = node.data.id;
					let { status, data } = await AdminMenu.sub({ pId })
					for (let i = 0; i < data.length; i++) {
						data[i].icon = 'el-icon-' + data[i].icon;
					}
					resolve(data);
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.clear {
		clear: both;
	}

	.icon-list li p {
		margin: 0;
		font-size: 9px;

	}

	.icon-list li i {
		line-height: 70px;
	}

	.icon-list {
		padding: 0;
	}

	.icon-list li {
		cursor: pointer;
		float: left;
		width: 106px;
		text-align: center;
		height: 100px;
		color: #666;
		list-style: none;
		font-size: 30px;
		border: 1px solid whitesmoke;
		display: inline-block;
	}

	.isChecked {
		background: #5cb6ff;
		color: white !important;
	}

	.el-card {
		width: calc(100vw - 260px);
		margin: 20px;
	}

	.title {
		padding-bottom: 20px;
		border-bottom: 1px solid lightgray;
	}

	.el-tree {
		padding: 20px 0;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
