import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",

      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/transfer/sesama",
      name: "TransferSesama",
      component: () => import("../views/TfSesamaBank.vue"),
    },
    {
      path: "/transfer/antarbank",
      name: "TransferAntarBank",
      component: () => import("../views/TfAntarBank.vue"),
    },
    {
      path: "/history",
      name: "History",
      component: () => import("../views/HistoryView.vue"),
    },
  ],
});

export default router;
