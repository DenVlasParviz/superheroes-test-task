import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import HeroDetail from '../components/HeroDetail.vue';
import Home from "../components/Home.vue";
import EditHero from "../components/EditHero.vue";
import AddHero from "../components/AddHero.vue";


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/:nickname', name: 'HeroDetail', component: HeroDetail, props: true },
    {path: '/:nickname/edit',name: 'EditHero',component: EditHero, props: true },
    {path:`/addHero`,name: 'AddHero',component: AddHero, props: false },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
