import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import UserPage from "@/components/UserPage.vue";
import EditProfile from "@/components/EditProfile.vue";

const routes = [
    { path: "/",component: LoginComponent },
    { path: "/register", component: RegisterComponent},
    { path: "/user", component: UserPage, meta: {requiresAuth: true} },
    { path: "/edit-profile", name: "editProfile", component: EditProfile, meta: {requiresAuth: true }},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next)=> {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth && !token){
        next("/");
    }else{
        next();
    }
});

export default router;