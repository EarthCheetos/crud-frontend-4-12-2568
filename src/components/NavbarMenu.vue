<template>
    <nav class="navbar">
        <div class="left">My App</div>

        <div class="right">
            <div class="dropdown">
                <button class="profile-btn" @click="toggle">
                    <img :src="user.img_user || defaultPic" class="avatar" />
                    <span>{{ user.username }}</span> ▼
                </button>
                <div class="menu" v-if="open">
                    <router-link to="/edit-profile">Edit Profile</router-link>
                    <a @click="logout">Logout</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user")) || {},
            open: false,
            defaultPic: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        };
    },

    mounted() {
        window.addEventListener("storage", this.syncUser);
    },

    beforeUnmount() {
        window.removeEventListener("storage", this.syncUser);
    },

    methods: {
        toggle() {
            this.open = !this.open;
        },

        syncUser() {
            const updated = JSON.parse(localStorage.getItem("user"));
            if (updated) this.user = updated;
        },

        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.push("/");
        },
    },
};
</script>


<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #222;
    color: white;
}

.profile-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.dropdown {
    position: relative;
}

.menu {
    position: absolute;
    right: 0;
    background: white;
    padding: 10px;
    color: black;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

.menu a {
    cursor: pointer;
    margin: 5px 0;
}
</style>