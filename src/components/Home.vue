<script setup lang="ts">
import ExpensesDataContent from './expense/ExpensesDataContent.vue';

const props = defineProps<{
    userMail: string;
}>();

const emit = defineEmits<{
    logout: [];
    startExpense: [];
    startIncome: [];
}>();
</script>

<template>
    <div class="home-container">
        <div class="header">
            <h1 class="home-title">송현석님의 가계부</h1>
            <button @click="emit('logout')" class="logout-btn">로그아웃</button>
        </div>

        <button @click="emit('startExpense')" class="add-expense-btn">+ 새 지출 입력</button>

        <button @click="emit('startIncome')" class="add-income-btn">+ 새 수입 입력</button>

        <div class="content">
            <ExpensesDataContent :userMail="props.userMail" />
        </div>
    </div>
</template>

<style scoped>
.home-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.home-title {
    color: white;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.logout-btn {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
}

.logout-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.content {
    max-width: 800px;
    margin: 0 auto;
}

.add-expense-btn {
    width: 100%;
    padding: 20px;
    background: white;
    color: #667eea;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.add-expense-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.add-income-btn {
    width: 100%;
    padding: 20px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3);
    margin-bottom: 20px;
}

.add-income-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
    background: #45a049;
}
</style>
