<template>
	<div>
		<el-card shadow="always">
			<div class="title">
				订单列表
			</div>
			<el-table :data="order">
				<el-table-column prop="id" label="#" width="50">
				</el-table-column>
				<el-table-column width="600">
					<template slot-scope="scope">
						<el-table :data="scope.row.goodsList">
							<el-table-column label="商品" prop="img_md">
								<template slot-scope="scope2">
									<el-image style="width: 80px; height: 80px; float:left;" :src="scope2.row.img_md"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="name" width="300">
							</el-table-column>
							<el-table-column prop="goods_price" label="单价" width="100">
							</el-table-column>
							<el-table-column prop="goods_num" label="数量" width="50">
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column sortable prop="payment" label="付款总额" width="110">
				</el-table-column>
				<el-table-column sortable prop="create_time" label="下单时间" width="200">
				</el-table-column>
				<el-table-column sortable prop="status" label="状态" width="70">
				</el-table-column>
				<el-table-column prop="operate" label="操作" width="110">
					<el-button type="primary" plain>编辑</el-button>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import { AdminOrder } from '@/api/index.js'

	export default {
		data() {
			return {
				order: [],
			}
		},
		methods: {
			async loadList() {
				let { status, msg, data } = await AdminOrder.list({ status: 0 });
				if (status) {
					this.order = data;
					let date = new Date(data[0].create_time);
					console.log(data);
					// console.log(this.order[0].goodsList)
				}
			},
		},
		created() {
			this.loadList();
		},
	}
</script>

<style scoped="scoped">
	.el-card {
		width: calc(100vw - 260px);
		margin: 20px;
	}

	.title {
		padding-bottom: 20px;
		border-bottom: 1px solid lightgray;
	}

	.el-table {
		font-size: 13px;
	}
</style>
