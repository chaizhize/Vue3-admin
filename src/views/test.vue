<!--
 * @Author: your name
 * @Date: 2020-12-02 15:56:30
 * @LastEditTime: 2020-12-03 14:58:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/views/test.vue
-->
<template>
	<div>{{ name }}</div>
	<div>{{ age }}</div>
	<div>滚滚滚：{{ count }}</div>
	<div>啊啊啊：{{ newCount }}</div>
	<button @click="handleClick">按钮</button>

	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="date" label="日期" width="180">
		</el-table-column>
		<el-table-column prop="name" label="姓名" width="180">
		</el-table-column>
		<el-table-column prop="address" label="地址"> </el-table-column>
	</el-table>
</template>
<script>
	import {
		defineComponent,
		reactive,
		ref,
		unref,
		isRef,
		toRef,
		toRefs,
		shallowReactive,
		toRaw,
		markRaw,
		computed,
	} from "vue";
	export default defineComponent({
		name: "App",
		setup(props, context) {
			console.log(context, "fsdfsdfsd1111");
			const obj = {
				name: "zhangsan",
				children: {
					name: "lisi",
				},
				count: 1,
				tableData: [
					{
						date: "2016-05-02",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄",
					},
					{
						date: "2016-05-04",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1517 弄",
					},
					{
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1519 弄",
					},
					{
						date: "2016-05-03",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1516 弄",
					},
				],
			};
			const state = reactive(obj);
			console.log(JSON.stringify(state));
			const handleClick = () => {
				// state.name = "lisi";
				// age.value = 20;
				state.count++;
			};
			const newCount = computed({
				get: () => state.count,
				set: (val) => {
					// emit('state:count',val)
				},
			});

			// const age = ref(1);
			// const newAge = unref(age)
			// console.log(newAge)
			// 此处需要return出去，以提供外部templete模版使用
			return {
				...toRefs(state),
				// age,
				handleClick,
				newCount,
			};
		},
	});
</script>

<style lang="scss" scoped>
	//@import url(); 引入公共css类
</style>
