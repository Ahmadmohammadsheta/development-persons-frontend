<template>
    <div class="student-list">
        <router-link to="/add-student" class="nav-link"> Add Student </router-link>
        <ul>
            <li class="student-item" v-for="student in students" :key="student.id">
                <span class="student-name">{{ student.name }}</span>
                <span class="student-name">{{ student.records.total_of_today }}</span>
                <div class="action-list">
                    <router-link class="edit-link" :to="{name: 'UpdateStudent', params: {id: student.id}}">Edit</router-link>
                    <router-link class="details-link" :to="{name: 'StudentDetails', params: {id: student.id}}">Read</router-link>
                    <button class="delete-button" @click="deleteStudent(student.id)">delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from '@/axios';
    export default {
        name: 'StudentsList',
        data() {
            return {
                students: []
            }
        },
        methods: {
            async deleteStudent(id) {
                try {
                    await axios.delete(`/students/${id}`);

                    this.students = this.students.filter(student => student.id !== id);
                } catch (error) {
                    console.error("An error occured", error);
                }
            }
        }, 

        async created() {
            try {
                const response = await axios.get('/students');
            console.log(response.data)

                this.students = response.data.data;
            } catch (error) {
                console.error("An error occured", error);
            }
        }
    }
</script>

<style>
    .student-list {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    .student-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin: 8px 0;
        border-bottom: 1px solid #ddd;
    }

    .student-name {
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