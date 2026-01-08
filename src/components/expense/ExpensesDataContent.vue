<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../../lib/supabase';

import ExpensesRecentlyContent from './ExpensesRecentlyContent.vue';

const props = defineProps<{
    userMail: string;
}>();

const emit = defineEmits<{
    logout: [];
    startExpense: [];
}>();

const today = new Date();
const isLoading = ref(true);
const animatedMonthly = ref(0);
const animatedAnnually = ref(0);

interface Expense {
    id: string;
    date: string;
    name: string;
    price: string;
}

interface Income {
    id: string;
    date: string;
    name: string;
    price: string;
}

const annuallyTotalExpenses = ref<Expense[]>([]);
const monthlyExpenses = ref<Expense[]>([]);
const annuallyTotalIncomes = ref<Income[]>([]);
const monthlyIncomes = ref<Income[]>([]);

const currentYear = computed(() => {
    return today.getFullYear();
});

const currentMonth = computed(() => {
    return today.getMonth() + 1;
});

const annuallyTotalExpense = computed(() =>
    String(annuallyTotalExpenses.value.reduce((sum, expense) => sum + Number(expense.price), 0))
);

const monthlyTotalExpense = computed(() =>
    String(monthlyExpenses.value.reduce((sum, expense) => sum + Number(expense.price), 0))
);

const annuallyTotalIncome = computed(() =>
    String(annuallyTotalIncomes.value.reduce((sum, expense) => sum + Number(expense.price), 0))
);

const monthlyTotalIncome = computed(() =>
    String(monthlyIncomes.value.reduce((sum, expense) => sum + Number(expense.price), 0))
);

const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString() + '원';
};

const animateNumber = (target: number, ref: any) => {
    const duration = 1000;
    const start = Date.now();
    const startValue = ref.value;

    const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        ref.value = Math.floor(startValue + (target - startValue) * easeOut);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            ref.value = target;
        }
    };

    requestAnimationFrame(animate);
};

const getExpensesByYear = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.error('사용자 인증 필요');
        return [];
    }

    const start = `${currentYear.value}-01-01`;
    const end = `${currentYear.value}-12-31`;

    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', start)
        .lte('date', end)
        .order('date', { ascending: false })
        .order('time', { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }

    return data || [];
};

const getIncomesByYear = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.error('사용자 인증 필요');
        return [];
    }

    const start = `${currentYear.value}-01-01`;
    const end = `${currentYear.value}-12-31`;

    const { data, error } = await supabase
        .from('incomes')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', start)
        .lte('date', end)
        .order('date', { ascending: false })
        .order('time', { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }

    return data || [];
};

onMounted(async () => {
    const yearExpensesData = await getExpensesByYear();
    const yearIncomesData = await getIncomesByYear();

    if (yearExpensesData && yearIncomesData) {
        annuallyTotalExpenses.value = yearExpensesData;
        annuallyTotalIncomes.value = yearIncomesData;

        const monthStr = String(currentMonth.value).padStart(2, '0');

        monthlyExpenses.value = yearExpensesData.filter(expense =>
            expense.date.startsWith(`${currentYear.value}-${monthStr}`)
        );
        monthlyIncomes.value = yearIncomesData.filter(income =>
            income.date.startsWith(`${currentYear.value}-${monthStr}`)
        );

        isLoading.value = false;

        animateNumber(Number(monthlyTotalExpense.value), animatedMonthly);
        animateNumber(Number(annuallyTotalExpense.value), animatedAnnually);
    }
});
</script>

<template>
    <div class="stats-section">
        <div class="stat-card total">
            <h3>이번 달 총 지출</h3>
            <div v-if="isLoading" class="loading-spinner"></div>
            <div v-else>
                <p class="amount">
                    {{ formatPrice(Number(monthlyTotalExpense) - Number(monthlyTotalIncome)) }}
                </p>
                <p class="net-amount">
                    {{ formatPrice(animatedMonthly) }} (+{{
                        formatPrice(Number(monthlyTotalIncome))
                    }})
                </p>
            </div>
        </div>

        <ExpensesRecentlyContent :is-loading="isLoading" :monthly-expenses="monthlyExpenses" />

        <div class="stat-card total">
            <h3>{{ currentYear }} 누적 총 지출</h3>
            <div v-if="isLoading" class="loading-spinner"></div>
            <div v-else>
                <p class="amount">
                    {{ formatPrice(Number(annuallyTotalExpense) - Number(annuallyTotalIncome)) }}
                </p>
                <p class="net-amount">
                    {{ formatPrice(animatedAnnually) }} (+{{
                        formatPrice(Number(annuallyTotalIncome))
                    }})
                </p>
            </div>
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
    margin: 0 0 8px 0;
}

.net-amount {
    font-size: 14px;
    color: #666;
    margin: 0;
    font-weight: 500;
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

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
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
