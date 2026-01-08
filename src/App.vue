<script setup lang="ts">
import { ref } from 'vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import ExpenseForm from './components/expense/ExpenseForm.vue';
import IncomeForm from './components/income/IncomeForm.vue';

const currentView = ref<'login' | 'home' | 'expenseForm' | 'incomeForm'>('login');
const currentUser = ref('');

const handleLogin = (userMail: string) => {
    currentUser.value = userMail;
    currentView.value = 'home';
};

const handleLogout = () => {
    currentUser.value = '';
    currentView.value = 'login';
};

const startExpenseEntry = () => {
    currentView.value = 'expenseForm';
};

const startIncomeEntry = () => {
    currentView.value = 'incomeForm';
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
            :userMail="currentUser"
            @logout="handleLogout"
            @start-expense="startExpenseEntry"
            @start-income="startIncomeEntry"
        />
        <ExpenseForm
            v-if="currentView === 'expenseForm'"
            @complete="handleFormComplete"
            @cancel="handleFormCancel"
        />
        <IncomeForm
            v-if="currentView === 'incomeForm'"
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
