import { createRouter, createWebHistory } from 'vue-router';
import HeroDetail from '../components/HeroDetail.vue';
import Home from "../components/Home.vue";
import EditHero from "../components/EditHero.vue";
import AddHero from "../components/AddHero.vue";


const routes = [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Home Page' } },
    { path: '/:nickname', name: 'HeroDetail', component: HeroDetail, props: true },
    {path: '/:nickname/edit',name: 'EditHero',component: EditHero, props: true,meta: { title: 'Edit' } },
    {path:`/addHero`,name: 'AddHero',component: AddHero, props: false, meta: { title: 'Add new' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router;
