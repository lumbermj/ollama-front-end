<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import ChatHeader from '@/components/ChatHeader.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import ChatInput from '@/components/ChatInput.vue'
import type { ChatUser, Message } from '@/types/chat'

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

const generateAIResponse = (userMessage: string): string => {
  const responses = [
    "That's a great question! Let me think about that for a moment...",
    "I understand what you're asking. Here's what I think:",
    "Interesting point! Based on my knowledge, I'd say:",
    "Thanks for asking! Here's my perspective on that:",
    "That's something I can definitely help with. Let me explain:",
    "Great question! I'd be happy to help you with that.",
    "I see what you're getting at. Here's my take:",
    "That's a thoughtful question. From what I understand:",
    "I'm glad you asked! This is actually quite interesting:",
    'Let me break that down for you:',
  ]

  const followUps = [
    "Is there anything specific about this topic you'd like me to elaborate on?",
    'Would you like me to explain any part of this in more detail?',
    'Do you have any follow-up questions about this?',
    'Is this helpful, or would you like me to approach it differently?',
    'Let me know if you need clarification on any part of this!',
    'Feel free to ask if you want to explore this topic further.',
    "Is there another aspect of this you'd like to discuss?",
    'Would you like some examples to illustrate this better?',
    'Does this answer your question, or should I provide more details?',
    'What other questions do you have about this topic?',
  ]

  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)]

  // Generate a contextual response based on user input
  let contextualResponse: string
  const lowerMessage = userMessage.toLowerCase()

  if (
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi') ||
    lowerMessage.includes('hey')
  ) {
    contextualResponse =
      "Hello there! It's great to meet you. I'm here and ready to help with whatever you need."
  } else if (lowerMessage.includes('help')) {
    contextualResponse =
      "I'd be happy to help! I can assist with a wide variety of topics including answering questions, providing explanations, helping with problem-solving, creative tasks, and much more."
  } else if (lowerMessage.includes('what') && lowerMessage.includes('you')) {
    contextualResponse =
      "I'm an AI assistant designed to be helpful, harmless, and honest. I can help with information, analysis, creative tasks, problem-solving, and engaging conversation on a wide range of topics."
  } else if (lowerMessage.includes('how') && lowerMessage.includes('you')) {
    contextualResponse =
      "I'm doing well, thank you for asking! I'm here and ready to assist you with whatever you need help with today."
  } else {
    contextualResponse = `${randomResponse}\n\nRegarding "${userMessage}" - this is an interesting topic that I'd be happy to explore with you. While I don't have real-time information, I can share insights based on my training data.\n\n${randomFollowUp}`
  }

  return contextualResponse
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

  const newMessage: Message = {
    id: Date.now().toString(),
    text,
    sender: 'user',
    timestamp: new Date(),
    senderName: 'You',
    status: 'sending',
  }

  messages.value.push(newMessage)
  await scrollToBottom()

  // Simulate message status updates
  setTimeout(() => {
    newMessage.status = 'sent'
  }, 300)

  setTimeout(() => {
    newMessage.status = 'delivered'
  }, 600)

  // Show typing indicator
  const typingMessage = await showTypingIndicator()

  // Simulate AI thinking time
  const thinkingTime = 1500 + Math.random() * 2000

  setTimeout(async () => {
    // Remove typing indicator
    removeTypingIndicator(typingMessage)

    // Generate AI response
    const aiResponseText = generateAIResponse(text)

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date(),
      senderName: 'AI Assistant',
      status: 'read',
    }

    messages.value.push(aiResponse)
    newMessage.status = 'read'

    // Remove loading state
    chatInputRef.value?.setLoading(false)

    await scrollToBottom()
  }, thinkingTime)
}

const handleScroll = () => {
  if (!messagesContainer.value) return

  const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
  isAutoScrolling.value = scrollHeight - scrollTop - clientHeight < 100
}

watch(messages, scrollToBottom, { deep: true })

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