import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import LoginView from "@/views/login/LoginView.vue";
import Overview from "@/views/home/pages/Overview.vue";
import Device from "@/views/home/pages/Device.vue";
import System from "@/views/home/pages/System.vue";
import Report from "@/views/home/pages/Report.vue";
import BorrowAndGiveBack from "@/views/home/pages/BorrowAndGiveBack.vue";
import * as cns from "@/router/consts";

const routes = [
    {
        path: cns.HOME_PATH,
        name: cns.HOME_NAME,
        component: HomeView,
        children: [
            {path: cns.OVERVIEW_PATH, component: Overview, name: cns.OVERVIEW_NAME},
            {path: cns.DEVICE_PATH, component: Device, name: cns.DEVICE_NAME},
            {
                path: cns.BORROW_AND_GIVE_BACK_PATH,
                component: BorrowAndGiveBack,
                name: cns.BORROW_AND_GIVE_BACK_NAME,
            },
            {path: cns.REPORT_PATH, component: Report, name: cns.REPORT_NAME},
            {path: cns.SYSTEM_PATH, component: System, name: cns.SYSTEM_NAME},
        ],
    },
    {
        path: cns.LOGIN_PATH,
        name: cns.LOGIN_NAME,
        component: LoginView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
