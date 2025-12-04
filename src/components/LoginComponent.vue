<template>
  <div class="login-box">
    <h2>login</h2>
    <form @submit.prevent="submitLogin">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <a @click="register" class="pointer">Don't have an account yet?</a>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "LoginComponent",
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    register(){
      this.$router.push('/register');
    },
    async submitLogin() {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const res = await axios.post(
          "http://192.168.10.49:3000/api/auth/login",
          {
            username: this.username,
            password: this.password,
          }
        );

        const user = res.data.profile;
        const token = res.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login success: " + user.username);

        this.$router.push("/user");
      } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        alert(
          err.response?.data?.message  || "Login failed"
        );
      }
    },
  },
};
</script>
<style scoped>
.pointer{
  cursor: pointer;
}
.login-box {
  width: 250px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>