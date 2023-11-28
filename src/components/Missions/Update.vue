<template>
    <h1> Update Mission </h1>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="edit-mission-form">
            <input class="input-field" type="name" v-model="mission.name" placeholder="Name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>

            <button type="submit" class="submitButton"> Update Mission </button>
        </form>
    </div>
</template>
<script>
import axios from '@/axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'UpdateMission',
    setup() {
        const mission = ref({id: null, name: '', birthdate: ''});
        const errors = ref({});

        const route = useRoute();
        mission.value.id = route.params.id;

        const router = useRouter();
        
        const validateInputs = () => {
            const errors = {};
            if (!mission.value.name) errors.name = 'Name is required';
            return errors;
        };

        const submitForm = async () => {
            const errors = validateInputs();
            if (Object.keys(errors).length > 0) {
                errors.value = errors;
                return; // stop
            }        

            try {
                await axios.put(`/missions/${mission.value.id}`, mission.value);

                router.push('/missions');

            } catch (error) {
                console.error('An error occurred', error);
                if (error.response && error.response.status == 422) {
                    error.value = error.response.data.data.errors;
                }
            }
        };

        onMounted(async () => {
            try {
                const response = await axios.get(`/missions/${mission.value.id}`);
                mission.value.name = response.data.data.name;

            } catch (error) {
                console.error('An error occurred', error); 
            }
        });

        return {mission, submitForm, errors}
    }
}
</script>

<style scoped>

    .error {
        color: red;
    }

  .edit-mission-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .edit-mission-form input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 1rem;

    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .edit-mission-form button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .edit-mission-form button:hover {
    background-color: #29db2f;
  }

</style>