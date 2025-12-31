<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const formatPrice = (value: string) => {
  const numericValue = value.replace(/[^0-9]/g, '')
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const price = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatPrice(target.value)
  price.value = formatted
}
</script>

<template>
  <div class="input-container">
    <h3 class="step-title">3. 결제한 금액을 입력하세요</h3>
    <div class="form-group">
      <label class="label">금액</label>
      <div class="price-input-wrapper">
        <input 
          :value="price"
          @input="onInput"
          type="text" 
          class="input-field price-input"
          placeholder="0"
        />
        <span class="currency">원</span>
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
  color: #909399;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
}

.step-title::before {
  content: '💰';
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

.price-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  box-sizing: border-box;
}

.price-input {
  padding-right: 40px;
  text-align: right;
  font-weight: 600;
}

.currency {
  position: absolute;
  right: 16px;
  color: #909399;
  font-size: 14px;
  pointer-events: none;
}

.input-field:focus {
  outline: none;
  border-color: #909399;
  box-shadow: 0 0 0 2px rgba(144, 147, 153, 0.2);
}

.input-field:hover {
  border-color: #c0c4cc;
}
</style>