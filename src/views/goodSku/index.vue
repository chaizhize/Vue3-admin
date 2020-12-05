<!--  -->
<template>
	<div class="">
		<el-form
			:model="numberValidateForm"
			ref="numberValidateFormRef"
			label-width="100px"
			class="demo-ruleForm"
			:rules="rules"
		>
			<el-form-item label="年龄" prop="age">
				<el-input
					type="age"
					v-model.number="numberValidateForm.age"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="submitForm('numberValidateForm')"
					>提交</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { defineComponent, reactive, toRefs, ref } from "vue";
	var checkAge = (rule, value, callback) => {
        let flag = true;
        console.log(value,'sss');
		// value.forEach((item) => {
		// 	flag = item.value.every((item) => item.goods_price);
		// });
		if (true) {
			return callback(new Error("请填写333333价格"));
		} else {
			callback();
		}
	};
	export default defineComponent({
		setup() {
			const numberValidateFormRef = ref(null);
			const state = reactive({
				numberValidateForm: {
					age: "",
				},
				rules: {
					age: [
						{
							validator: checkAge,
							trigger: "blur",
						},
					],
				},
			});
			const submitForm = (formName) => {
				numberValidateFormRef.value.validate((valid) => {
					if (valid) {
						alert("submit!");
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			};
			return {
				...toRefs(state),
				numberValidateFormRef,
				// rules,
				submitForm,
			};
		},
	});
</script>
<style lang="scss" scoped>
	//@import url(); 引入公共css类
</style>
