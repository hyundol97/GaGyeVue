<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    isLoading: boolean;
    monthlyExpenses: Expense[];
}>();

interface Expense {
    id: string;
    date: string;
    name: string;
    price: string;
}

const monthlyExpenses = ref<Expense[]>([]);

const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString() + '원';
};
</script>

<template>
    <div class="stat-card">
        <h3>최근 지출 내역</h3>
        <div v-if="isLoading" class="loading-list">
            <div class="skeleton-item" v-for="i in 3" :key="i"></div>
        </div>
        <div v-else class="expense-list">
            <div
                v-for="expense in monthlyExpenses.slice(0, 3)"
                :key="expense.id"
                class="expense-item"
            >
                <span class="expense-date">{{ expense.date }}</span>
                <span class="expense-item-name">{{ expense.name }}</span>
                <span class="expense-amount">{{ formatPrice(expense.price) }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.stat-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
    color: #333;
    font-size: 16px;
    margin: 0 0 16px 0;
    font-weight: 600;
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

.loading-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.skeleton-item {
    height: 48px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 8px;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
