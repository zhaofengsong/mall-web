<template>
	<div>
		<el-card shadow="always">
			<div class="title">
				商品分类
			</div>
			<el-tree node-key="id" :default-expanded-keys="[1]" :props="defaultProps" lazy :load="loadNode" ref="tree">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button :disabled="node.level == 1" type="text" size="mini" @click.stop="() => openEditModal(node,data)" icon="el-icon-edit">
							编辑
						</el-button>
						<el-button type="text" size="mini" @click.stop="() => openInsertModal(node,data)" icon="el-icon-plus">
							添加
						</el-button>
						<el-button :disabled="node.level == 1" type="text" size="mini" @click.stop="() => remove(node, data)" icon="el-icon-delete">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>

			<!-- 添加弹窗 -->
			<el-dialog title="添加分类" :visible.sync="insertModalShow" :show-close = 'false'>
				<el-form :model="insertForm" :rules="rules">
					<el-form-item label="名称" label-width="60px" prop="name">
						<el-input v-model="insertForm.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="图片" label-width="60px" prop="img">
						<el-upload limit="1" :on-success="insertImgSuccess" :file-list="insertImgFileList" :headers="headers" action="/api/upload/goods"
						 list-type="picture-card" :on-remove="insertImgRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<p style="margin-left: 50px; font-size: 11px;color:red;">请注意！只能上传一张图片</p>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="closeInsertModal">取 消</el-button>
					<el-button type="primary" @click="append">添 加</el-button>
				</div>
			</el-dialog>
			<!-- 编辑弹窗 -->
			<el-dialog title="编辑分类" :visible.sync="editModalShow" :show-close = 'false'>
				<el-form :model="editForm" :rules="rules">
					<el-form-item label="名称" label-width="60px" prop="name">
						<el-input v-model="editForm.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="图片" label-width="60px" prop="img">
						<el-upload limit="1" :on-success="editImgSuccess" :file-list="editImgFileList" :headers="headers" action="/api/upload/goods"
						 list-type="picture-card" :on-remove="editImgRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<p style="margin-left: 50px; font-size: 11px;color:red;">请注意！只能上传一张图片</p>
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
	import { AdminCategory, AdminImage } from '@/api/index.js'

	export default {
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				defaultProps: {
					label: 'name'
				},
				insertModalShow: false,
				insertForm: {
					name: '',
					img: '',
				},
				insertImgFileList: [],
				dialogImageUrl: '',
				dialogVisible: false,
				node: '', //节点数据
				editForm: {
					id: '',
					name: '',
					img: '',
				},
				editImgFileList: [],
				editModalShow: false,
				rules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
					],
					img: [
						{ required: true, message: '请插入图片', trigger: 'blur' },
					],
				}
			}
		},
		methods: {
			// 加载分类
			async loadNode(node, resolve) {
				if (node.level == 0) {
					let { status, data } = await AdminCategory.sub({ pId: 0 })
					return resolve(data);
				}
				if (node.level > 0) {
					let pId = node.data.id;
					let { status, data } = await AdminCategory.sub({ pId })
					resolve(data);
				}
			},
			// 添加分类
			insertImgSuccess(response, file, fileList) {
				this.insertForm.img = response.mdImg;
			},
			insertImgRemove(file, fileList) {
				console.log(file, fileList);
			},
			openInsertModal(node, data) {
				console.log(node)
				this.node = node; //转存节点node
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
			},
			closeInsertModal() {
				this.insertModalShow = false;
				this.insertForm.name = '';
				this.insertForm.pId = '';
				this.insertForm.img = '';
			},
			async append() {
				let { status, data } = await AdminCategory.insert({ ...this.insertForm });
				if (status) {
					let id = data.id;
					// 插入假目录
					this.$refs.tree.append({ ...this.insertForm, id }, this.node)
					this.insertModalShow = false;
					// 提示信息
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
					// 添加表单置空
					this.insertForm.name = '';
					this.insertForm.parent_id = '';
					this.node = '';
				}

			},
			// 更新分类
			editImgSuccess(response) {
				this.editForm.img = response.mdImg;
			},
			async editImgRemove() {
				let src = '.' + this.editForm.img;
				let { status, msg } = await AdminImage.remove({ src });
				if (status) {
					this.editForm.img = '';
				}
			},
			openEditModal(node, data) {
				this.node = node;
				this.editForm = { ...data };
				if (this.editForm.img != '') {
					let img = { url: this.editForm.img };
					this.editImgFileList.push(img);
				}
				this.editModalShow = true;
				// console.log(this.editForm);
			},
			closeEditModal() {
				this.editModalShow = false;
				this.editForm.name = '';
				this.editForm.id = '';
				this.editForm.img = '';
				this.editImgFileList = [];
			},
			async edit() {
				let { status, msg } = await AdminCategory.update({ ...this.editForm });
				if (status) {
					this.node.data = this.editForm;
					this.$message({
						type: 'success',
						message: '编辑成功!'
					});
					this.editModalShow = false;
				} else {
					this.$message({
						message: '编辑失败！',
						type: 'warning'
					});
				}
			},
			// 删除分类
			async remove(node, data1) {
				let id = data1.id;
				// 未判定子节点
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status, msg } = await AdminCategory.remove({ id });
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
		},
	}
</script>

<style>
	.el-card {
		width: calc(100vw - 245px);
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
