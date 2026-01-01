<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const name = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});
</script>

<template>
    <div class="input-container">
        <h3 class="step-title">2. 결제 항목명을 입력하세요</h3>
        <div class="form-group">
            <label class="label">항목명</label>
            <input
                v-model="name"
                type="text"
                class="input-field"
                placeholder="예: 점심식사, 지하철 요금, 커피 등"
            />
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
    color: #67c23a;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
}

.step-title::before {
    content: '📝';
    margin-right: 8px;
}

.form-group {
    margin-bottom: 16px;
}

.label {
    display: block;
    color: #606266;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
}

.input-field {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s;
    box-sizing: border-box;
}

.input-field:focus {
    outline: none;
    border-color: #67c23a;
    box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.2);
}

.input-field:hover {
    border-color: #c0c4cc;
}
</style>
