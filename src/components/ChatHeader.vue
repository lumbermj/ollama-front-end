<script setup lang="ts">
import type { ChatUser } from '@/types/chat'

defineProps<{
  user: ChatUser
}>()
</script>

<template>
  <div class="border-b border-gray-200 bg-white px-6 py-4">
    <div class="flex items-center space-x-4">
      <!-- AI Bot avatar -->
      <div class="relative">
        <div
          class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <!-- Online status -->
        <div
          v-if="user.isOnline"
          class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"
        />
      </div>

      <!-- AI Bot info -->
      <div class="flex-1">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ user.name }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ user.isOnline ? 'Online • AI Assistant' : 'Offline' }}
        </p>
      </div>

      <!-- Actions -->
<!--      <div class="flex items-center space-x-2">-->
<!--        <button-->
<!--          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"-->
<!--          title="Clear conversation"-->
<!--        >-->
<!--          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />-->
<!--          </svg>-->
<!--        </button>-->
<!--        <button-->
<!--          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"-->
<!--          title="Settings"-->
<!--        >-->
<!--          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />-->
<!--          </svg>-->
<!--        </button>-->
<!--      </div>-->
    </div>
  </div>
</template>