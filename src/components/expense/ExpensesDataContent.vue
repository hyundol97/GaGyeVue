<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';

import ExpensesRecentlyContent from './ExpensesRecentlyContent.vue';

const props = defineProps<{
    user: User | null;
}>();

const emit = defineEmits<{
    logout: [];
    startExpense: [];
}>();

const today = new Date();
const isLoading = ref(true);
const activeTab = ref('monthly');
const animatedMonthly = ref(0);
const animatedAnnually = ref(0);
const animatedMonthlyNet = ref(0);
const animatedAnnuallyNet = ref(0);
const animatedMonthlyIncome = ref(0);
const animatedAnnuallyIncome = ref(0);

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

const animateNumber = (target: number, ref: any, duration: number = 1000) => {
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
    if (!props.user) throw new Error('로그인 필요');

    const start = `${currentYear.value}-01-01`;
    const end = `${currentYear.value}-12-31`;

    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', props.user.id)
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
    if (!props.user) throw new Error('로그인 필요');

    const start = `${currentYear.value}-01-01`;
    const end = `${currentYear.value}-12-31`;

    const { data, error } = await supabase
        .from('incomes')
        .select('*')
        .eq('user_id', props.user.id)
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

const animateTabData = (tab: string) => {
    if (tab === 'monthly') {
        animatedMonthly.value = 0;
        animatedMonthlyNet.value = 0;
        animatedMonthlyIncome.value = 0;
        
        animateNumber(Number(monthlyTotalExpense.value), animatedMonthly);
        animateNumber(
            Number(monthlyTotalExpense.value) - Number(monthlyTotalIncome.value),
            animatedMonthlyNet,
            1500
        );
        animateNumber(Number(monthlyTotalIncome.value), animatedMonthlyIncome);
    } else {
        animatedAnnually.value = 0;
        animatedAnnuallyNet.value = 0;
        animatedAnnuallyIncome.value = 0;
        
        animateNumber(Number(annuallyTotalExpense.value), animatedAnnually);
        animateNumber(
            Number(annuallyTotalExpense.value) - Number(annuallyTotalIncome.value),
            animatedAnnuallyNet,
            1500
        );
        animateNumber(Number(annuallyTotalIncome.value), animatedAnnuallyIncome);
    }
};

const switchTab = (tab: string) => {
    activeTab.value = tab;
    animateTabData(tab);
};

const loadData = async () => {
    if (!props.user) {
        isLoading.value = false;
        return;
    }

    try {
        const yearExpensesData = await getExpensesByYear();
        const yearIncomesData = await getIncomesByYear();

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
        animateTabData(activeTab.value);
    } catch (error) {
        console.error('데이터 로드 실패:', error);
        isLoading.value = false;
    }
};

watch(
    () => props.user,
    async userData => {
        if (userData) {
            isLoading.value = true;
            await loadData();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="tab-container">
        <div class="tab-buttons">
            <button :class="{ active: activeTab === 'monthly' }" @click="switchTab('monthly')">
                {{ currentYear.toString().substring(2) + '년 ' + currentMonth + '월' }}
            </button>
            <button :class="{ active: activeTab === 'annually' }" @click="switchTab('annually')">
                요약
            </button>
        </div>

        <div class="tab-content">
            <div v-if="activeTab === 'monthly'" class="stats-section">
                <div class="stat-card total">
                    <h3>이번 달 총 지출</h3>
                    <div v-if="isLoading" class="loading-spinner"></div>
                    <div v-else>
                        <p class="amount">
                            {{ formatPrice(animatedMonthlyNet) }}
                        </p>
                        <p class="net-amount">
                            {{ formatPrice(animatedMonthly) }} (+{{
                                formatPrice(animatedMonthlyIncome)
                            }})
                        </p>
                    </div>
                </div>

                <ExpensesRecentlyContent
                    :is-loading="isLoading"
                    :monthly-expenses="monthlyExpenses"
                />
            </div>

            <div v-if="activeTab === 'annually'" class="stats-section">
                <div class="stat-card total">
                    <h3>{{ currentYear }} 누적 총 지출</h3>
                    <div v-if="isLoading" class="loading-spinner"></div>
                    <div v-else>
                        <p class="amount">
                            {{ formatPrice(animatedAnnuallyNet) }}
                        </p>
                        <p class="net-amount">
                            {{ formatPrice(animatedAnnually) }} (+{{
                                formatPrice(animatedAnnuallyIncome)
                            }})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tab-container {
    margin-bottom: 32px;
}

.tab-buttons {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.tab-buttons button {
    padding: 12px 24px;
    border: 2px solid #e0e0e0;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
}

.tab-buttons button:hover {
    border-color: #667eea;
    color: #667eea;
}

.tab-buttons button.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
}

.tab-content {
    min-height: 200px;
}

.stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.stat-card {
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.stat-card.total {
    text-align: center;
}

.stat-card h3 {
    color: #333;
    font-size: 16px;
    margin: 0 0 12px 0;
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
