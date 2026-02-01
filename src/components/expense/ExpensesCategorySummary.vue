<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

interface Expense {
    id: string;
    date: string;
    name: string;
    price: string;
    category?: string;
}

const props = defineProps<{
    isLoading: boolean;
    currentYear: number;
    annuallyTotalExpenses: Expense[];
}>();

const chartRef = ref<HTMLDivElement>();
let chartInstance: echarts.ECharts | null = null;

const categories = [
    { value: 'food', label: '식비', icon: '🍴' },
    { value: 'shopping', label: '쇼핑', icon: '🛍️' },
    { value: 'transport', label: '교통비', icon: '🚗' },
    { value: 'utility', label: '고정지출', icon: '💼' },
    { value: 'household', label: '생활용품', icon: '🛒' },
    { value: 'entertainment', label: '여가생활', icon: '🎬' },
    { value: 'health', label: '건강/의료', icon: '🏥' },
    { value: 'education', label: '교육', icon: '📚' },
    { value: 'other', label: '기타', icon: '🛠️' },
];

const getCategoryLabel = (value: string) => {
    const category = categories.find(cat => cat.value === value);
    return category ? `${category.icon} ${category.label}` : '🛠️ 기타';
};

const categoryData = computed(() => {
    const categoryMap = new Map<string, number>();

    // 모든 카테고리를 0으로 초기화
    categories.forEach(cat => {
        categoryMap.set(cat.value, 0);
    });

    // 실제 지출 데이터 추가
    props.annuallyTotalExpenses.forEach(expense => {
        const category = expense.category || 'other';
        const price = Number(expense.price);
        categoryMap.set(category, (categoryMap.get(category) || 0) + price);
    });

    return categories.map(cat => ({
        name: getCategoryLabel(cat.value),
        value: categoryMap.get(cat.value) || 0
    })).sort((a, b) => b.value - a.value);
});

const initChart = () => {
    if (!chartRef.value || props.isLoading) return;

    if (chartInstance) {
        chartInstance.dispose();
    }

    chartInstance = echarts.init(chartRef.value);

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}원 ({d}%)',
        },
        legend: {
            orient: 'horizontal',
            bottom: 0,
            itemWidth: 20,
            itemHeight: 15,
            itemGap: 5,
            width: '90%',
            left: 'center',
            textStyle: {
                fontSize: 12,
                fontWeight: 500,
            },
        },
        series: [
            {
                name: '소비 항목 통계',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: categoryData.value,
            },
        ],
    };

    chartInstance.setOption(option);
};

onMounted(() => {
    initChart();
});

watch(
    [() => props.isLoading, () => props.annuallyTotalExpenses],
    () => {
        if (!props.isLoading) {
            setTimeout(() => initChart(), 100);
        }
    },
    { deep: true }
);
</script>

<template>
    <div class="category-summary">
        <h3>{{ currentYear }} 소비 항목 통계</h3>
        <div v-if="isLoading" class="loading-spinner"></div>
        <div v-else-if="categoryData.length === 0" class="no-data">데이터가 없습니다</div>
        <div v-else>
            <div ref="chartRef" class="chart-container"></div>
            <div class="category-list">
                <div v-for="item in categoryData" :key="item.name" class="category-item">
                    <span class="category-name">{{ item.name }}</span>
                    <span class="category-amount">{{ item.value.toLocaleString() }}원</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.category-summary {
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.category-summary h3 {
    color: #333;
    font-size: 16px;
    margin: 0 0 16px 0;
    font-weight: 600;
}

.chart-container {
    width: 100%;
    height: 300px;
    margin-bottom: 16px;
}

.category-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 8px;
}

.category-name {
    font-weight: 500;
    color: #333;
}

.category-amount {
    font-weight: 600;
    color: #667eea;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 40px auto;
}

.no-data {
    text-align: center;
    color: #666;
    padding: 40px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
