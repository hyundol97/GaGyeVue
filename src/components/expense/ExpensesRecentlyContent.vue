<script setup lang="ts">
import { ref } from 'vue';
import ExpensesModal from './ExpensesModal.vue';

const props = defineProps<{
    isLoading: boolean;
    monthlyExpenses: Expense[];
    selectedYear: number;
    selectedMonth: number;
}>();

interface Expense {
    id: string;
    date: string;
    name: string;
    price: string;
}

const showModal = ref(false);

const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString() + '원';
};

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};
</script>

<template>
    <div class="stat-card">
        <div class="header">
            <h3>최근 지출 내역</h3>
            <button v-if="props.monthlyExpenses.length > 3" @click="openModal" class="more-btn">
                더보기
            </button>
        </div>
        <div v-if="props.isLoading" class="loading-list">
            <div class="skeleton-item" v-for="i in 3" :key="i"></div>
        </div>
        <div v-else class="expense-list">
            <div
                v-for="expense in props.monthlyExpenses.slice(0, 3)"
                :key="expense.id"
                class="expense-item"
            >
                <span class="expense-date">{{ expense.date }}</span>
                <span class="expense-item-name">{{ expense.name }}</span>
                <span class="expense-amount">{{ formatPrice(expense.price) }}</span>
            </div>
        </div>
    </div>

    <ExpensesModal
        v-if="showModal"
        :expenses="props.monthlyExpenses"
        :selected-year="props.selectedYear"
        :selected-month="props.selectedMonth"
        @close="closeModal"
    />
</template>

<style scoped>
.stat-card {
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.stat-card h3 {
    color: #333;
    font-size: 16px;
    margin: 0;
    font-weight: 600;
}

.more-btn {
    padding: 6px 12px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.more-btn:hover {
    background: #5568d3;
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
