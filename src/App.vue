<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="logo-link">
        <img src="/logo-em.png" alt="Eva Muñoz Logo" class="logo-img" />
      </router-link>

      <div class="nav-right">
        <router-link to="/" class="nav-link">Inicio</router-link>

        <button class="nav-link-button" @click="goToElos">
          ELOS
        </button>

        <button v-if="isAuthenticated" @click="logout" class="logout-btn">
          Cerrar sesión
        </button>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { authStore } from "./authStore";
import { useRouter } from "vue-router";

const isAuthenticated = ref(false);
const router = useRouter();

const goToElos = () => {
  if (isAuthenticated.value) {
    router.push("/elos");
  } else {
    router.push("/login");
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    authStore.user = null;
    isAuthenticated.value = false;
    router.push("/login");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
    authStore.user = user;
  });
});
</script>

<style scoped>
#app {
  width: 100%;
}

.navbar {
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 34px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(104, 105, 104, 0.08);
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-img {
  height: 34px;
  width: auto;
  display: block;
  opacity: 0.96;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.logo-link:hover .logo-img {
  opacity: 1;
  transform: translateY(-1px);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-link,
.nav-link-button,
.logout-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #686968;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.25s ease, opacity 0.25s ease;
}

.nav-link:hover,
.nav-link-button:hover,
.logout-btn:hover {
  color: #b9a09c;
}

.nav-link::after,
.nav-link-button::after,
.logout-btn::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 0;
  height: 1.5px;
  background: #b9a09c;
  transition: width 0.25s ease;
}

.nav-link:hover::after,
.nav-link-button:hover::after,
.logout-btn:hover::after {
  width: 100%;
}
</style>