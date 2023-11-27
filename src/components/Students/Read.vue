<template>
    <div v-if="student" class="student-details">
        <h2 class="student-title">{{ student.name }}</h2>
        <p class="student-birthdate">{{ student.birthdate }}</p>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    name: 'StudentDetails',
    data() {
        return {
            student: null
        };
    },

    async mounted() {
        const studentId = this.$route.params.id

        try {
            const response = await axios.get(`/students/${studentId}`);

            this.student = response.data.data
        } catch (error) {
            console.error("an error occured", error)
        }
    },
}
</script>

<style>
    .student-details {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    .student-title {
        margin-bottom: 20px;
        font-size: 2em;
    }

    .student-birthdate {
        margin-bottom: 20px;
        font-size: 1.2em;
    }
</style>