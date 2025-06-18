<script setup lang="ts">
import { ref, nextTick } from 'vue'

const emit = defineEmits<{
  sendMessage: [text: string]
}>()

const messageText = ref('')
const textareaRef = ref<HTMLTextAreaElement>()
const isComposing = ref(false)
const isLoading = ref(false)

defineExpose({
  setLoading: (loading: boolean) => {
    isLoading.value = loading
  }
})

const sendMessage = async () => {
  const text = messageText.value.trim()
  if (!text || isLoading.value) return

  emit('sendMessage', text)
  messageText.value = ''

  // Reset textarea height
  await nextTick()
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey && !isComposing.value && !isLoading.value) {
    event.preventDefault()
    sendMessage()
  }
}

const adjustTextareaHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = Math.min(textareaRef.value.scrollHeight, 120) + 'px'
  }
}

const handleCompositionStart = () => {
  isComposing.value = true
}

const handleCompositionEnd = () => {
  isComposing.value = false
}
</script>

<template>
  <div class="border-t border-gray-200 bg-white px-4 py-4">
    <div class="flex items-end space-x-3">
      <!-- Message input -->
      <div class="flex-1 relative">
        <textarea
          ref="textareaRef"
          v-model="messageText"
          @keydown="handleKeyDown"
          @input="adjustTextareaHeight"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
          :placeholder="isLoading ? 'AI is thinking...' : 'Ask me anything...'"
          :disabled="isLoading"
          class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 disabled:bg-gray-50 disabled:cursor-not-allowed"
          style="min-height: 50px; max-height: 120px;"
          rows="1"
        />
      </div>

      <!-- Send button -->
      <button
        @click="sendMessage"
        :disabled="!messageText.trim() || isLoading"
        class="flex-shrink-0 w-12 h-12 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        :class="messageText.trim() && !isLoading ? 'animate-bounce-gentle' : ''"
      >
        <svg
          v-if="!isLoading"
          class="w-5 h-5 transform rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 animate-spin"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>

    <!-- Input hint -->
    <div class="mt-2 text-xs text-gray-400 px-1">
      {{ isLoading ? 'AI is generating a response...' : 'Press Enter to send, Shift + Enter for new line' }}
    </div>
  </div>
</template>