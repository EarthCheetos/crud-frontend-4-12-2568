<template>
  <RegisterComponent @register="handleRegister" />
</template>

<script>
import RegisterComponent from '../components/RegisterComponent.vue';
import api from '../services/api.js';

export default {
  components: { RegisterComponent },
  methods: {
    async handleRegister(data) {
      try {
        const response = await api.post('/register', data);
        console.log('Register success:', response.data);
        alert(`Registered as ${data.username}`);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        alert('Registration failed!');
      }
    }
  }
};
</script>