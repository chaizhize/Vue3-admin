<!--
 * @Author: your name
 * @Date: 2020-12-03 15:14:40
 * @LastEditTime: 2020-12-03 15:15:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/views/goodSku/childComp.vue
-->
<!--  -->
<template>
	<div class="">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
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
		},
		computed: {},
		watch: {},
		methods: {},
		created() {},
		mounted() {},
		beforeDestroy() {},
	};
</script>
<style lang="scss" scoped>
	//@import url(); 引入公共css类
</style>
