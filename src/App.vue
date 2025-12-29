<script setup lang="ts">
import InputDate from './components/InputDate.vue';
import InputPrice from './components/InputPrice.vue';
import SelectCategory from './components/SelectCategory.vue';
import SelectMethod from './components/SelectMethod.vue';
</script>

<template>
    <div class="app-container">
        <div class="header">
            <h1 class="app-title">가계부 입력</h1>
            <p class="app-subtitle">아래 단계를 따라 결제 정보를 입력해주세요</p>
        </div>

        <div class="form-container">
            <InputDate />
            <InputPrice />
            <SelectCategory />
            <SelectMethod />

            <div class="submit-container">
                <button class="submit-btn">저장하기</button>
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
    margin-bottom: 32px;
}

.app-title {
    color: white;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    margin: 0;
}

.form-container {
    max-width: 600px;
    margin: 0 auto;
}

.submit-container {
    text-align: center;
    margin-top: 32px;
}

.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 16px 48px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.submit-btn:active {
    transform: translateY(0);
}
</style>
