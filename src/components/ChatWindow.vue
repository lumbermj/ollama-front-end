<script setup lang="ts">
import { nextTick, onMounted, type Ref, ref, watch } from 'vue'
import ChatHeader from '@/components/ChatHeader.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import ChatInput from '@/components/ChatInput.vue'
import type { ChatUser, Message } from '@/types/chat'
import axios from 'axios'
import { useStreaming } from '@/composables/useStreaming'
import { uuid } from 'vue3-uuid'
const currentMessageId: Ref<string | null> = ref(null)

const { isStreaming, error, streamData, startStream, stopStream } = useStreaming()
const apiUrl = ref('http://localhost:3000/chat/stream')

const handleStartStream = async (text: string) => {
  if (!apiUrl.value) return

  await startStream(apiUrl.value, text)
}

const messages = ref<Message[]>([
  {
    id: '1',
    text: "Hello! I'm your AI assistant. I'm here to help you with any questions or tasks you might have. How can I assist you today?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 60000),
    senderName: 'AI Assistant',
    status: 'read',
  },
])

const chatUser = ref<ChatUser>({
  id: 'ai-assistant',
  name: 'AI Assistant',
  isOnline: true,
})

const messagesContainer = ref<HTMLElement>()
const chatInputRef = ref<InstanceType<typeof ChatInput>>()
const isAutoScrolling = ref(true)
const isTyping = ref(false)

const scrollToBottom = async () => {
  if (!isAutoScrolling.value) return

  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const streamInMessage = async () => {
  const currentMessage = messages.value.find((msg) => msg.id == currentMessageId.value)
  if (currentMessage) {
    currentMessage.text = streamData.content
  }
}

const showTypingIndicator = async () => {
  isTyping.value = true

  const typingMessage: Message = {
    id: 'typing-indicator',
    text: 'AI is typing...',
    sender: 'ai',
    timestamp: new Date(),
    senderName: 'AI Assistant',
    status: 'read',
  }

  messages.value.push(typingMessage)
  await scrollToBottom()

  return typingMessage
}

const removeTypingIndicator = (typingMessage: Message) => {
  const index = messages.value.findIndex((msg) => msg.id === typingMessage.id)
  if (index !== -1) {
    messages.value.splice(index, 1)
  }
  isTyping.value = false
}

const handleSendMessage = async (text: string) => {
  // Set loading state
  chatInputRef.value?.setLoading(true)

  // Create user message
  const newMessage: Message = {
    id: uuid.v4(),
    text,
    sender: 'user',
    timestamp: new Date(),
    senderName: 'You',
    status: 'sending',
  }

  // Add user message immediately (no setTimeout)
  messages.value.push(newMessage)
  await scrollToBottom()

  // Update user message status
  setTimeout(() => {
    newMessage.status = 'sent'
  }, 300)

  setTimeout(() => {
    newMessage.status = 'delivered'
  }, 600)

  setTimeout(() => {
    newMessage.status = 'read'
  }, 900)

  // Create AI response message with empty text for streaming
  currentMessageId.value = uuid.v4()

  const aiResponse: Message = {
    id: currentMessageId.value,
    text: '', // Start with empty text for streaming
    sender: 'ai',
    timestamp: new Date(),
    senderName: 'AI Assistant',
    status: 'read',
  }

  // Add AI message to array before starting stream
  messages.value.push(aiResponse)
  await scrollToBottom()

  // Start streaming
  await handleStartStream(text)

  // Remove loading state
  chatInputRef.value?.setLoading(false)
}

const handleScroll = () => {
  if (!messagesContainer.value) return

  const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
  isAutoScrolling.value = scrollHeight - scrollTop - clientHeight < 100
}

watch(messages, scrollToBottom, { deep: true })
watch(streamData, streamInMessage, { deep: true })

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Chat Header -->
    <ChatHeader :user="chatUser" />

    <!-- Messages Container -->
    <div
      ref="messagesContainer"
      @scroll="handleScroll"
      class="flex-1 overflow-y-auto py-4 space-y-2"
    >
      <div class="min-h-full">
        <ChatMessage v-for="message in messages" :key="message.id" :message="message" />

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex justify-start mb-4 px-4">
          <div class="flex-shrink-0 mr-3 mt-1">
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
          </div>
          <div
            class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs"
          >
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div
                class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style="animation-delay: 0.1s"
              ></div>
              <div
                class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style="animation-delay: 0.2s"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to bottom button -->
    <Transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-2"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="!isAutoScrolling" class="absolute bottom-24 right-8">
        <button
          @click="scrollToBottom"
          class="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </Transition>

    <!-- Chat Input -->
    <ChatInput ref="chatInputRef" @send-message="handleSendMessage" />
  </div>
</template>