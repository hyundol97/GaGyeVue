<script setup lang="ts">
import { ref } from 'vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import ExpenseForm from './components/ExpenseForm.vue';

const currentView = ref<'login' | 'home' | 'form'>('login');
const currentUser = ref('');

const handleLogin = (username: string) => {
    currentUser.value = username;
    currentView.value = 'home';
};

const handleLogout = () => {
    currentUser.value = '';
    currentView.value = 'login';
};

const startExpenseEntry = () => {
    currentView.value = 'form';
};

const handleFormComplete = (data: any) => {
    console.log('Expense saved:', data);
    alert('가계부 입력이 완료되었습니다!');
    currentView.value = 'home';
};

const handleFormCancel = () => {
    currentView.value = 'home';
};
</script>

<template>
    <div id="app">
        <Login v-if="currentView === 'login'" @login="handleLogin" />
        <Home
            v-if="currentView === 'home'"
            :username="currentUser"
            @logout="handleLogout"
            @start-entry="startExpenseEntry"
        />
        <ExpenseForm
            v-if="currentView === 'form'"
            @complete="handleFormComplete"
            @cancel="handleFormCancel"
        />
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

#app {
    width: 100%;
    min-height: 100vh;
}
</style>
