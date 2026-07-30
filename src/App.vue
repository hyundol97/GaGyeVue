<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import { useAuthStore } from './stores/auth';

import Login from './components/Login.vue';
import Home from './components/Home.vue';
import ExpenseForm from './components/expense/ExpenseForm.vue';
import IncomeForm from './components/income/IncomeForm.vue';
import ToastNotification from './components/ToastNotification.vue';

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

const toastRef = ref<InstanceType<typeof ToastNotification> | null>(null);
const showToast = (message: string, type: 'success' | 'error' = 'success', countdown?: number) => {
    toastRef.value?.show(message, type, countdown);
};
provide('showToast', showToast);

const handleFormComplete = (data: any) => {
    console.log('Expense saved:', data);
    showToast('입력 완료! 3초 후 홈으로 이동합니다.', 'success', 3);
    setTimeout(() => {
        currentView.value = 'home';
    }, 3000);
};

const handleFormCancel = () => {
    currentView.value = 'home';
};
</script>

<template>
    <div id="app">
        <ToastNotification ref="toastRef" />
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
