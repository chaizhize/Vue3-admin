<!--
 * @Author: your name
 * @Date: 2020-11-30 19:00:37
 * @LastEditTime: 2020-12-04 17:13:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/views/layout/components/header.vue
-->
<!--  -->
<template>
	<a-layout-header style="background: #fff; padding-left: 20px">
		<menu-unfold-outlined
			v-if="collapsed"
			class="trigger"
			@click="() => (collapsed = !collapsed)"
		/>
		<menu-fold-outlined
			v-else
			class="trigger"
			@click="() => (collapsed = !collapsed)"
		/>

	</a-layout-header>
</template>

<script lang="ts">
	import {
		MenuUnfoldOutlined,
		MenuFoldOutlined,
	} from "@ant-design/icons-vue";
	import {
		defineComponent,
		reactive,
		toRefs,
		computed,
		watchEffect,
		ref,
		watch,
	} from "vue";
	export default defineComponent({
		components: {
			MenuUnfoldOutlined,
			MenuFoldOutlined,
		},
		props: {
			collapsed: Boolean,
			count: Number,
		},
		setup(props, { emit }) {
			const state = reactive({
				collapsed: false,
			});
			const count = computed(() => props.count);

			watch(
				[() => state.collapsed,() => count],
				(newVal, oldVal) => {
				}
			);
			watchEffect((newVal) => {
				emit("isCollapsed", state.collapsed);
			});
			watchEffect((onInvalidate) => {
				emit("state.count", count);
			});
			// const increment = () => {
			// 	collapsed.value = !collapsed.value;
			// };
			return {
				...toRefs(state),
				count,
				// increment
			};
		},
	});
</script>
<style lang="scss" scoped>
	//@import url(); 引入公共css类
</style>
