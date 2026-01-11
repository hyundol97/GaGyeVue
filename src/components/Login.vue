<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const emit = defineEmits<{
    login: [];
}>();

const userMail = ref('');
const password = ref('');
const emailDomain = '@naver.com';

const handleEmailBlur = () => {
    if (userMail.value && !userMail.value.includes('@')) {
        userMail.value += emailDomain;
    }
};

const handleTestLogin = async () => {
    userMail.value = 'tester1@naver.com';
    password.value = '1234';
    await handleLogin();
};

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
                authStore.setUser(data.user);
                emit('login');
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
                <div class="email-input-wrapper">
                    <input
                        v-model="userMail"
                        type="text"
                        placeholder="이메일"
                        class="login-input email-input"
                        @keyup.enter="handleLogin"
                        @blur="handleEmailBlur"
                    />
                    <span v-if="userMail && !userMail.includes('@')" class="email-suffix">{{
                        emailDomain
                    }}</span>
                </div>
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
            <button @click="handleTestLogin" class="test-login-btn">테스트 계정 로그인</button>
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

.email-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.email-input {
    flex: 1;
}

.email-suffix {
    position: absolute;
    right: 16px;
    color: #999;
    pointer-events: none;
    font-size: 16px;
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

.test-login-btn {
    width: 100%;
    padding: 12px;
    background: #f5f5f5;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 12px;
}

.test-login-btn:hover {
    background: #e9e9e9;
    color: #333;
}
</style>
