<script setup lang="ts">
import { ref, computed } from 'vue';

const today = new Date();

const props = defineProps<{
    userMail: string;
}>();

const emit = defineEmits<{
    logout: [];
    startEntry: [];
}>();

const annuallyTotalExpenses = ref([]);

const monthlyExpenses = ref([]);

const annuallyTotalExpense = computed(() =>
    String(annuallyTotalExpenses.value.reduce((sum, expense) => sum + Number(expense.price), 0))
);

const monthlyTotalExpense = computed(() =>
    String(monthlyExpenses.value.reduce((sum, expense) => sum + Number(expense.price), 0))
);

const formatPrice = (price: string) => {
    return price + '원';
};

const currentYear = computed(() => {
    return today.getFullYear();
});
</script>

<template>
    <div class="stats-section">
        <div class="stat-card total">
            <h3>이번 달 총 지출</h3>
            <p class="amount">{{ formatPrice(monthlyTotalExpense) }}</p>
        </div>

        <div class="stat-card">
            <h3>최근 지출 내역</h3>
            <div class="expense-list" v-if="monthlyExpenses">
                <div
                    v-for="expense in monthlyExpenses.slice(0, 3)"
                    :key="expense.date"
                    class="expense-item"
                >
                    <span class="expense-date">{{ expense.date }}</span>
                    <span class="expense-item-name">{{ expense.name }}</span>
                    <span class="expense-amount">{{ formatPrice(expense.price) }}</span>
                </div>
            </div>
        </div>

        <div class="stat-card total">
            <h3>{{ currentYear }} 누적 총 지출</h3>
            <p class="amount">{{ formatPrice(annuallyTotalExpense) }}</p>
        </div>
    </div>
</template>

<style scoped>
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
</style>
