import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: [
			{
				path: '/',
				redirect: 'movie',
			},
			{
				path: 'movie',
				name: 'Movie',
				component: () => import('../components/Movie'),
				children: [
					{
						path: '/',
						redirect: 'hot',
					},

					{
						path: 'hot',
						name: 'Hot',
						component: () => import('../components/Hot'),
					},
					{
						path: 'comingSoon',
						name: 'ComingSoon',
						component: () => import('../components/ComingSoon'),
					},
					,
					{
						path: 'search',
						name: 'Search',
						component: () => import('../components/Search'),
					},
				],
			},
			{
				path: 'cinema',
				name: 'Cinema',
				component: () => import('../components/Cinema'),
			},
			{
				path: 'my',
				name: 'My',
				component: () => import('../components/My'),
			},
		],
	},
	{
		path: 'city',
		name: 'City',
		component: () => import('../components/City'),
	},
];
const router = new VueRouter({
	mode: 'history',
	routes,
});
export default router;
