<!--
 * @Author: your name
 * @Date: 2020-11-30 16:59:02
 * @LastEditTime: 2020-12-01 19:29:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/views/Home.vue
-->
<template>
	<div class="home">
		<a-form
			ref="saleForm"
			:model="saleForm"
			v-bind="formItemLayoutWithOutLabel"
		>
			<a-form-item
				v-for="(domain, index) in saleForm.specification"
				:key="index"
				v-bind="index === 0 ? formItemLayout : {}"
				:label="index === 0 ? 'specification' : ''"
				:name="['specification', index, 'name']"
				:rules="{
					required: true,
					message: 'domain can not be null',
					trigger: 'change',
				}"
			>
				<a-input
					v-model:value="domain.name"
					placeholder="please input domain"
					style="width: 60%; margin-right: 8px"
				/>
				<MinusCircleOutlined
					v-if="saleForm.specification.length > 1"
					class="dynamic-delete-button"
					:disabled="saleForm.specification.length === 1"
					@click="removeDomain(domain)"
				/>
			</a-form-item>
			<a-form-item v-bind="formItemLayoutWithOutLabel">
				<a-button type="dashed" style="width: 60%" @click="addDomain">
					<PlusOutlined /> Add field
				</a-button>
			</a-form-item>
			<a-form-item v-bind="formItemLayoutWithOutLabel">
				<a-button
					type="primary"
					html-type="submit"
					@click="submitForm('saleForm')"
				>
					Submit
				</a-button>
				<a-button
					style="margin-left: 10px"
					@click="resetForm('saleForm')"
				>
					Reset
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
	import { Options, Vue } from "vue-class-component";
	import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

	let id = 0;
	@Options({
		components: {
			MinusCircleOutlined,
			PlusOutlined,
		},
		data() {
			return {
				formItemLayout: {
					labelCol: {
						xs: { span: 24 },
						sm: { span: 4 },
					},
					wrapperCol: {
						xs: { span: 24 },
						sm: { span: 20 },
					},
				},
				formItemLayoutWithOutLabel: {
					wrapperCol: {
						xs: { span: 24, offset: 0 },
						sm: { span: 20, offset: 4 },
					},
				},
				saleForm: {
					specification: [],
				},
				saleForm: {
					specification: [
						{
							name: "",
							currentChildErrIndex: -1,
							isShow: false,
							value: [],
						},
					],
					tableDate: [],
					sortTableData: [],
					goodPrice: 0.01,
					goodLine: "",
					discount: 100,
					discount_start_time: null,
					discount_end_time: null,
				},
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName]
					.validate()
					.then(() => {
						console.log("values", this.saleForm.specification);
					})
					.catch((error) => {
						console.log("error", error);
					});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			removeDomain(item) {
				let index = this.saleForm.specification.indexOf(item);
				if (index !== -1) {
					this.saleForm.specification.splice(index, 1);
				}
			},
			addDomain() {
				this.saleForm.specification.push({
					value: "",
					key: Date.now(),
				});
			},
		},
	})
	export default class Home extends Vue {}
</script>
