<template>
    <h1> Add Mission </h1>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="add-mission-form">
            <input class="input-field" type="name" v-model="name" placeholder="Name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>

            <button type="submit" class="submitButton"> Add New Mission </button>
        </form>
    </div>
</template>
<script>
import axios from '@/axios';

export default {
    name: 'CreateMission',
    data() {
        return {
            name: "",
            errors: {}
        }
    },
    methods: {
        validateInputs() {
            const errors = {};
            if (!this.name) errors.name = 'Name is required';
            return errors;
        },
        async submitForm() {
            const errors = this.validateInputs();
            if (Object.keys(errors).length > 0) {
                this.errors = errors;
                return; // stop
            }

            try {
                await axios.post("missions", {
                    name: this.name,
                });

                this.$router.push('/missions');

            } catch (error) {
                console.error('An error occurred', error);
            }
        }
    }
}
</script>

<style scoped>

    .error {
        color: red;
    }

  .add-mission-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .add-mission-form input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 1rem;

    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .add-mission-form button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .add-mission-form button:hover {
    background-color: #29db2f;
  }

</style>