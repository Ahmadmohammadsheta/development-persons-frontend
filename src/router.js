import { createRouter, createWebHistory } from "vue-router";

import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import AddStudent from './components/Students/Create.vue';
import StudentsList from './components/Students/Index.vue';
import UpdateStudent from './components/Students/Update.vue';
import StudentDetails from './components/Students/Read.vue';

import AddMissions from './components/Missions/Create.vue';
import MissionsList from './components/Missions/Index.vue';
import UpdateMission from './components/Missions/Update.vue';
import MissionDetails from './components/Missions/Read.vue';

import AddRecords from './components/Records/Create.vue';
import RecordsList from './components/Records/Index.vue';
import UpdateRecord from './components/Records/Update.vue';
import RecordDetails from './components/Records/Read.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta : {public: true} // Mark this route as public
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta : {public: true} // Mark this route as public
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta : {public: true} // Mark this route as public
    },
    {
        path: '/add-student',
        name: 'AddStudent',
        component: AddStudent,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/students',
        name: 'StudentsList',
        component: StudentsList,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/edit-student/:id',
        name: 'UpdateStudent',
        component: UpdateStudent,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/student/:id',
        name: 'StudentDetails',
        component: StudentDetails,
        meta : {public: false} // Mark this route as private
    },


    {
        path: '/add-mission',
        name: 'AddMissions',
        component: AddMissions,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/missions',
        name: 'MissionsList',
        component: MissionsList,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/edit-mission/:id',
        name: 'UpdateMission',
        component: UpdateMission,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/mission/:id',
        name: 'MissionDetails',
        component: MissionDetails,
        meta : {public: false} // Mark this route as private
    },

    
    {
        path: '/add-record',
        name: 'AddRecords',
        component: AddRecords,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/records',
        name: 'recordsList',
        component: RecordsList,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/edit-record/:id',
        name: 'Updaterecord',
        component: UpdateRecord,
        meta : {public: false} // Mark this route as private
    },
    {
        path: '/record/:id',
        name: 'recordDetails',
        component: RecordDetails,
        meta : {public: false} // Mark this route as private
    },
];
    

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!to.meta.public && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;