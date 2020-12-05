<!--
 * @Author: your name
 * @Date: 2020-12-03 15:24:05
 * @LastEditTime: 2020-12-04 22:36:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/views/goodSku/specDetail2.vue
-->
<!--  -->
<template>
	<div class="specDetail" v-if="specification.length">
		<el-table
			:data="tableData"
			:span-method="objectSpanMethod1"
			border
			style="width: 100%; margin-top: 20px"
		>
			<div v-for="item in tableColumnList" :key="item.propName">
				<el-table-column
					v-if="item.propName"
					:label="item.propName"
					:prop="item.prop"
					align="center"
					width="180"
				></el-table-column>
			</div>

			<!-- <el-table-column
				align="center"
				v-if="specificationList(1).specification1()"
				prop="spec1"
				:label="retName(1)"
				width="180"
			></el-table-column>
			<el-table-column
				align="center"
				v-if="specificationList(2).specification2()"
				prop="spec2"
				:label="retName(2)"
			></el-table-column>
			<el-table-column
				align="center"
				v-if="specificationList(3).specification3()"
				prop="spec3"
				:label="retName(3)"
			></el-table-column> -->
			<el-table-column width="200px" align="center" label="价格">
				<template prop="goods_price" #default="scope">
					<el-input-number
						size="mini"
						v-model="scope.row.goods_price"
						:min="0.01"
					></el-input-number>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		computed,
		defineComponent,
		nextTick,
		reactive,
		toRefs,
		watch,

	} from "vue";

	export default defineComponent({
		props: {
			isEditSpecArr: {
				type: Array,
			},
			isEditSpecArr2: {
				type: Array,
			},
			specification: {
				type: Array,
			},
		},
		setup(props) {
			console.log(props);
			const state = reactive({
				tableData: [],
				tableDataCopy: [],
				shopType: [],
				newData: [],
				newList: [],
				spanArr: [],
				pos: "",
				spanArr1: [],
				pos1: "",
				isEditSpecArr: props.isEditSpecArr,
				isEditSpecArr2: props.isEditSpecArr2,
				specification: props.specification,
				tableColumnList: [],
			});
			//处理数据
			const processing = () => {
				const { shopType } = state;
				state.newData = [];
				for (let i = 0; i < shopType.length; i++) {
					let newlist = [];
					for (
						let index = 0;
						index < shopType[i].value.length;
						index++
					) {
						if (shopType[i].value[index].name)
							newlist.push({
								...shopType[i].value[index],
								parentName: shopType[i].name,
							});
					}
					if (newlist.length) {
						state.newData.push(newlist);
					}
				}
				console.log(state.newData, "state.newData");
				getList();
			};
			const descartes = (array) => {
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
			};
			//转换数据
			const getList = () => {
				const { newData } = state;
				console.log(newData, "newDatanewDatanewData11113123121111");
				var arrList = [];
				for (let index = 0; index < newData.length; index++) {
					console.log(newData[index], "ppp");
					arrList.push({
						prop: "spec" + (index + 1),
						propName: newData[index][0].parentName,
					});
				}
				state.tableColumnList = arrList;
				state.newList = descartes(newData);
				state.tableDataCopy = [];
				if (state.isEditSpecArr.length) {
					state.tableData = [];
					for (let index = 0; index < state.newList.length; index++) {
						state.tableData.push({
							goods_stock: state.isEditSpecArr2.length
								? state.isEditSpecArr2[index].goods_stock
								: 0,
							goods_spec_value_key:
								state.isEditSpecArr2[index]
									.goods_spec_value_key,
							// spec1:
							// 	state.newData.length > 1
							// 		? state.newList[index][0].name
							// 		: state.newList[index].name,
							// spec2:
							// 	state.newData.length > 1
							// 		? state.newList[index][1].name
							// 		: "",
							// spec3:
							// 	state.newData.length > 2
							// 		? state.newList[index][2].name
							// 		: "",
							["spec" + index + 1]: (() => {
								if (state.newData.length > 1) {
									for (
										let i = 0;
										i < state.newList[index].length;
										i++
									) {
										return state.newList[index][i].name;
									}
									// return state.newList[index][index].name
								} else {
									return state.newList[index].name;
								}
							})(),
							goods_price: state.isEditSpecArr2.length
								? state.isEditSpecArr2[index].goods_price
								: 0.01,
							bar_code: state.isEditSpecArr2.length
								? state.isEditSpecArr2[index].bar_code
								: "",
							warning_value: state.isEditSpecArr2.length
								? state.isEditSpecArr2[index].warning_value
								: 0,
						});
					}

					let isTrue = state.tableData.every((i) => i.goods_price);
					// if (isTrue) state.$emit("global:isComplete", true);
				} else {
					console.log(
						state.newList,
						"state.newListstate.newListstate.newList"
					);
					// for (let i = 0; i < newData.length; i++) {
					for (let index = 0; index < state.newList.length; index++) {
						let obj = {
							goods_spec_value_key:
								state.newData.length > 2
									? state.newList[index][0]
											.goods_spec_value_key +
									  "-" +
									  state.newList[index][1]
											.goods_spec_value_key +
									  "-" +
									  state.newList[index][2]
											.goods_spec_value_key
									: state.newData.length > 1
									? state.newList[index][0]
											.goods_spec_value_key +
									  "-" +
									  state.newList[index][1]
											.goods_spec_value_key
									: state.newList[index].goods_spec_value_key,
							// spec1:
							// 	state.newData.length > 1
							// 		? state.newList[index][0].name
							// 		: state.newList[index].name,
							// spec2:
							// 	state.newData.length > 1
							// 		? state.newList[index][1].name
							// 		: "",
							// spec3:
							// 	state.newData.length > 2
							// 		? state.newList[index][2].name
							// 		: "",
							// ['spec'+(i+1)]:((i)=>{
							// 	if(state.newData.length > 1){
							// 		// return state.newList[index][i].name
							// 		for (let j = 0; j < state.newList[index].length; j++) {
							// 			return state.newList[index][j].name
							// 		}
							// 		// return state.newList[index][index].name
							// 		// console.log(state.newList[index],'state.newList[index]');
							// 		// return state.newList[index][index].name
							// 	}else{
							// 		return state.newList[i].name
							// 	}
							// })(index),
							goods_price: 0.01,
							bar_code: "",
							goods_stock: 0,
						};
						//
						for (let j = 1; j <= newData.length; j++) {
							obj[
								(() => {
									return "spec" + j;
								})()
							] = ((j) => {
								if (state.newData.length > 1) {
									for (
										let i = 0;
										i < state.newList[index].length;
										i++
									) {
										return state.newList[index][j - 1].name;
									}
								} else {
									return state.newList[index].name;
								}
							})(j);
						}
						state.tableDataCopy.push(obj);
						console.log(
							state.tableDataCopy,
							"state.tableDataCopystate.tableDataCopy"
						);
						console.log(
							state.tableColumnList,
							"state.tableColumnListstate.tableColumnList"
						);
					}
					// }

					if (state.tableData.length) {
						let keys = state.tableData.map(
							(item) => item.goods_spec_value_key
						);
						let newArr = [];
						let nowIndex;
						for (let i = 0; i < state.tableDataCopy.length; i++) {
							nowIndex = keys.indexOf(
								state.tableDataCopy[i].goods_spec_value_key
							);
							if (nowIndex !== -1) {
								state.tableDataCopy[i].goods_price =
									state.tableData[nowIndex].goods_price;
								state.tableDataCopy[i].bar_code =
									state.tableData[nowIndex].bar_code;
								state.tableDataCopy[i].goods_stock =
									state.tableData[nowIndex].goods_stock;
							}
							newArr.push(state.tableDataCopy[i]);
						}
						let arr = Object.assign([], newArr);
							state.tableData = JSON.parse(JSON.stringify(arr));
						console.log(
							state.tableData,
							"state.tableDatastate.tableDatastate.tableData11111111111"
						);
					} else {
						console.log(
							state.tableData,
							"state.tableDatastate.tableDatastate.tableData22222222222"
						);

						let arr = Object.assign([], state.tableDataCopy);
							state.tableData = JSON.parse(JSON.stringify(arr));
						// state.tableData = JSON.parse(JSON.stringify(arr));
					}
				}
				getSpanArr(state.tableData);
			};
			//计0+-算位置的方法
			const getSpanArr = (data) => {
				state.spanArr = [];
				state.pos = "";
				state.spanArr1 = [];
				state.pos1 = "";
				for (var i = 0; i < data.length; i++) {
					if (i === 0) {
						state.spanArr.push(1);
						state.pos = 0;
					} else {
						// 判断当前元素与上一个元素是否相同
						if (data[i].spec1 === data[i - 1].spec1) {
							state.spanArr[state.pos] += 1;
							state.spanArr.push(0);
						} else {
							state.spanArr.push(1);
							state.pos = i;
						}
					}
				}

				for (var i = 0; i < data.length; i++) {
					if (i === 0) {
						state.spanArr1.push(1);
						state.pos1 = 0;
					} else {
						if (data[i].spec2 === data[i - 1].spec2) {
							state.spanArr1[state.pos1] += 1;
							state.spanArr1.push(0);
						} else {
							state.spanArr1.push(1);
							state.pos1 = i;
						}
					}
				}
			};
			const specificationList = (numName) => {
				const { specification } = props;
				const name = "specification" + numName;
				return {
					[name]: () => {
						return (
							specification.length > numName - 1 &&
							specification[numName - 1].value.some(
								(item) => item.name
							)
						);
					},
				};
			};
			watch(
				() => props.specification,
				(newVal) => {
					console.log("1111111111111");
					state.shopType = newVal;
					processing();
					specificationList();
				},
				{
					deep: true,
					immediate: true,
				}
			);

			// const specificationList = computed((num) => {
			// 	console.log(num, "nnnnnnnnnnnnnnnnnnnnnn");
			// 	return (numName) => {
			// 		const { specification } = state;
			// 		const name = "specification" + numName;
			// 		return {
			// 			[name]: () => {
			// 				return (
			// 					specification.length > numName - 1 &&
			// 					specification[numName - 1].value.some(
			// 						(item) => item.name
			// 					)
			// 				);
			// 			},
			// 		};
			// 	};
			// });

			// 合并行数
			const objectSpanMethod1 = ({
				row,
				column,
				rowIndex,
				columnIndex,
			}) => {
				const { shopType } = state;
				if (columnIndex === 0 && state.shopType.length >= 1) {
					const _row = state.spanArr[rowIndex];
					const _col = _row > 0 ? 1 : 0;
					return {
						rowspan: _row,
						colspan: _col,
					};
					// columnIndex === 1 找到第二列，合并他的列数
				} else if (columnIndex === 1 && state.shopType.length >= 2) {
					if (state.shopType[1].value.length > 1) {
						const _row = state.spanArr1[rowIndex];
						const _col = _row > 0 ? 1 : 0;
						return {
							rowspan: _row,
							colspan: _col,
						};
					}
				}
			};
			return {
				...toRefs(state),
				objectSpanMethod1,
				// retName,
				specificationList,
			};
		},
	});
</script>
<style lang="scss" scoped>
	//@import url(); 引入公共css类
</style>
