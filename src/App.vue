<script setup lang="ts">
import { ref, computed } from 'vue';
import InputDate from './components/InputDate.vue';
import InputItem from './components/InputItem.vue';
import InputPrice from './components/InputPrice.vue';
import SelectCategory from './components/SelectCategory.vue';
import SelectMethod from './components/SelectMethod.vue';

const currentStep = ref(1);
const formData = ref({
    date: '',
    time: '',
    name: '',
    price: '',
    category: '',
    method: '',
});

const totalSteps = 5;

const canProceed = computed(() => {
    switch (currentStep.value) {
        case 1:
            return formData.value.date && formData.value.time;
        case 2:
            return formData.value.name.trim().length > 2;
        case 3:
            return parseInt(formData.value.price.replace(/[^0-9]/g, '')) > 0;
        case 4:
            return formData.value.category;
        case 5:
            return formData.value.method;
        default:
            return false;
    }
});

const nextStep = () => {
    if (canProceed.value && currentStep.value < totalSteps) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const submitForm = () => {
    console.log('Form submitted:', formData.value);
    alert('가계부 입력이 완료되었습니다!');
};
</script>

<template>
    <div class="app-container">
        <div class="header">
            <h1 class="app-title">가계부 입력</h1>
            <div class="progress-bar">
                <div
                    class="progress"
                    :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
                ></div>
            </div>
            <p class="step-indicator">{{ currentStep }} / {{ totalSteps }}</p>
        </div>

        <div class="form-container">
            <div class="step-wrapper">
                <InputDate
                    v-if="currentStep === 1"
                    :modelValue="{ date: formData.date, time: formData.time }"
                    @update:modelValue="
                        val => {
                            formData.date = val.date;
                            formData.time = val.time;
                        }
                    "
                />
                <InputItem
                    v-if="currentStep === 2"
                    :modelValue="formData.name"
                    @update:modelValue="val => (formData.name = val)"
                />
                <InputPrice
                    v-if="currentStep === 3"
                    :modelValue="formData.price"
                    @update:modelValue="val => (formData.price = val)"
                />
                <SelectCategory
                    v-if="currentStep === 4"
                    :modelValue="formData.category"
                    @update:modelValue="val => (formData.category = val)"
                />
                <SelectMethod
                    v-if="currentStep === 5"
                    :modelValue="formData.method"
                    @update:modelValue="val => (formData.method = val)"
                />
            </div>

            <div class="navigation">
                <button v-if="currentStep > 1" @click="prevStep" class="nav-btn prev-btn">
                    이전
                </button>
                <button
                    v-if="currentStep < totalSteps"
                    @click="nextStep"
                    :disabled="!canProceed"
                    class="nav-btn next-btn"
                    :class="{ disabled: !canProceed }"
                >
                    다음
                </button>
                <button
                    v-if="currentStep === totalSteps"
                    @click="submitForm"
                    :disabled="!canProceed"
                    class="nav-btn submit-btn"
                    :class="{ disabled: !canProceed }"
                >
                    저장하기
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
}

.header {
    text-align: center;
    margin-top: 24px;
    margin-bottom: 32px;
}

.app-title {
    color: white;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 16px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.progress-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    margin: 0 auto 8px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: white;
    transition: width 0.3s ease;
}

.step-indicator {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin: 0;
}

.form-container {
    max-width: 600px;
    margin: 0 auto;
}

.step-wrapper {
    min-height: 300px;
    display: flex;
    align-items: flex-start;
}

.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
}

.nav-btn {
    width: 100%;
    padding: 12px 32px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.prev-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.prev-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.next-btn,
.submit-btn {
    background: white;
    color: #667eea;
}

.next-btn:hover,
.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nav-btn.disabled:hover {
    transform: none;
    box-shadow: none;
}
</style>
