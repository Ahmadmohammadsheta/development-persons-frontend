<template>
    <div v-if="student" class="student-details">
        <h2 class="student-title">{{ student.name }}</h2>
        <p class="student-birthdate">{{ student.birthdate }}</p>
        <ul>
            <li class="student-item">
                <span class="title">{{ 'المهمة' }}</span>
                <span class="title">{{ 'النقاط' }}</span>
                <span class="title">{{ 'الامر' }}</span>
            </li>
        </ul>
        <ul>
            <li class="student-item" v-for="mission in student.records.missions" :key="mission.id">
                <span class="student-mission">{{ mission.mission }}</span>
                <span class="student-points">{{ mission.points }}</span>
                <div class="action-list">
                    <router-link class="details-link" :to="{name: 'MissionDetails', params: {id: mission.id}}">Read</router-link>
                </div>
            </li>
        </ul>
        <p class="student-today">{{ 'اجمالي نقاط اليوم : ' }} {{ student.records.total_of_today }}</p>
        <p class="student-total">{{ 'اجمالي النقاط : ' }} {{ student.records.total_records }}</p>
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
            console.log(this.student)
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
        font-size: 1.5em;
    }

    .student-today {
        margin-bottom: 20px;
        font-size: 1.5em;
        color: rgb(41, 175, 63);
    }

    .student-total {
        margin-bottom: 20px;
        font-size: 1.5em;
        color: crimson;
    }

    .student-mission, .student-points {
        text-align: center;
        font-size: 1.3em;
    }

    .title {
        color: brown;
        font-size: 1.7em;
    }
</style>