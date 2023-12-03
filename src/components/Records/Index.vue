<template>
    <div class="record-list">
        <router-link to="/add-record" class="nav-link"> Add Record </router-link>
        <ul>
            <li class="record-item">
                <span class="record-name">{{ 'الاسم' }}</span>
                <span class="record-name">{{ 'مهمات اليوم' }}</span>
                <span class="record-name">{{ 'النقاط' }}</span>
                <span class="record-name">{{ 'الامر' }}</span>
            </li>
        </ul>
        <ul>
            <li class="record-item" v-for="record in records" :key="record.id">
                <span class="record-name">{{ record.student }}</span>
                <span class="record-name">{{ record.mission }}</span>
                <span class="record-name">{{ record.points }}</span>
                <div class="action-list">
                    <!-- <router-link class="edit-link" :to="{name: 'UpdateRecord', params: {id: record.id}}">Edit</router-link>
                    <router-link class="details-link" :to="{name: 'RecordDetails', params: {id: record.id}}">Read</router-link> -->
                    <button class="delete-button" @click="deleteRecord(record.id)">delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from '@/axios';
    export default {
        name: 'RecordsList',
        data() {
            return {
                records: []
            }
        },
        methods: {
            async deleteRecord(id) {
                try {
                    await axios.delete(`/records/${id}`);

                    this.records = this.records.filter(record => record.id !== id);
                } catch (error) {
                    console.error("An error occured", error);
                }
            }
        }, 

        async created() {
            try {
                const response = await axios.get('/records');
                console.log(response.data)

                this.records = response.data.data;
            } catch (error) {
                console.error("An error occured", error);
            }
        }
    }
</script>

<style>
    .record-list {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    .record-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin: 8px 0;
        border-bottom: 1px solid #ddd;
    }

    .record-name {
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