<!--
 * @Author: your name
 * @Date: 2020-11-30 18:59:54
 * @LastEditTime: 2020-11-30 19:30:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/views/layout/components/sider.vue
-->
<template>

</template>

<script>
	import {
		UserOutlined,
		VideoCameraOutlined,
		UploadOutlined,
	} from "@ant-design/icons-vue";
	import { defineComponent, reactive, toRefs } from "vue";

	export default defineComponent({
		components: {
			UserOutlined,
			VideoCameraOutlined,
			UploadOutlined,
		},
		// props: ["collapsed"],
		setup() {
			// const state = reactive({
			// 	selectedKeys: ["1322"],
			// });
			// return {
			// 	...toRefs(state),
			// };
		},
	});
</script>
<style lang="scss" scoped>
	//@import url(); 引入公共css类
</style>
