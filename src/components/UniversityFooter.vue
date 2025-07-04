<script setup lang="ts">
import logo from "@/assets/logo-white-1.png";
</script>

<template>
  <footer class="bg-academic-dark-gray text-white py-12 mt-16 relative overflow-hidden">
    <!-- Background Logo (Large, Transparent) -->
    <div class="absolute inset-0 flex items-center justify-center opacity-3">
      <div class="w-80 h-80 flex items-center justify-center">
        <!-- Placeholder for large background logo -->
        <svg class="w-56 h-56 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"/>
        </svg>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
        <!-- Left side: University Logo and Info -->
        <div class="flex flex-col items-center lg:items-start">
          <div class="w-48 h-48 lg:w-64 lg:h-64 bg-opacity-10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
<!--            &lt;!&ndash; Footer University Logo Placeholder &ndash;&gt;-->
<!--            <svg class="w-10 h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">-->
<!--              <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"/>-->
<!--            </svg>-->
          <img :src="logo" alt="SVU LOGO">
          </div>
        </div>

        <!-- Right side: Project Details -->
        <div class="text-center lg:text-right">
          <div class="mb-4">
            <h4 class="text-lg lg:text-xl font-sans font-semibold mb-2">
              BPR601 - Project I
            </h4>
            <p class="text-gray-300 text-sm lg:text-base">
              Machine Learning & Software Engineering Departments
            </p>
          </div>

<!--          <div class="flex flex-wrap justify-center lg:justify-end items-center gap-3 text-xs lg:text-sm text-gray-400">-->
<!--            <span>© 2024 University Project</span>-->
<!--            <span class="hidden sm:inline">•</span>-->
<!--            <span>Research & Development</span>-->
<!--            <span class="hidden sm:inline">•</span>-->
<!--            <span>Academic Excellence</span>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </footer>
</template>