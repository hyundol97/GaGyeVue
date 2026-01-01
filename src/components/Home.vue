<script setup lang="ts">
import { ref, computed } from 'vue';

const today = new Date();

const props = defineProps<{
    username: string;
}>();

const emit = defineEmits<{
    logout: [];
    startEntry: [];
}>();

const annuallyTotalExpenses = ref([
    { date: '2024-01-15', item: '점심식사', amount: '12000', category: 'food' },
    { date: '2024-01-14', item: '지하철', amount: '1500', category: 'transport' },
    { date: '2024-01-13', item: '커피', amount: '4500', category: 'food' },
    { date: '2024-01-15', item: '점심식사', amount: '12000', category: 'food' },
    { date: '2024-01-14', item: '지하철', amount: '1500', category: 'transport' },
    { date: '2024-01-13', item: '커피', amount: '4500', category: 'food' },
    { date: '2024-01-15', item: '점심식사', amount: '12000', category: 'food' },
    { date: '2024-01-14', item: '지하철', amount: '1500', category: 'transport' },
    { date: '2024-01-13', item: '커피', amount: '4500', category: 'food' },
]);

const monthlyExpenses = ref([
    { date: '2024-01-15', item: '점심식사', amount: '12000', category: 'food' },
    { date: '2024-01-14', item: '지하철', amount: '1500', category: 'transport' },
    { date: '2024-01-13', item: '커피', amount: '4500', category: 'food' },
]);

const annuallyTotalExpense = computed(() =>
    String(annuallyTotalExpenses.value.reduce((sum, expense) => sum + Number(expense.amount), 0))
);

const monthlyTotalExpense = computed(() =>
    String(monthlyExpenses.value.reduce((sum, expense) => sum + Number(expense.amount), 0))
);

const formatPrice = (price: string) => {
    return price + '원';
};

const currentYear = computed(() => {
    return today.getFullYear();
});
</script>

<template>
    <div class="home-container">
        <div class="header">
            <h1 class="home-title">{{ username }}님의 가계부</h1>
            <button @click="emit('logout')" class="logout-btn">로그아웃</button>
        </div>

        <div class="content">
            <div class="stats-section">
                <div class="stat-card total">
                    <h3>{{ currentYear }} 누적 총 지출</h3>
                    <p class="amount">{{ formatPrice(annuallyTotalExpense) }}</p>
                </div>

                <div class="stat-card total">
                    <h3>이번 달 총 지출</h3>
                    <p class="amount">{{ formatPrice(monthlyTotalExpense) }}</p>
                </div>

                <div class="stat-card">
                    <h3>최근 지출 내역</h3>
                    <div class="expense-list">
                        <div
                            v-for="expense in monthlyExpenses.slice(0, 3)"
                            :key="expense.date"
                            class="expense-item"
                        >
                            <span class="expense-date">{{ expense.date }}</span>
                            <span class="expense-item-name">{{ expense.item }}</span>
                            <span class="expense-amount">{{ formatPrice(expense.amount) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <button @click="emit('startEntry')" class="add-expense-btn">+ 새 지출 입력</button>
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

.stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.stat-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.stat-card.total {
    text-align: center;
}

.stat-card h3 {
    color: #333;
    font-size: 16px;
    margin: 0 0 16px 0;
    font-weight: 600;
}

.amount {
    font-size: 32px;
    font-weight: 700;
    color: #667eea;
    margin: 0;
}

.expense-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.expense-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
}

.expense-date {
    font-size: 12px;
    color: #666;
}

.expense-item-name {
    flex: 1;
    margin-left: 12px;
    font-weight: 500;
}

.expense-amount {
    font-weight: 600;
    color: #333;
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
}

.add-expense-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
</style>
