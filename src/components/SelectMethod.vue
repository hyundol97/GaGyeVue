<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const selectedMethod = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const paymentMethods = [
    { value: 'card', label: '신용카드', icon: '💳', description: '신용카드로 결제' },
    { value: 'cash', label: '현금', icon: '💵', description: '현금으로 결제' },
    { value: 'transfer', label: '계좌이체', icon: '🏦', description: '계좌이체로 결제' },
    { value: 'mobile', label: '모바일결제', icon: '📱', description: '모바일 앱으로 결제' },
];

onMounted(() => {
    if (!props.modelValue) {
        emit('update:modelValue', 'card');
    }
});
</script>

<template>
    <div class="input-container">
        <h3 class="step-title">5. 결제 방법을 선택하세요</h3>
        <div class="method-list">
            <div
                v-for="method in paymentMethods"
                :key="method.value"
                class="method-item"
                :class="{ active: selectedMethod === method.value }"
                @click="selectedMethod = method.value"
            >
                <div class="method-content">
                    <span class="method-icon">{{ method.icon }}</span>
                    <div class="method-info">
                        <div class="method-label">{{ method.label }}</div>
                        <div class="method-description">{{ method.description }}</div>
                    </div>
                </div>
                <div class="method-radio">
                    <div
                        class="radio-circle"
                        :class="{ checked: selectedMethod === method.value }"
                    ></div>
                </div>
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
    color: #f56c6c;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
}

.step-title::before {
    content: '💳';
    margin-right: 8px;
}

.method-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.method-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    background: #fafafa;
}

.method-item:hover {
    border-color: #f56c6c;
    background: #fef0f0;
}

.method-item.active {
    border-color: #f56c6c;
    background: #fef0f0;
    box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

.method-content {
    display: flex;
    align-items: center;
    gap: 16px;
}

.method-icon {
    font-size: 24px;
}

.method-info {
    display: flex;
    flex-direction: column;
}

.method-label {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 4px;
}

.method-description {
    font-size: 14px;
    color: #909399;
}

.method-radio {
    display: flex;
    align-items: center;
}

.radio-circle {
    width: 20px;
    height: 20px;
    border: 2px solid #dcdfe6;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s;
}

.radio-circle.checked {
    border-color: #f56c6c;
    background: #f56c6c;
}

.radio-circle.checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
}
</style>
