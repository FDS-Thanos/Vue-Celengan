<template>
  <div class="login-container">
    <div class="container-content">
      <div class="d-flex justify-center align-center">
        <div class="flex-column pr-14">
          <h1>BANK CENTRAL LAMONGAN</h1>
          <img src="@/assets/LamonganBank.png" alt="Bank Logo" width="200px" />
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex flex-column align-center">
            <div class="font-weight-bold">Get Started</div>
            <div>Already have an account? <span>Sign in</span></div>
          </div>
          <label for="Username">Username</label>
          <input
            v-model="data.username"
            type="text"
            class="input"
            placeholder="Username"
          />
          <label for="Password">Password</label>
          <input
            v-model="data.password"
            type="password"
            class="input"
            placeholder="Password"
          />
          <button @click="handleLogin" class="button">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const data = reactive({
  username: "",
  password: "",
});

const myAxios = inject("myAxios");

const handleLogin = async () => {
  try {
    const response = await myAxios.post("auth/logindb", {
      username: data.username,
      password: data.password,
    });

    if (response.status === 200) {
      auth.authenticated();
      router.replace("dashboard");
      window.alert("Login Berhasil");
    } else {
      throw new Error("Status respons tidak valid");
    }
  } catch (error) {
    console.error("Gagal login", error);
    const errorMessage =
      error.response && error.response.status === 401
        ? "Username atau Password salah"
        : "Gagal melakukan login";
    window.alert(errorMessage);
  }
};
</script>

<style scoped>
.container-content {
  background-color: #f5f5f5;
  border-radius: 16px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input {
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  width: 100%;
  height: 40px;
  background-color: #808080;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #336699;
}
</style>
