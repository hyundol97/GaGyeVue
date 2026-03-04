<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const selectedCategory = computed({
    get: () => props.modelValue || 'food',
    set: value => emit('update:modelValue', value),
});

const categories = [
    { value: 'food', label: '식비', icon: '🍴' },
    { value: 'shopping', label: '쇼핑', icon: '🛍️' },
    { value: 'transport', label: '교통비', icon: '🚗' },
    { value: 'utility', label: '고정지출', icon: '💼' },
    { value: 'household', label: '생활용품', icon: '🛒' },
    { value: 'entertainment', label: '취미/교육', icon: '🎬' },
    { value: 'health', label: '건강/의료', icon: '🏥' },
    { value: 'relationship', label: '경조사/선물', icon: '🎁' },
    { value: 'other', label: '기타', icon: '🛠️' },
];

onMounted(() => {
    if (!props.modelValue) {
        emit('update:modelValue', 'food');
    }
});
</script>

<template>
    <div class="input-container">
        <h3 class="step-title">4. 결제한 항목의 카테고리를 선택하세요</h3>
        <div class="category-grid">
            <div
                v-for="category in categories"
                :key="category.value"
                class="category-item"
                :class="{ active: selectedCategory === category.value }"
                @click="selectedCategory = category.value"
            >
                <span class="category-icon">{{ category.icon }}</span>
                <span class="category-label">{{ category.label }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.input-container {
    padding: 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.step-title {
    color: #e6a23c;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
}

.step-title::before {
    content: '📊';
    margin-right: 8px;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 6px;
    border: 2px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    background: #fafafa;
}

.category-item:hover {
    border-color: #e6a23c;
    background: #fdf6ec;
    transform: translateY(-1px);
}

.category-item.active {
    border-color: #e6a23c;
    background: #fdf6ec;
    box-shadow: 0 2px 8px rgba(230, 162, 60, 0.3);
}

.category-icon {
    font-size: 18px;
    margin-bottom: 4px;
}

.category-label {
    font-size: 12px;
    font-weight: 500;
    color: #606266;
    text-align: center;
}

.category-item.active .category-label {
    color: #e6a23c;
    font-weight: 600;
}
</style>
