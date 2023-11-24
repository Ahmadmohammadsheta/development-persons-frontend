<template>
    <h1> Add Student </h1>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="add-student-form">
            <input class="input-field" type="name" v-model="name" placeholder="Name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
            <input class="input-field" type="date" v-model="birthdate" placeholder="Birthdate" />
            <p v-if="errors.birthdate" class="error">{{ errors.birthdate }}</p>

            <button type="submit" class="submitButton"> Add New Student </button>
        </form>
    </div>
</template>
<script>
import axios from '@/axios';

export default {
    name: 'CreateStudent',
    data() {
        return {
            name: "",
            birthdate: "",
            errors: {}
        }
    },
    methods: {
        validateInputs() {
            const errors = {};
            if (!this.name) errors.name = 'Name is required';
            if (!this.birthdate) errors.birthdate = 'Birth date is required';
            return errors;
        },
        async submitForm() {
            const errors = this.validateInputs();
            if (Object.keys(errors).length > 0) {
                this.errors = errors;
                return; // stop
            }

            try {
                await axios.post("students", {
                    name: this.name,
                    birthdate: this.birthdate
                });

                this.$router.push('/students');

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

  .add-student-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .add-student-form input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 1rem;

    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .add-student-form button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .add-student-form button:hover {
    background-color: #29db2f;
  }

</style>