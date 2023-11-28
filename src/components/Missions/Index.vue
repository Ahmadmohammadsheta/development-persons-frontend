<template>
    <div class="mission-list">
        <router-link to="/add-mission" class="nav-link"> Add Mission </router-link>
        <ul>
            <li class="mission-item" v-for="mission in missions" :key="mission.id">
                <span class="mission-name">{{ mission.name }}</span>
                <div class="action-list">
                    <router-link class="edit-link" :to="{name: 'UpdateMission', params: {id: mission.id}}">Edit</router-link>
                    <router-link class="details-link" :to="{name: 'MissionDetails', params: {id: mission.id}}">Read</router-link>
                    <button class="delete-button" @click="deleteMission(mission.id)">delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from '@/axios';
    export default {
        name: 'MissionsList',
        data() {
            return {
                missions: []
            }
        },
        methods: {
            async deleteMission(id) {
                try {
                    await axios.delete(`/missions/${id}`);

                    this.missions = this.missions.filter(mission => mission.id !== id);
                } catch (error) {
                    console.error("An error occured", error);
                }
            }
        }, 

        async created() {
            try {
                const response = await axios.get('/missions');
            console.log(response.data)

                this.missions = response.data.data;
            } catch (error) {
                console.error("An error occured", error);
            }
        }
    }
</script>


<style>
    .mission-list {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    .mission-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin: 8px 0;
        border-bottom: 1px solid #ddd;
    }

    .mission-name {
        font-weight: bold;
        font-size: 1.1em;
    }

    .action-links {
        display: flex;
        align-items: center;
    }

    .edit-link .details-link .delete-button {
        margin: 0 8px;
        font-size: 8.9em;
    }

    .edit-link {
        padding: 5px;
        background-color: #3639f4;
        color: #fff;
        border: none;
        border-radius: 4px;
    }

    .details-link {
        padding: 5px;
        background-color: #62626b;
        color: #fff;
        border: none;
        border-radius: 4px;
    }

    .delete-button {
        padding: 6px 10px;
        background-color: #f44336;
        color: #fff;
        border: none;
        border-radius: 4px;
    }

    .delete-button:hover {
        background-color: #fa6358;
        cursor: pointer;
    }

    .nav-link {
    padding: 3px;
    margin: 3px;
    color: #42b983;
    }

</style>