<!-- components/Sidebar.vue -->

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    :style="{ 'min-height': '100%' }"
  >
    <v-list dense nav>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn icon @click.stop="toggleRail">
            <v-icon>{{
              rail ? "mdi-chevron-left" : "mdi-chevron-right"
            }}</v-icon>
          </v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Menu items -->
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="navigate(item.route)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      drawer: true,
      rail: true,
      menuItems: [
        { title: "Home", icon: "mdi-home-city", route: "/" },
        {
          title: "Transfer Antar Bank",
          icon: "mdi-bank",
          route: "/transfer/antar-bank",
        },
        {
          title: "Transfer Sesama",
          icon: "mdi-account-arrow-right",
          route: "/transfer/sesama",
        },
        {
          title: "History",
          icon: "mdi-account-group-outline",
          route: "/history",
        },
      ],
    });

    const toggleRail = () => {
      state.rail = !state.rail;
    };

    const navigate = (route) => {
      router.push(route);
    };

    return {
      ...state,
      toggleRail,
      navigate,
    };
  },
};
</script>

<style scoped>
/* Gaya kustom Anda di sini */
</style>
