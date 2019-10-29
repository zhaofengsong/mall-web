<template>
	<div>
		<el-card shadow="always">
			<div class="title">
				发布商品
			</div>
			<el-form :rules="rules" ref="form" :model="form" label-width="100px" style="width: 1100px;padding: 30px 0;">
				<el-form-item label="商品分类" prop="cate_1st">
					<el-select v-model="form.cate_1st" placeholder="暂无数据">
						<el-option v-for="item in optionsFirst" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select v-model="form.cate_2nd" placeholder="暂无数据">
						<el-option v-for="item in optionsSecond" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select v-model="form.cate_3rd" placeholder="暂无数据">
						<el-option v-for="item in optionsThird" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
					<p>商品标题名称长度至少3个字符，最长200个汉字</p>
				</el-form-item>
				<el-form-item label="商品卖点">
					<el-input type="textarea" :rows="2" v-model="form.hotPoint" placeholder="请输入商品卖点"></el-input>
					<p>商品卖点不能超过140个汉字</p>
				</el-form-item>
				<el-form-item label="商品价格" prop="price">
					<el-input style="width: 200px;" placeholder="请输入商品价格" v-model="form.price">
						<template slot="append">元</template>
					</el-input>
					<p>价格必须是0-999999之间的数字，且不能高于市场价</p>
					<p>此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</p>
				</el-form-item>
				<el-form-item label="市场价" prop="marketPrice">
					<el-input style="width: 200px;" placeholder="请输入市场价格" v-model="form.marketPrice">
						<template slot="append">元</template>
					</el-input>
					<p>价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</p>
				</el-form-item>
				<el-form-item label="成本价" prop="cost">
					<el-input style="width: 200px;" placeholder="请输入成本价格" v-model="form.cost">
						<template slot="append">元</template>
					</el-input>
					<p>价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</p>
				</el-form-item>
				<el-form-item label="折扣">
					<el-input style="width: 200px;" readonly placeholder="请输入商品折扣" v-model="form.discount">
						<template slot="append">折</template>
					</el-input>
					<p>根据销售价与市场价比例自动生成不需要编辑</p>
				</el-form-item>
				<el-form-item label="库存">
					<el-input style="width: 200px;" placeholder="请输入商品库存" v-model="form.inventory">
					</el-input>
					<p>价格必须是0-999999之间的整数</p>
					<p>若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</p>
				</el-form-item>
				<el-form-item label="商品货号" prop="articleNo">
					<el-input style="width: 200px;" placeholder="请输入商品货号" v-model="form.articleNo">
					</el-input>
					<p>商品货号是商家管理商品的编号，买家不可见</p>
					<p>最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</p>
				</el-form-item>
				<el-form-item label="商品主图" prop="img_md">
					<el-upload :on-success="imgMdOnSuccess" :file-list="fileList_img_md" :headers="headers" action="/api/upload/goods"
					 list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
					<p style="margin: 0; font-size: 11px;color:red;">请注意！只能上传一张主图</p>
					<p>上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</p>
				</el-form-item>
				<el-form-item label="商品轮播图" prop="slider">
					<el-upload :on-success="sliderOnSuccess" :file-list="fileList_slider" :headers="headers" action="/api/upload/slider"
					 list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
					<p>上传商品轮播图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</p>
				</el-form-item>

				<!-- 商品详情描述 -->
				<div style="height: 40px;margin-bottom: 20px ;background: whitesmoke;border-radius: 10px;line-height: 40px;padding-left: 10px;font-size: 14px;">商品详情描述</div>
				<el-form-item label="商品品牌">
					<el-input v-model="form.brand" placeholder="请输入商品品牌"></el-input>
				</el-form-item>
				<!-- 富文本框 -->
				<el-form-item label="商品详情" prop="detail">
					<editor-bar v-model="form.detail" :isClear="isClear" @change="change"></editor-bar>
				</el-form-item>

				<!-- 商品物流信息 -->
				<div style="height: 40px;margin-bottom: 20px ;background: whitesmoke;border-radius: 10px;line-height: 40px;padding-left: 10px;font-size: 14px;">商品物流信息</div>
				<el-form-item label="商品运费" prop="freight">
					<el-input style="width: 200px;" placeholder="请输入商品运费" v-model="form.freight">
						<template slot="append">元</template>
					</el-input>
					<p>运费设为0，前台商品将显示免运费</p>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click='submitHandle'>发布商品信息</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { AdminGoods, AdminCategory } from '@/api/index.js'
	import EditorBar from '../../components/EditorBar.vue'

	export default {
		components: {
			EditorBar,
		},
		data() {
			return {
				fileList_img_md: [],
				fileList_slider: [],
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				isClear: '',
				form: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					name: '',
					hotPoint: '',
					price: '',
					marketPrice: '',
					cost: '',
					inventory: '',
					articleNo: '',
					img_md: '',
					slider: '',
					brand: '',
					detail: '',
					freight: '',
				},
				optionsFirst: [],
				optionsSecond: [],
				optionsThird: [],
				rules: {
					cate_1st: [
						{ required: true, message: '请选择分类', trigger: 'blur' },
					],
					name: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
					],
					price: [
						{ required: true, message: '请输入商品价格', trigger: 'blur' },
					],
					marketPrice: [
						{ required: true, message: '请输入商品市场价格', trigger: 'blur' },
					],
					cost: [
						{ required: true, message: '请输入成本价格', trigger: 'blur' },
					],
					articleNo: [
						{ required: true, message: '请输入商品货号', trigger: 'blur' },
					],
					img_md: [
						{ required: true, message: '请插入商品主图', trigger: 'blur' },
					],
					slider: [
						{ required: true, message: '请插入商品轮播图', trigger: 'blur' },
					],
					detail: [
						{ required: true, message: '请输入商品详情', trigger: 'blur' },
					],
					freight: [
						{ required: true, message: '请输入商品运费', trigger: 'blur' },
					]

				},
				dialogImageUrl: '',
				dialogVisible: false,
			}
		},
		watch: {
			'form.price': function(newValue, oldValue) {
				this.form.discount = (this.form.price / this.form.marketPrice * 10).toFixed(2);
			},
			'form.marketPrice': function(newValue, oldValue) {
				this.form.discount = (this.form.price / this.form.marketPrice * 10).toFixed(2);
			},
			'form.cate_1st': function(newValue, oldValue) {
				this.loadCategory_2nd(newValue);
			},
			'form.cate_2nd': function(newValue, oldValue) {
				this.loadCategory_3rd(newValue);
			},
		},
		methods: {
			sliderOnSuccess(response, file, fileList) {
				this.form.slider += response.src + ',';
				// console.log(this.form.slider)
			},
			imgMdOnSuccess(response, file, fileList) {
				this.form.img_md = response.mdImg;
				this.form.img_lg = response.lgImg;
			},
			async submitHandle() {
				let { status, msg } = await AdminGoods.release({ ...this.form });
				if (status) {
					this.$message({
						type: 'success',
						message: '发布成功!',
						duration: 700,
						onClose: () => {
							this.$router.replace('/goods/list');
						}
					})
				} else {
					this.$message({
						type: 'warning',
						message: '发布失败!',
					})
				}
			},
			// 获取目录
			async loadCategory_1st(pId) {
				let { status, data } = await AdminCategory.sub({ pId })
				if (status) {
					if (data.length > 0) {
						this.form.cate_1st = data[0].id;
					} else {
						this.form.cate_1st = '';
					}
					this.optionsFirst = data;
				}
			},
			async loadCategory_2nd(pId) {
				let { status, data } = await AdminCategory.sub({ pId })
				if (status) {
					if (data.length > 0) {
						this.form.cate_2nd = data[0].id;
					} else {
						this.form.cate_2nd = '';
					}
					this.optionsSecond = data;
				}
			},
			async loadCategory_3rd(pId) {
				let { status, data } = await AdminCategory.sub({ pId })
				if (status) {
					if (data.length > 0) {
						this.form.cate_3rd = data[0].id;
					} else {
						this.form.cate_3rd = 0;
					}
					this.optionsThird = data;
				}
			},
			// 富文本编译器
			change(val) {
				this.form.detail = val;
			},
			// 主图
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				console.log(file);
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
		},
		created() {
			// 加载一二级目录
			this.loadCategory_1st(1);
			this.loadCategory_2nd(2);
			this.loadCategory_3rd(30);
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

	p {
		margin: 0;
		font-size: 12px;
		color: #999;
	}
</style>
