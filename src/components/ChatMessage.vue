<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/types/chat'

const props = defineProps<{
  message: Message
}>()

const isUserMessage = computed(() => props.message.sender === 'user')
const isAIMessage = computed(() => props.message.sender === 'ai')

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'sending':
      return '⏳'
    case 'sent':
      return '✓'
    case 'delivered':
      return '✓✓'
    case 'read':
      return '👁'
    default:
      return ''
  }
}
</script>

<template>
  <div
    class="flex animate-slide-in"
    :class="[
      isUserMessage ? 'justify-end' : 'justify-start',
      'mb-4 px-4'
    ]"
  >
    <!-- Avatar for AI -->
    <div
      v-if="isAIMessage"
      class="flex-shrink-0 mr-3 mt-1"
    >
      <div
        class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </div>

    <!-- Message content -->
    <div
      class="max-w-xs lg:max-w-md xl:max-w-lg"
      :class="isUserMessage ? 'order-1' : 'order-2'"
    >
      <!-- Sender name -->
      <div
        v-if="!isUserMessage"
        class="text-xs text-gray-500 mb-1 px-1 flex items-center space-x-1"
      >
        <span>{{ message.senderName }}</span>
        <span v-if="isAIMessage" class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          AI
        </span>
      </div>

      <!-- Message bubble -->
      <div
        class="px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md"
        :class="[
          isUserMessage
            ? 'bg-primary-500 text-white rounded-br-md'
            : isAIMessage
              ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-gray-800 rounded-bl-md border border-purple-100'
              : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
        ]"
      >
        <p class="text-sm leading-relaxed break-words whitespace-pre-wrap">
          {{ message.text }}
        </p>

        <!-- Timestamp and status -->
        <div
          class="flex items-center justify-end mt-2 space-x-1"
          :class="isUserMessage ? 'text-blue-100' : 'text-gray-400'"
        >
          <span class="text-xs">
            {{ formatTime(message.timestamp) }}
          </span>
          <span v-if="isUserMessage && message.status" class="text-xs">
            {{ getStatusIcon(message.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Avatar for user messages -->
    <div
      v-if="isUserMessage"
      class="flex-shrink-0 ml-3 mt-1 order-2"
    >
      <div
        class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium"
      >
        U
      </div>
    </div>
  </div>
</template>