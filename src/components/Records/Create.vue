<template>
    <h1> Add New Record </h1>
    <div class="form-container">
        <form @submit.prevent="submitForm" class="add-student-form">
            <h3 class="error">{{ error }}</h3>
            <select class="input-field" v-model="student_id">
                <option :value="student.id" v-for="student in students" :key="student.id">{{ student.name }}</option>
            </select>

            <select class="input-field" v-model="mission_id">
                <option :value="mission.id" v-for="mission in missions" :key="mission.id">{{ mission.name }}</option>
            </select> 

            <button type="submit" class="submitButton"> Add New Record </button>
        </form>
    </div>
</template>
<script>
import axios from '@/axios';

export default {
    name: 'CreateRecord',
    data() {
        return {
            students: [],
            student_id: "",
            mission_id: "",
            points: "",
            error: ""
        }
    },
    methods: {
        async submitForm() {
            try {
                await axios.post("records", {
                    student_id: this.student_id,
                    mission_id: this.mission_id
                });

                this.$router.push('/records');

            } catch (error) {
                this.error = error.response.data.message
                console.error('An error occurred', error.response.data.message);
            }
        },
    },
    async created() {
        try {
            const response = await axios.get('/students');
            const response2 = await axios.get('/missions');
            this.students = response.data.data;
            this.missions = response2.data.data;
        } catch (error) {
            console.error("An error occured", error);
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

  .add-student-form select {
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