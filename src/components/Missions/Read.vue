<template>
    <div v-if="mission" class="mission-details">
        <h2 class="mission-title">{{ mission.name }}</h2>
        <p class="mission-birthdate">{{ mission.birthdate }}</p>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    name: 'MissionDetails',
    data() {
        return {
            mission: null
        };
    },

    async mounted() {
        const missionId = this.$route.params.id

        try {
            const response = await axios.get(`/missions/${missionId}`);

            this.mission = response.data.data
        } catch (error) {
            console.error("an error occured", error)
        }
    },
}
</script>

<style>
    .mission-details {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    .mission-title {
        margin-bottom: 20px;
        font-size: 2em;
    }

    .mission-birthdate {
        margin-bottom: 20px;
        font-size: 1.2em;
    }
</style>