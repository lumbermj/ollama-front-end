<script setup lang="ts">
import { ref, type Ref } from 'vue'

const currentPage: Ref<string | null> = ref('contributors')
</script>

<template>
  <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    <div class="bg-white/80 backdrop-blur-sm rounded-full shadow-lg h-full">
      <ul class="flex justify-between gap-3 py-2">
        <li>
            <RouterLink
              to="/"
              class="w-100 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="{
                'bg-gradient-to-r from-violet-900 to-pink-400 text-white': currentPage === 'contributors',
                'text-gray-700 hover:bg-gray-100': currentPage !== 'contributors',
              }"
              @click="currentPage = 'contributors'"
              >Contributors
            </RouterLink>
        </li>
        <li>
            <RouterLink
              to="/chat"
              class="w-100 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="{
                'bg-gradient-to-l from-violet-900 to-pink-400 text-white': currentPage === 'chat',
                'text-gray-700 hover:bg-gray-100': currentPage !== 'chat',
              }"
              @click="currentPage = 'chat'"
              >Chatbot
            </RouterLink>

        </li>
      </ul>
    </div>
  </nav>

  <RouterView />
</template>
