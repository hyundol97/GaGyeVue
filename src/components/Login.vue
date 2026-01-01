<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../lib/supabase';

const emit = defineEmits<{
    login: [userMail: string];
}>();

const userMail = ref('');
const password = ref('');

const handleLogin = async () => {
    if (userMail.value.trim() && password.value.trim()) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: userMail.value.trim(),
                password: password.value.trim(),
            });

            if (error) {
                console.error('로그인 오류:', error.message);
                alert('로그인에 실패했습니다.');
                return;
            }

            if (data.user) {
                emit('login', userMail.value);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인에 실패했습니다.');
        }
    }
};
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">로그인</h2>
            <div class="form-group">
                <input
                    v-model="userMail"
                    type="text"
                    placeholder="이메일"
                    class="login-input"
                    @keyup.enter="handleLogin"
                />
            </div>
            <div class="form-group">
                <input
                    v-model="password"
                    type="password"
                    placeholder="비밀번호"
                    class="login-input"
                    @keyup.enter="handleLogin"
                />
            </div>
            <button @click="handleLogin" class="login-btn">로그인</button>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.login-card {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
}

.login-title {
    text-align: center;
    color: #333;
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: 700;
}

.form-group {
    margin-bottom: 20px;
}

.login-input {
    width: 100%;
    padding: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
    transition: all 0.3s;
}

.login-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.login-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
