import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import Overview from "@/views/pages/Overview.vue";
import Device from "@/views/pages/Device.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      { path: "overview", component: Overview, name: "overview" },
      { path: "device", component: Device, name: "device" },
      { path: "borrow-and-give-back", component: Device, name: "borrow-and-give-back" },
      { path: "report", component: Device, name: "report" },
      { path: "system", component: Device, name: "y" },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
