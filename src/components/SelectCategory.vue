<script setup lang="ts">
import { ref } from 'vue';

const selectedCategory = ref('');

const categories = [
    { value: 'food', label: '식비', icon: '🍴' },
    { value: 'transport', label: '교통비', icon: '🚗' },
    { value: 'shopping', label: '쇼핑', icon: '🛍️' },
    { value: 'entertainment', label: '엔터테인먼트', icon: '🎬' },
    { value: 'health', label: '건강/의료', icon: '🏥' },
    { value: 'education', label: '교육', icon: '📚' },
    { value: 'utility', label: '공과금', icon: '💵' },
    { value: 'other', label: '기타', icon: '💼' },
];
</script>

<template>
    <div class="input-container">
        <h3 class="step-title">3. 결제한 항목의 카테고리를 선택하세요</h3>
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
    margin-bottom: 20px;
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
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
}

.category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 12px;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    background: #fafafa;
}

.category-item:hover {
    border-color: #e6a23c;
    background: #fdf6ec;
    transform: translateY(-2px);
}

.category-item.active {
    border-color: #e6a23c;
    background: #fdf6ec;
    box-shadow: 0 4px 12px rgba(230, 162, 60, 0.3);
}

.category-icon {
    font-size: 24px;
    margin-bottom: 8px;
}

.category-label {
    font-size: 14px;
    font-weight: 500;
    color: #606266;
    text-align: center;
}

.category-item.active .category-label {
    color: #e6a23c;
    font-weight: 600;
}
</style>
