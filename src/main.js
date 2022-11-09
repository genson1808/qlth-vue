import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import "./assets/css/reset.css";
import "./assets/css/main.css";
import store from "@/store";

createApp(App).use(router).use(store).mount("#app");
