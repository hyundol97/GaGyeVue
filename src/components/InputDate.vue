<script setup lang="ts">
import { ref } from 'vue';

const selectedDate = ref('');
const selectedTime = ref('');
</script>

<template>
    <div class="input-container">
        <h3 class="step-title">1. 결제 일시를 입력하세요</h3>
        <div class="form-group">
            <label class="label">날짜</label>
            <input
                v-model="selectedDate"
                type="date"
                class="input-field"
                placeholder="날짜를 선택하세요"
            />
        </div>
        <div class="form-group">
            <label class="label">시간</label>
            <input
                v-model="selectedTime"
                type="time"
                class="input-field"
                placeholder="시간을 선택하세요"
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
    margin-bottom: 20px;
}

.step-title {
    color: #409eff;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
}

.step-title::before {
    content: '📅';
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
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.input-field:hover {
    border-color: #c0c4cc;
}
</style>
