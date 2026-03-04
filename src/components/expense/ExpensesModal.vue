<script setup lang="ts">
interface Expense {
    id: string;
    date: string;
    name: string;
    price: string;
}

const props = defineProps<{
    selectedYear: number;
    selectedMonth: number;
    expenses: Expense[];
}>();

const emit = defineEmits<{
    close: [];
}>();

const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString() + '원';
};
</script>

<template>
    <div class="modal-overlay" @click="emit('close')">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>{{ props.selectedYear }}년 {{ props.selectedMonth }}월 지출 내역</h2>
                <button @click="emit('close')" class="close-btn">✕</button>
            </div>
            <div class="modal-body">
                <div v-for="expense in expenses" :key="expense.id" class="expense-item">
                    <span class="expense-date">{{ expense.date }}</span>
                    <span class="expense-item-name">{{ expense.name }}</span>
                    <span class="expense-amount">{{ formatPrice(expense.price) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.close-btn:hover {
    background: #f0f0f0;
    color: #333;
}

.modal-body {
    padding: 20px;
    overflow-y: auto;
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
