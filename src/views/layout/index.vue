<!--
 * @Author: your name
	* @Date: 2020-11-30 17: 18: 28
 * @LastEditTime: 2020-12-03 15:07:26
 * @LastEditors: Please set LastEditors
				* @Description: In User Settings Edit
					* @FilePath: /vue-goodsku/src / views / layout / index.vue
-->
<template>
	<a-layout id="components-layout-demo-custom-trigger">
		<a-layout-sider
			v-model:collapsed="collapsed"
			:trigger="null"
			collapsible
		>
			<div @click="addCount" class="logo">3232</div>
			<a-menu
				theme="dark"
				mode="inline"
				v-model:selectedKeys="selectedKeys"
				v-for="route in routerList"
				:key="route.name"
			>
				<a-menu-item
					@click="$router.push({ path: route.path })"
					:key="route.path"
				>
					<user-outlined />
					<span>{{ route.meta.title }}</span>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<layoutHeader
				:count="count"
				:collapsed="collapsed"
				@isCollapsed="isCollapsed"
			/>

			<layoutContent />
		</a-layout>
	</a-layout>
</template>
<script lang="ts">
	import layoutContent from "./components/content.vue";
	import layoutHeader from "./components/header.vue";
	// import layoutSider from "./components/sider";
	import {
		UserOutlined,
		VideoCameraOutlined,
		UploadOutlined,
	} from "@ant-design/icons-vue";
	import { defineComponent, reactive, toRefs, ref, computed } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useStore} from "vuex";
	export default defineComponent({
		components: {
			UserOutlined,
			VideoCameraOutlined,
			UploadOutlined,
			layoutContent,
			layoutHeader,
			// layoutSider,
		},
		setup(props, { attrs, emit, slots }) {
			const route = useRoute();
			const router = useRouter();
			const store = useStore();
			const state = reactive({
				collapsed: true,
				selectedKeys: [router.options.history.state.current],
			});
			const isCollapsed = (payload: boolean) => {
				state.collapsed = payload;
			};
			const routerList = computed(() => {
				return router.options.routes.filter((item) => {
					return item.meta && item.meta.title;
				});
			});
			let count = ref(1);
			const addCount = () => {
				count.value++;
			};

			return {
				...toRefs(state),
				isCollapsed,
				routerList,
				count,
				addCount,
			};
		},
	});
</script>
<style scoped lang="scss">
	#components-layout-demo-custom-trigger {
		height: 100%;
	}
	#components-layout-demo-custom-trigger.trigger {
		font-size: 18px;
		line-height: 64px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;
	}
	#components-layout-demo-custom-trigger.trigger:hover {
		color: #1890ff;
	}
	#components-layout-demo-custom-trigger.logo {
		height: 32px;
		background: rgba(255, 255, 255, 0.2);
		margin: 16px;
	}
</style>
