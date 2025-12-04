<template>
    <div class="register-box">
        <h2>Register</h2>
        <form @submit.prevent="submitRegister">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="text" v-model="password" placeholder="Password" required />
            <button type="submit">Register</button>
            <a @click="login" class="pointer mt-3">Already have an account?</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "RegisterComponent",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login(){
            this.$router.push('/')
        },
        async submitRegister() {
            try {
                const res = await axios.post(
                    "http://192.168.10.49:3000/api/auth/register",
                    {
                        username: this.username,
                        password: this.password,
                    }
                );
                console.log("Register success", res.data);
                alert(res.data.message);

                this.$router.push("/");
            } catch (err) {
                console.error("Register error:", err.response?.data || err.message);

                alert(
                    err.response?.data?.message  || "Register failed"
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
.register-box {
    width: 250px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>