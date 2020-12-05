<!-- 商品sku -->
<template>
	<div class="goodSku">
		<div class="release_sale_form">
			<el-form
				size="mini"
				:model="saleForm"
				ref="saleFormRef"
				label-width="100px"
			>
				<div style="margin-bottom: 20px">
					<div
						class="release_sale_form_add_specification"
						v-for="(domain, index) in saleForm.specification"
						:key="domain.key"
					>
						<el-form-item
							:label="index === 0 ? '商品规格 :' : ''"
							:prop="'specification.' + index + '.name'"
							:rules="{
								required: true,
								message: '商品规格不能为空',
								trigger: 'blur',
							}"
						>
							<div
								@mouseover="currentParentErrIndex = index"
								@mouseout="currentParentErrIndex = -1"
								class="release_sale_form_add_specification_list"
							>
								<div
									class="release_sale_form_add_specification_list_title"
								>
									<div>
										<span>规格项：</span>
										<el-input
											placeholder="请输入规格项"
											v-model="domain.name"
										></el-input>
									</div>
									<i
										v-show="
											currentParentErrIndex === index &&
												saleForm.specification.length >
													1
										"
										@click="
											saleForm.specification.splice(
												index,
												1
											)
										"
										class="el-icon-error"
									></i>
								</div>
								<ul
									class="release_sale_form_add_specification_list_ul"
								>
									<li
										class="release_sale_form_add_specification_list_ul_warp"
									>
										<div
											style="
                                                    margin-right: 10px;
                                                    min-width: 50px;
                                                "
										>
											规格值 :
										</div>
										<div
											style="
                                                    display: flex;
                                                    flex-wrap: wrap;
                                                "
										>
											<div
												v-for="(val,
												valIndex) in domain.value"
												:key="val.key"
												v-show="domain.value.length"
												@mouseover="
													val.currentChildErrIndex = valIndex
												"
												@mouseout="
													val.currentChildErrIndex = -1
												"
												class="release_sale_form_add_specification_list_ul_val"
											>
												<el-form-item
													style="
                                                            margin-bottom: 15px;
                                                        "
													class="child_form_item"
													label-width="auto"
													:prop="
														'specification.' +
															index +
															'.value.' +
															valIndex +
															'.name'
													"
													:rules="{
														required: true,
														message: '请填写规格值',
														trigger: 'change',
													}"
												>
													<el-input
														class="inline-input long_input"
														v-model="val.name"
														placeholder="请输入内容,最多允许20个字"
														style="
                                                                width: 150px;
                                                                margin-bottom: 10px;
                                                            "
														:maxlength="20"
													></el-input>
													<i
														@click="
															saleForm.specification[
																index
															].value.splice(
																valIndex,
																1
															)
														"
														v-show="
															val.currentChildErrIndex ===
																valIndex
														"
														class="el-icon-error"
													></i>
												</el-form-item>
											</div>
										</div>
									</li>
								</ul>
								<div
									v-show="domain.value.length || domain.name"
								>
									<span
										style="
                                                color: #eb7044;
                                                margin-right: 5px;
                                                cursor: pointer;
                                            "
										:style="{
											color:
												domain.value.length > 7
													? '#F8BEA3'
													: '#eb7044',
										}"
										@click="
											handleAddSpecificationVal(
												domain.value.length,
												index
											)
										"
										>+ 添加规格值</span
									>
									<span
										>最多可添加8个规格值，还可添加{{
											8 - domain.value.length
										}}个</span
									>
								</div>
							</div>
						</el-form-item>
					</div>
					<div
						style="margin-left: 100px"
						class="release_sale_form_add_specification_btn"
					>
						<el-button
							:class="
								saleForm.specification.length > 2
									? 'disAbledBtn'
									: ''
							"
							@click="handleAddSpecification"
							>+ 添加规格项</el-button
						>
						<span
							@click="handleDraggable"
							style="
                                text-decoration: underline;
                                color: #eb7044;
                                font-size: 13px;
                                margin-left: 10px;
                                cursor: pointer;
                            "
							>规格排序</span
						>
					</div>
				</div>
				<a-form-item
					:rules="{
						trigger: 'blur',
                        validator: checkAge,
					}"
					v-if="isSortContentShow"
					label="规格明细 :"
				>
					<!-- <div style="color: #7A797A">此处库存仍然为商品的可售卖库存，可以直接进行修改，修改后，买家看到的商品可售库存数量会进行变化</div> -->
					<specDetail
						:isEditSpecArr="isEditSpecArr"
						:isEditSpecArr2="isEditSpecArr2"
						:specification="saleForm.tableDate"
					/>
					<!-- <childComp /> -->

					<!-- <div>1111111111111111111</div> -->
				</a-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="submitForm('dynamicValidateForm')"
						>提交</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		reactive,
		toRefs,
		ref,
		onMounted,
		watch,
		nextTick,
	} from "vue";
	import { ElMessage } from "element-plus";
	import specDetail from "./specDetail2";
	var checkAge = (rule, value, callback) => {
		let flag = true;
		value.forEach((item) => {
			flag = item.value.every((item) => item.goods_price);
		});
		if (!flag) {
			return callback(new Error("请填写价格"));
		} else {
			callback();
		}
	};

	export default defineComponent({
		components: {
			specDetail,
		},
		setup() {
			const saleFormRef = ref(null);
			console.log("saleFormRef", saleFormRef);
			const state = reactive({
				currentParentErrIndex: -1,
				isSortContentShow: false,
				isEditSpecArr: [],
				isEditSpecArr2: [],
				saleForm: {
					specification: [
						{
							name: "",
							currentChildErrIndex: -1,
							isShow: false,
							value: [],
							key: Date.now(),
						},
					],
					tableDate: [],
				},
				rules: {
					tableDate: [],
				},
			});

			//添加规格项
			const handleAddSpecification = () => {
				const { specification } = state.saleForm;
				// if (specification.length > 2) {
				// 	return ElMessage.warning("最多添加3个规格项");
				// }
				specification.push({
					name: "",
					currentChildErrIndex: -1,
					isShow: false,
					value: [],
					key: Date.now(),
				});
			};
			//添加规格值
			const handleAddSpecificationVal = (num, index) => {
				const { specification } = state.saleForm;
				if (8 - num === 0) {
					return ElMessage.warning("最多可添加8个规格值");
				}
				specification[index].value.push({
					goods_spec_value_key:
						String(index + 1) + "-" + new Date().getTime(),
					name: "",
					img: "",
					goods_price: 0.01,
					bar_code: "",
				});
			};
			const isSpecificationVal = () => {
				let { specification, tableDate } = state.saleForm;
				let { isSortContentShow } = state;
				if (!specification.length) return;
				state.isSortContentShow = specification.some((item) =>
					item.value.some((i) => i.name)
				);
				if (!specification.length) selectVal = "";
				specification.forEach((item) => {
					// isSortContentShow = item.value.some(item=>item.name)
					if (item.value.length) {
						item.value.forEach((i) => {
							if (i) {
								item.isShow = true;
							} else {
								item.isShow = false;
							}
						});
					} else {
						item.isShow = false;
					}
				});
				let arr = Object.assign([], specification);
				state.saleForm.tableDate = JSON.parse(JSON.stringify(arr));
			};
			const submitForm = () => {
				saleFormRef.value.validate((valid) => {
					if (valid) {
						console.log("sale success   submit!!");
					} else {
						console.log("sale error   submit!!");
					}
				});
			};
			const handleAutocompleteChildFocus = (e, index) => {};
			//选择规格值blur事件
			const handleAutocompleteChildBlur = (e, index, valIndex) => {};
			watch(
				() => state.saleForm.specification,
				() => {
					isSpecificationVal();
					console.log("3333333333333333333");
				},
				{
					deep: true,
				}
			);
			onMounted(() => {
				isSpecificationVal();
				nextTick(() => {});
			});
			return {
				...toRefs(state),
				saleFormRef,
                // rules,
                checkAge,
				submitForm,
				handleAddSpecification,
				handleAddSpecificationVal,
				handleAutocompleteChildFocus,
				handleAutocompleteChildBlur,
			};
		},
	});
