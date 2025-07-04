<template>
  <div class="min-h-screen bg-academic-light-gray">
    <!-- University Header -->
    <UniversityHeader />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <!-- Introduction Section -->
      <section class="text-center mb-12">
        <p class="text-lg text-academic-gray max-w-3xl mx-auto leading-relaxed">
          This project was developed and brought to live by the contributors who their names are listed below to achieve the university and course academic goals.
        </p>
      </section>

      <!-- Additional Information -->
      <section class=" bg-white rounded-xl shadow-academic p-8">
        <div class="text-center">
          <h3 class="text-xl font-academic font-semibold mb-4 text-academic-dark-gray">
            Project Overview
          </h3>
          <p class="text-academic-gray mb-6 max-w-4xl mx-auto">
            advanced customer service chatbot that uses natural language processing to instantly understand and accurately answer customer questions - including slang, abbreviations, and everyday phrases. This smart solution automatically handles common inquiries to reduce staff workload while providing 24/7 support across all devices.
          </p>

          <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div class="flex items-center justify-center gap-2">
              <span class="tag-backend">Backend</span>
              <span class="text-academic-gray">Server Development</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <span class="tag-datasets">Datasets</span>
              <span class="text-academic-gray">Data Management</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <span class="tag-frontend">Frontend</span>
              <span class="text-academic-gray">User Interface</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <span class="tag-ai">AI</span>
              <span class="text-academic-gray">Machine Learning</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Contributors Grid -->
      <section>
        <h2 class="mt-16 text-2xl font-academic font-bold text-center mb-8 text-academic-dark-gray">
          Students
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ContributorCard
            v-for="contributor in contributors"
            :key="contributor.id"
            :contributor="contributor"
          />
        </div>
      </section>


    </main>

    <!-- University Footer -->
    <UniversityFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContributorCard from '@/components/ContributorCard.vue';
import UniversityHeader from '@/components/UniversityHeader.vue';
import UniversityFooter from '@/components/UniversityFooter.vue';
import { contributors } from '@/data/contributors';

const maintainerCount = computed(() =>
  contributors.filter(c => c.role === 'Maintainer').length
);

const developerCount = computed(() =>
  contributors.filter(c => c.role === 'Developer').length
);

const totalContributions = computed(() =>
  contributors.reduce((total, contributor) => total + contributor.contributions.length, 0)
);
</script>