<template>
	<div class="specDetail" v-if="specification.length">
		<el-table
			:data="tableData"
			:span-method="objectSpanMethod1"
			border
			style="width: 100%; margin-top: 20px"
		>
			<el-table-column
				align="center"
				v-if="specification1"
				prop="spec1"
				:label="retName(1)"
				width="180"
			></el-table-column>
			<el-table-column
				align="center"
				v-if="specification2"
				prop="spec2"
				:label="retName(2)"
			></el-table-column>
			<el-table-column
				align="center"
				v-if="specification3"
				prop="spec3"
				:label="retName(3)"
			></el-table-column>
			<el-table-column align="center" label="价格">
				<template prop="goods_price" #default="scope">
					<el-input-number
						size="mini"
						v-model="scope.row.goods_price"
						:min="0.01"
					></el-input-number>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="bar_code" label="条形码">
				<template #default="scope">
					<el-input
						size="mini"
						v-model="scope.row.bar_code"
					></el-input>
				</template>
			</el-table-column>
		</el-table>
		<div class="specDetail_parent_footer">
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			specification: {
				type: Array,
				default() {
					return [];
				},
			},
			isEditSpecArr: {
				type: Array,
				default() {
					return [];
				},
			},
			isEditSpecArr2: {
				type: Array,
				default() {
					return [];
				},
			},
		},
		data() {
			return {
				index: "",
				shopType: [],
				newList: [],
				newData: [],
				tableData: [],
				tableDataCopy: [],
				spanArr: [],
				pos: "",
				spanArr1: [],
				pos1: "",
				batchSetPriceShow: false,
				batchSetPrice: 0.01,
				isEdit: true,
			};
		},
		created() {},
		watch: {
			specification: {
				handler: function(val) {
					console.log(val,'valvvvvvvvvvvvvvvvvvv')
					this.shopType = val;
					this.processing();
				},
				immediate: true,
			},
			tableData: {
				handler: function(val) {
					console.log('valvalvalvalvalvalvalval',val);
					let priceArr = [];
					val.forEach((item) => {
						priceArr.push(item.goods_price);
					});
					let arr = Object.assign([], val);
					this.tableDataCopy = JSON.parse(JSON.stringify(arr));
					// this.$emit("global:mixPrice", Math.min(...priceArr));
					this.$emit("childByValue", this.tableData);
				},
				deep: true,
				immediate: true,
			},
		},
		computed: {
			specification1() {
				return (
					this.specification.length > 0 &&
					this.specification[0].value.some((item) => item.name)
				);
			},
			specification2() {
				return (
					this.specification.length > 1 &&
					this.specification[1].value.some((item) => item.name)
				);
			},
			specification3() {
				return (
					this.specification.length > 2 &&
					this.specification[2].value.some((item) => item.name)
				);
			},
		},
		mounted() {},
		methods: {
			descartes(array) {
				return [].reduce.call(array, function(col, set) {
					var res = [];
					col.forEach(function(c) {
						set.forEach(function(s) {
							var t = [].concat(Array.isArray(c) ? c : [c]);
							t.push(s);
							res.push(t);
						});
					});
					console.log(res);
					return res;
				});
			},
			//返回所属规格名字
			retName(index) {
				if (index == 1) {
					if (this.shopType.length >= 1) {
						return this.shopType[0].name;
					}
				} else if (index == 2) {
					if (this.shopType.length >= 1) {
						return this.shopType[1].name;
					}
				} else if (index == 3) {
					if (this.shopType.length >= 1) {
						return this.shopType[2].name;
					}
				} else {
					return "";
				}
			},
			//处理数据
			processing() {
				this.newData = [];
				for (let i = 0; i < this.shopType.length; i++) {
					var newlist = [];
					for (
						let index = 0;
						index < this.shopType[i].value.length;
						index++
					) {
						if (this.shopType[i].value[index].name)
							newlist.push(this.shopType[i].value[index]);
					}
					if (newlist.length) {
						this.newData.push(newlist);
					}
				}
				this.getList();
			},
			//转换数据
			getList() {
				this.newList = this.descartes(this.newData);
				this.tableDataCopy = [];
				if (this.isEditSpecArr.length) {
					this.tableData = [];
					for (let index = 0; index < this.newList.length; index++) {
						this.tableData.push({
							goods_stock: this.isEditSpecArr2.length
								? this.isEditSpecArr2[index].goods_stock
								: 0,
							goods_spec_value_key: this.isEditSpecArr2[index]
								.goods_spec_value_key,
							spec1:
								this.newData.length > 1
									? this.newList[index][0].name
									: this.newList[index].name,
							spec2:
								this.newData.length > 1
									? this.newList[index][1].name
									: "",
							spec3:
								this.newData.length > 2
									? this.newList[index][2].name
									: "",
							goods_price: this.isEditSpecArr2.length
								? this.isEditSpecArr2[index].goods_price
								: 0.01,
							bar_code: this.isEditSpecArr2.length
								? this.isEditSpecArr2[index].bar_code
								: "",
							warning_value: this.isEditSpecArr2.length
								? this.isEditSpecArr2[index].warning_value
								: 0,
						});
					}

					let isTrue = this.tableData.every((i) => i.goods_price);
					// if (isTrue) this.$emit("global:isComplete", true);
				} else {
					for (let index = 0; index < this.newList.length; index++) {
						this.tableDataCopy.push({
							goods_spec_value_key:
								this.newData.length > 2
									? this.newList[index][0]
											.goods_spec_value_key +
									  "-" +
									  this.newList[index][1]
											.goods_spec_value_key +
									  "-" +
									  this.newList[index][2]
											.goods_spec_value_key
									: this.newData.length > 1
									? this.newList[index][0]
											.goods_spec_value_key +
									  "-" +
									  this.newList[index][1]
											.goods_spec_value_key
									: this.newList[index].goods_spec_value_key,
							spec1:
								this.newData.length > 1
									? this.newList[index][0].name
									: this.newList[index].name,
							spec2:
								this.newData.length > 1
									? this.newList[index][1].name
									: "",
							spec3:
								this.newData.length > 2
									? this.newList[index][2].name
									: "",
							goods_price: 0.01,
							bar_code: "",
							goods_stock: 0,
						});
					}
					if (this.tableData.length) {
						let keys = this.tableData.map(
							(item) => item.goods_spec_value_key
						);
						let newArr = [];
						let nowIndex;
						for (let i = 0; i < this.tableDataCopy.length; i++) {
							nowIndex = keys.indexOf(
								this.tableDataCopy[i].goods_spec_value_key
							);
							if (nowIndex !== -1) {
								this.tableDataCopy[
									i
								].goods_price = this.tableData[
									nowIndex
								].goods_price;
								this.tableDataCopy[i].bar_code = this.tableData[
									nowIndex
								].bar_code;
								this.tableDataCopy[
									i
								].goods_stock = this.tableData[
									nowIndex
								].goods_stock;
							}
							newArr.push(this.tableDataCopy[i]);
						}
						let arr = Object.assign([], newArr);
						this.tableData = JSON.parse(JSON.stringify(arr));
					} else {
						let arr = Object.assign([], this.tableDataCopy);
						this.tableData = JSON.parse(JSON.stringify(arr));
					}
				}
				this.getSpanArr(this.tableData);
			},

			//计0+-算位置的方法
			getSpanArr(data) {
				this.spanArr = [];
				this.pos = "";
				this.spanArr1 = [];
				this.pos1 = "";
				for (var i = 0; i < data.length; i++) {
					if (i === 0) {
						this.spanArr.push(1);
						this.pos = 0;
					} else {
						// 判断当前元素与上一个元素是否相同
						if (data[i].spec1 === data[i - 1].spec1) {
							this.spanArr[this.pos] += 1;
							this.spanArr.push(0);
						} else {
							this.spanArr.push(1);
							this.pos = i;
						}
					}
				}

				for (var i = 0; i < data.length; i++) {
					if (i === 0) {
						this.spanArr1.push(1);
						this.pos1 = 0;
					} else {
						if (data[i].spec2 === data[i - 1].spec2) {
							this.spanArr1[this.pos1] += 1;
							this.spanArr1.push(0);
						} else {
							this.spanArr1.push(1);
							this.pos1 = i;
						}
					}
				}
			},

			// 合并行数
			objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
				// columnIndex === 0 找到第一列，实现合并随机出现的行数
				if (columnIndex === 0 && this.shopType.length >= 1) {
					const _row = this.spanArr[rowIndex];
					const _col = _row > 0 ? 1 : 0;
					return {
						rowspan: _row,
						colspan: _col,
					};
					// columnIndex === 1 找到第二列，合并他的列数
				} else if (columnIndex === 1 && this.shopType.length >= 2) {
					if (this.shopType[1].value.length > 1) {
						const _row = this.spanArr1[rowIndex];
						const _col = _row > 0 ? 1 : 0;
						return {
							rowspan: _row,
							colspan: _col,
						};
					}
				}
			},
			handleSaveBatchSetPrice() {
				this.tableData.forEach((item, index) => {
					item.goods_price = this.batchSetPrice;
				});
				this.batchSetPriceShow = false;
			},
		},
	};
