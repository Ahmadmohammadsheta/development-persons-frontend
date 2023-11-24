<template>
    <div class="student-list">
        <ul>
            <li class="student-item" v-for="student in students" :key="student.id">
                <span class="student-name">{{ student.name }}</span>
                <div class="action-list">
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

    .delete-button {
        padding: 5px 10px;
        background-color: #f44336;
        color: #fff;
        border: none;
        border-radius: 4px;
    }

    .delete-button:hover {
        background-color: #fa6358;
        cursor: pointer;
    }

</style>