<template>
	<div>
		<el-card shadow="always">
			<div class="title">
				商品列表
			</div>
			<el-table :data="goods">
				<el-table-column  label="商品名称" width="600">
					<template slot-scope='scope'>
						<el-image style="width: 80px; height: 80px; float:left;" :src="scope.row.img_md"></el-image>
						<p style="margin: 0;margin-top: 15px;font-size: 12px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
						<p style="margin: 0;font-size: 12px;">商品货号:{{scope.row.articleNo}}</p>
					</template>
				</el-table-column>
				<el-table-column sortable prop="price" label="价格" width="100">
				</el-table-column>
				<el-table-column sortable prop="inventory" label="库存" width="100">
				</el-table-column>
				<el-table-column sortable prop="create_time" label="发布时间" width="170">
				</el-table-column>
				<el-table-column prop="operate" label="操作" width="180">
					<template slot-scope="scope">
						<router-link :to="{ name : 'GoodsEdit' , params : { id : scope.row.id } }">
							<el-button type="primary" plain>编辑</el-button>
						</router-link>
						<el-button type="primary" @click='deleteHandle(scope.row.id)' style="margin-left: 10px;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[4, 8, 16, 62]"
				 layout="prev, pager, next, jumper,sizes,total" :total="total">
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { AdminGoods } from '@/api/index.js'

	export default {
		data() {
			return {
				goods: [],
				total: 0,
			}
		},
		methods: {
			async handleSizeChange(val) {
				let { status, goods, total } = await AdminGoods.list({ pageSize: val });
				if (status) {
					this.goods = goods;
				}
			},
			async handleCurrentChange(val) {
				let { status, goods, total } = await AdminGoods.list({ pageIndex: val });
				if (status) {
					this.goods = goods;
				}
			},
			async loadList() {
				let { status, goods, total } = await AdminGoods.list();
				if (status) {
					this.goods = goods;
					this.total = total;
				}
			},
			deleteHandle(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let res = AdminGoods.remove({ id: id });
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
		padding: 20px 0;
	}

	.block {
		float: right;
		padding: 15px 0;
	}
</style>
