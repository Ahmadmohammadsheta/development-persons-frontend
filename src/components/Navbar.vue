<template>
    <nav>
        <router-link to="/" class="home-link"> Home </router-link>
        <div class="router-links">
            <router-link to="/login" v-if="!isLoggedIn" class="nav-link"> Login </router-link>
            <router-link to="/register" v-if="!isLoggedIn" class="nav-link"> Register </router-link>
            <router-link to="/students" v-if="isLoggedIn" class="nav-link"> Students List </router-link>
            <router-link to="/missions" v-if="isLoggedIn" class="nav-link"> Missions List </router-link>
        </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  display: inline-block;
  padding: 3px;
  margin: 3px;
  color: #b94242;
}
.nav-link {
  padding: 3px;
  margin: 3px;
  color: #42b983;
}
.home-link {
  padding: 3px;
  margin: 3px;
  color: #424eb9;
}
</style>