<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import ExpenseForm from './components/expense/ExpenseForm.vue';
import IncomeForm from './components/income/IncomeForm.vue';

const authStore = useAuthStore();
const currentView = ref<'login' | 'home' | 'expenseForm' | 'incomeForm'>('login');

onMounted(async () => {
    const user = await authStore.fetchUser();
    if (user) {
        currentView.value = 'home';
    }
});

const handleLogin = () => {
    currentView.value = 'home';
};

const handleLogout = async () => {
    await authStore.logout();
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
            :user="authStore.user"
            @logout="handleLogout"
            @start-expense="startExpenseEntry"
            @start-income="startIncomeEntry"
        />
        <ExpenseForm
            v-if="currentView === 'expenseForm'"
            :user="authStore.user"
            @complete="handleFormComplete"
            @cancel="handleFormCancel"
        />
        <IncomeForm
            v-if="currentView === 'incomeForm'"
            :user="authStore.user"
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
