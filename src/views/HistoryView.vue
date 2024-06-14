<template>
  <v-card>
    <v-layout>
      <!-- Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        :style="{ 'min-height': '100%' }"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn icon @click.stop="rail = !rail">
              <v-icon>{{
                rail ? "mdi-chevron-left" : "mdi-chevron-right"
              }}</v-icon>
            </v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Menu Transfer dengan Dropdown -->
        <v-list dense nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
            v-on:click="navigateTo('/dashboard')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="Transfer"
            value="account"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Transfer</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item-group dense>
              <v-list-item
                prepend-icon="mdi-account-group-outline"
                title="Transfer Inbound"
                value="history"
                v-on:click="navigateTo('/transfer/sesama')"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-account-group-outline"
                title="Transfer Outbound"
                value="history"
                v-on:click="navigateTo('/transfer/antarbank')"
              ></v-list-item>
            </v-list-item-group>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="History"
            value="history"
            v-on:click="navigateTo('/history')"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12"></v-col>
          </v-row>
          <v-row>
            <v-col>
              <FormHistory></FormHistory>
              <!-- Tempatkan tampilan lain di sini jika diperlukan -->
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import FormInputPengguna from "../components/FormInputPengguna.vue";
import UserProfile from "../components/UserProfile.vue";
import { useRouter } from "vue-router";
import FormHistory from "../components/FormHistory.vue";

export default {
  setup() {
    const router = useRouter();

    const navigateTo = (route) => {
      router.push(route);
    };

    return {
      navigateTo,
    };
  },
  components: {
    FormInputPengguna,
    UserProfile,
    FormHistory,
  },
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  methods: {
    submitForm(data) {
      // Lakukan logika untuk mengirim data atau menyimpan data yang diinputkan
      console.log("Data yang diinputkan:", data);
      // Contoh: Kirim data menggunakan API atau menyimpan ke database
    },
    navigate(route) {
      // Navigasi menggunakan router jika diperlukan
      console.log("Navigasi ke:", route);
    },
  },
};
</script>

<style scoped>
/* Gaya kustom Anda di sini */
</style>
