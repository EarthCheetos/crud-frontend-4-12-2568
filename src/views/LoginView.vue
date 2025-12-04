<template>
  <LoginComponent @login="handleLogin" />
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';
import api from '../services/api.js';
export default {
  components: { LoginComponent },
  methods: {
    async handleLogin(data) {
      try {
        const response = await api.post('/login', data);
        console.log('Login success:', response.data);
        alert(`Logged in as ${data.username}`);
      }catch (err){
        console.error(err.response ? err.response.data : err.message);
        alert('Login failed!');
      }
    }
  }
};
</script>
