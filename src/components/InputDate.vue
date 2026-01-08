<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = defineProps<{
    modelValue: { date: string; time: string };
    type: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: { date: string; time: string }];
}>();

const selectedDate = computed({
    get: () => props.modelValue.date,
    set: (value: string | undefined) => {
        if (value) {
            emit('update:modelValue', { ...props.modelValue, date: value });
        }
    },
});

const selectedHour = computed({
    get: () => (props.modelValue.time ? props.modelValue.time.split(':')[0] : ''),
    set: (value: string | undefined) => {
        if (value) {
            const minute = props.modelValue.time ? props.modelValue.time.split(':')[1] : '00';
            emit('update:modelValue', { ...props.modelValue, time: `${value}:${minute}` });
        }
    },
});

const selectedMinute = computed({
    get: () => (props.modelValue.time ? props.modelValue.time.split(':')[1] : ''),
    set: (value: string | undefined) => {
        if (value) {
            const hour = props.modelValue.time ? props.modelValue.time.split(':')[0] : '00';
            emit('update:modelValue', { ...props.modelValue, time: `${hour}:${value}` });
        }
    },
});

const title = computed(() => {
    switch (props.type) {
        case 'expense':
            return '결제';
        case 'income':
            return '수입';
        default:
            return '결제';
    }
});

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = ['00', '30'];

const today: string = new Date().toISOString().split('T')[0]!;

onMounted(() => {
    if (!props.modelValue.date) {
        emit('update:modelValue', { ...props.modelValue, date: today });
    }
});
</script>

<template>
    <div class="input-container">
        <h3 class="step-title">1. {{ title }} 일시를 입력하세요</h3>
        <div class="form-group">
            <label class="label">날짜</label>
            <input v-model="selectedDate" type="date" :max="today" class="input-field" />
        </div>
        <div class="form-group">
            <label class="label">시간</label>
            <div class="time-selector">
                <select v-model="selectedHour" class="time-select">
                    <option value="">시</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}시</option>
                </select>
                <select v-model="selectedMinute" class="time-select">
                    <option value="">분</option>
                    <option v-for="minute in minutes" :key="minute" :value="minute">
                        {{ minute }}분
                    </option>
                </select>
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
    max-width: 100%;
    min-width: 0;
    padding: 12px 16px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    overflow: hidden;
}

.time-selector {
    display: flex;
    gap: 12px;
}

.time-select {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s;
    box-sizing: border-box;
    background: white;
}

.time-select:focus {
    outline: none;
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.time-select:hover {
    border-color: #c0c4cc;
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
