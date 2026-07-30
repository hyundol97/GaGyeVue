<script setup lang="ts">
import { ref } from 'vue';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
    countdown?: number;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

const show = (message: string, type: 'success' | 'error' = 'success', countdown?: number) => {
    const id = nextId++;
    toasts.value.push({ id, message, type, countdown });

    if (countdown) {
        const timer = setInterval(() => {
            const toast = toasts.value.find(t => t.id === id);
            if (!toast) { clearInterval(timer); return; }
            if (toast.countdown! <= 1) {
                clearInterval(timer);
            } else {
                toast.countdown!--;
            }
        }, 1000);
    }

    const duration = countdown ? countdown * 1000 : 3000;
    setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id);
    }, duration);
};

defineExpose({ show });
</script>

<template>
    <Teleport to="body">
        <div class="toast-wrapper">
            <TransitionGroup name="toast">
                <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
                    <div class="toast-icon-wrap">
                        <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="white" fill-opacity="0.25" />
                            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="white" fill-opacity="0.25" />
                            <path d="M8 8l8 8M16 8l-8 8" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <span class="toast-message">{{ toast.message }}</span>
                    <span v-if="toast.countdown" class="toast-countdown">{{ toast.countdown }}</span>
                    <div class="toast-progress" :class="toast.type" :style="{ animationDuration: toast.countdown ? `${toast.countdown + 1}s` : '3s' }"></div>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
.toast-wrapper {
    position: fixed;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
}

.toast {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px 18px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    min-width: 260px;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.2);
}

.toast.success {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.toast.error {
    background: linear-gradient(135deg, #f5576c 0%, #c0392b 100%);
}

.toast-icon-wrap svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.toast-message {
    flex: 1;
    letter-spacing: -0.2px;
}

.toast-countdown {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
}

.toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    border-radius: 0 0 16px 16px;
    background: rgba(255, 255, 255, 0.5);
    animation: progress 3s linear forwards;
    transform-origin: left;
}

@keyframes progress {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0); }
}

.toast-enter-active {
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
    transition: all 0.25s ease;
}
.toast-enter-from {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
}
.toast-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
}
</style>
