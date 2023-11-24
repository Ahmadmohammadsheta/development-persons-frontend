<template>
    <h1> Register </h1>
    <div class="form-container">
        <form @submit.prevent="register" class="register-form">
            <input type="name" v-model="name" placeholder="Name" required />
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit"> Register </button>
            <router-link to="/login">Login</router-link>
        </form>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    name: 'RegisterPage',
    data() {
        return {
            name: "",
            email: "",
            password: "",
        }
    },
    methods: {
        async register () {
            try {
                const response = await axios.post("/register" , {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });

                if (response.data.data.tokenn) {
                    localStorage.setItem('token', response.data.data.token);
                }

                this.$store.commit('LOGIN');
                this.$router.push('/');

            } catch (error) {
                console.error('error: ' , error);
                if (error.response) {
                    console.error('Error Details: ' , error.response.data.data);
                    
                }
            }
        }
    }
}
</script>
<style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  }

  .register-form input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .register-form button {
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    height: 30px;
    font-size: 16px;
  }
</style>