</script>
<style lang="scss">
	.specDetail {
		.el-input {
			width: 150px !important;
		}
		.el-input-number--mini {
			width: 150px;
		}
	}

	.table_1 {
		width: 20%;
		border-right: 1px solid #bbbbbb;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.table_2 {
		width: 80%;
		.table_2_1 {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #bbbbbb;
			.table_2_1_1 {
				width: 20%;
				align-items: center;
				text-align: center;
			}
			.table_2_1_2 {
				border-left: 1px solid #bbbbbb;
				flex: 1;
				.table_2_1_2_1 {
					text-align: center;
					border-bottom: 1px solid #bbbbbb;
					display: flex;
				}
				.table_2_1_2_1:last-child {
					border-bottom: none;
				}
			}
			.table_2_1_2:last-child {
				border-bottom: none;
			}
		}
		.table_2_1:last-child {
			border-bottom: none;
		}
	}
</style>
<style lang="scss" scoped>
	.specDetail {
		.specDetail_parent_head_ul {
			display: flex;
			width: 100%;
			border: 1px solid #bbbbbb;
			border-bottom: none;
			background: #fcf3e1;
			li {
				border-left: 1px solid #bbbbbb;
				display: table-cell;
				text-align: center;
				font-size: 14px;
			}
			li:first-child {
				border-left: none;
			}
		}
		.specDetail_parent_content_ul {
			width: 100%;
			border: 1px solid #bbbbbb;
			border-bottom: none;
			li {
				width: 100%;
				display: flex;
				border-bottom: 1px solid #bbbbbb;
			}
		}
		.specDetail_parent_footer {
			margin-top: 10px;
			display: flex;
		}
	}
</style>