</script>
<style lang="scss">
	.goodSku {
		.el-input {
			width: 140px;
		}
		.inline-input {
			width: 200px !important;
		}
		.el-form-item__content {
			position: relative;
			// width: 190px;
			.long_input {
				.el-input {
					width: 190px !important;
					.el-icon-error {
						right: 0;
					}
				}
			}
			.el-icon-error {
				font-size: 18px;
				color: #d3d4dc;
				cursor: pointer;
				position: absolute;
				top: -7px;
				right: 0;
			}
		}
		.release_sale_form_add_specification_list {
			border: 1px solid #ebeef5;
			margin-bottom: 10px;
			color: #7a797a;
			.release_sale_form_add_specification_list_ul {
				.release_sale_form_add_specification_list_ul_warp {
					display: flex;
					.release_sale_form_add_specification_list_ul_val {
						margin-right: 5px;
					}
				}
			}

			.release_sale_form_add_specification_list_title {
				background: #fcf3e1;
				padding: 8px 20px 8px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.el-icon-error {
					font-size: 18px;
					color: #eb7044;
					cursor: pointer;
				}
			}
		}

		.release_sale_form_add_specification_btn {
			background: #fcf3e1;
			padding: 5px 0px 5px 10px;
			button {
				color: #eb7044;
				border-color: #eb7044;
				padding: 10px 18px;
				font-size: 12px;
				background-color: #fcf3e1;
			}
			.disAbledBtn {
				color: #f8bea3;
				border-color: #f8bea3;
				/*background-color: #F8BEA3*/
			}
		}
	}
</style>
<style lang="scss" scoped>
	//@import url(); 引入公共css类
	.goodSku {
	}
</style>
