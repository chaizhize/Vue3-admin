<!--
 * @Author: your name
 * @Date: 2020-11-30 19:01:43
 * @LastEditTime: 2020-12-02 10:27:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/views/layout/components/content.vue
-->

<!--  -->
<template>
	<a-layout-content
		class="layoutContent"
		:style="{
			margin: '24px 16px',
			padding: '24px',
			background: '#fff',
			minHeight: '280px',
		}"
	>
		<router-view></router-view>
	</a-layout-content>
</template>

<script lang="ts">
	export default {
		components: {},
		data() {
			return {};
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
	.layoutContent{
		overflow-y: auto;
	}
</style>
