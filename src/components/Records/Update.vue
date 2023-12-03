<template>
    <h1> Add Student </h1>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="edit-student-form">
            <input class="input-field" type="name" v-model="student.name" placeholder="Name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
            <input class="input-field" type="date" v-model="student.birthdate" placeholder="Birthdate" />
            <p v-if="errors.birthdate" class="error">{{ errors.birthdate }}</p>

            <button type="submit" class="submitButton"> Update Student </button>
        </form>
    </div>
</template>
<script>
import axios from '@/axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'UpdateStudent',
    setup() {
        const student = ref({id: null, name: '', birthdate: ''});
        const errors = ref({});

        const route = useRoute();
        student.value.id = route.params.id;

        const router = useRouter();
        
        const validateInputs = () => {
            const errors = {};
            if (!student.value.name) errors.name = 'Name is required';
            if (!student.value.birthdate) errors.birthdate = 'Birth date is required';
            return errors;
        };

        const submitForm = async () => {
            const errors = validateInputs();
            if (Object.keys(errors).length > 0) {
                errors.value = errors;
                return; // stop
            }        

            try {
                await axios.put(`/students/${student.value.id}`, student.value);

                router.push('/students');

            } catch (error) {
                console.error('An error occurred', error);
                if (error.response && error.response.status == 422) {
                    error.value = error.response.data.data.errors;
                }
            }
        };

        onMounted(async () => {
            try {
                const response = await axios.get(`/students/${student.value.id}`);
                student.value.name = response.data.data.name;
                student.value.birthdate = response.data.data.birthdate;

            } catch (error) {
                console.error('An error occurred', error); 
            }
        });

        return {student, submitForm, errors}
    }
}
</script>

<style scoped>

    .error {
        color: red;
    }

  .edit-student-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .edit-student-form input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 1rem;

    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .edit-student-form button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .edit-student-form button:hover {
    background-color: #29db2f;
  }

</style>