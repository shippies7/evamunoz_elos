import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ElosHome from "../views/elos/ElosHome.vue";
import Vivo from "../views/Vivo.vue";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/elos",
    component: ElosHome,
    meta: { requiresAuth: true }
  },
  {
    path: "/vivo",
    component: Vivo,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;