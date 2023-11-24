<template>
    <nav>
        <router-link to="/login" v-if="!isLoggedIn"> Login </router-link>
        <router-link to="/register" v-if="!isLoggedIn"> Register </router-link>
        <router-link to="/add-student" v-if="isLoggedIn"> Add Student </router-link>
        <router-link to="/students" v-if="isLoggedIn"> Students List </router-link>
        <a href="#" @click="logout" v-if="isLoggedIn"> Logout </a>
    </nav>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "NavbarPage",
    computed: {
        ...mapState(['isLoggedIn'])
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>