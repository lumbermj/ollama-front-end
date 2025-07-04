<script setup lang="ts">
  import logo from "@/assets/logo-white-1.png";
</script>

<template>
  <header class="bg-violet-950 text-white py-12 mb-12 relative overflow-hidden">
    <!-- Background Logo (Large, Transparent) -->
    <div class="absolute inset-0 flex items-center justify-center opacity-5">
      <div class="w-96 h-96 bg-white rounded-full flex items-center justify-center">
        <!-- Placeholder for large background logo -->
        <svg class="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"/>
        </svg>


      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
        <!-- Left side: University Logo -->
        <div class="flex flex-col items-center lg:items-start">
          <div class="w-48 h-48 lg:w-64 lg:h-64 bg-opacity-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <!-- Main University Logo Placeholder -->
<!--            <svg class="w-12 h-12 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">-->
<!--              <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"/>-->
<!--            </svg>-->

            <img :src="logo" alt="SVU LOGO">
          </div>
<!--          <div class="text-center lg:text-left">-->
<!--            <h2 class="text-lg lg:text-xl font-academic font-semibold text-blue-100">-->
<!--              University of Academic Excellence-->
<!--            </h2>-->
<!--            <p class="text-sm lg:text-base text-blue-200">-->
<!--              Department of Computer Science & Engineering-->
<!--            </p>-->
<!--          </div>-->
        </div>

        <!-- Right side: Project Title -->
        <div class="text-center lg:text-right flex-1 lg:max-w-2xl">
          <h1 class="text-3xl lg:text-5xl font-academic font-bold mb-3 leading-tight">
            Project Contributors
          </h1>
          <p class="text-lg lg:text-xl text-blue-100 mb-2">
            BPR601
          </p>
          <p class="text-base lg:text-lg text-blue-200">
            S24
          </p>
          <p class="text-base lg:text-lg text-blue-200">
            Prof. Ali Nidal Muhammed
          </p>
        </div>
      </div>
    </div>
  </header>
</template>