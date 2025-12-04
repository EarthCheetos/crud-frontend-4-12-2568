<template>
    <div>
        <NavbarMenu />
        <div style="padding: 20px;">
            <h2>Welcome, {{ user.username }}</h2>
            <h3>All Users</h3>
            <button @click="fetchUsers">Refresh</button>
            <table v-if="users.length" border="1" cellpadding="5" cellspacing="0"
                style="margin-top: 10px; width: 100%;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="u in users" :key="u.id_u">
                        <td>{{ u.id_u }}</td>
                        <td>{{ u.username }}</td>
                        <td>
                            <button @click="editUser(u)">Edit</button>
                            <button @click="deleteUser(u.id_u)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else>No users found.</p>
        </div>
    </div>
</template>
<script>
import NavbarMenu from './NavbarMenu.vue';
import axios from 'axios';
export default {
    components: { NavbarMenu },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user")),
            users: [],
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://192.168.10.49:3000/api/auth/data",
                    { headers: { jwt: token } }
                );
                this.users = res.data.data;
            } catch (err) {
                console.error("Fetch users error:", err.response?.data || err.message);
                alert("Failed to fetch users");
            }
        },

        editUser(user) {
            localStorage.setItem("editUser", JSON.stringify(user));
            this.$router.push({ name: "editProfile" });
        },
        async deleteUser(id) {  
            if (!confirm("Are you sure you want to delete this user?"))
                return;

            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                    `http://192.168.10.49:3000/api/auth/delete/${id}`,
                    { headers: { jwt: token } }
                );
                alert("User deleted successfully");
                this.fetchUsers();
            } catch (err) {
                console.error("Delete user error:", err.response?.data || err.message);
                alert("Failed to delete user");
            }
        },
    },
};
</script>
<style scoped>
h2 {
    margin-bottom: 20px;
}

h3 {
    margin-top: 30px;
}
    
table {
    border-collapse: collapse;
}

th {
    background-color: #42b983;
    color: white;
    text-align: center;
    padding: 8px;
}
</style>