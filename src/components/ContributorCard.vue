<script setup lang="ts">
import { computed } from 'vue';
import type { Contributor } from '@/types/contributor';
import { contributors } from '../data/contributors.ts'

interface Props {
  contributor: Contributor;
}

const props = defineProps<Props>();

const genderIcon = computed(() => {
  switch (props.contributor.gender) {
    case 'male': return '♂';
    case 'female': return '♀';
    default: return '';
  }
});

const getContributionClass = (contribution: string) => {
  const lowerContribution = contribution.toLowerCase();
  if (lowerContribution.includes('backend')) return 'tag-backend';
  if (lowerContribution.includes('database')) return 'tag-database';
  if (lowerContribution.includes('frontend')) return 'tag-frontend';
  if (lowerContribution.includes('datasets')) return 'tag-datasets';
  if (lowerContribution.includes('devops')) return 'tag-deployment';
  if (lowerContribution.includes('research')) return 'tag-research';
  if (lowerContribution.includes('ui/ux')) return 'tag-ui-ux';
  if (lowerContribution.includes('ai')) return 'tag-ai';
  return 'bg-gray-500 text-white px-2 py-1 rounded-md text-xs font-medium';
};
</script>

<template>
  <div class="relative card-academic p-6 h-full flex flex-col">
    <div class="absolute p-1 bg-amber-500 text-md text-white font-bold rounded-tr-lg top-0 right-0">
      {{contributor.classId}}
    </div>

    <!-- Profile Section -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center">
        <!-- Name and Gender -->
        <div>
          <h3 class="text-lg font-semibold text-academic-dark-gray flex items-center gap-2">
            {{ contributor.name }}

          </h3>
<!--          <h4 class="text-xs opacity-60 font-bold text-sky-600 bg-sky-300 rounded-lg px-2">-->
<!--              {{ contributor.speciality }}-->
<!--            </h4>-->
          <h4 class="text-sm font-mono text-academic-dark-gray">{{ contributor.uid }}</h4>
        </div>
      </div>

      <!-- Contact Icon -->
<!--      <div v-if="contributor.contact" class="text-university-primary cursor-pointer hover:text-university-secondary transition-colors">-->
<!--        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>-->
<!--        </svg>-->
<!--      </div>-->
    </div>

    <!-- Role Badge -->

<!--    <div class="mb-2">-->
<!--      <span-->
<!--        :class="contributor.role === 'Maintainer' ? 'badge-maintainer' : 'badge-developer'"-->
<!--      >-->
<!--        <svg v-if="contributor.role === 'Maintainer'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">-->
<!--          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>-->
<!--        </svg>-->
<!--        {{ contributor.role }}-->
<!--      </span>-->
<!--    </div>-->
    <div class="mb-4">
      <span
        :class="contributor.speciality === 'Machine Learning' ? 'badge-machine-learning' : 'badge-software-engineering'"
      >
        {{ contributor.speciality }}
      </span>
    </div>

    <!-- Contributions Tags -->
    <div class="flex-1">
      <h4 class="text-sm font-medium text-academic-gray mb-2">Contributions</h4>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="contribution in contributor.contributions"
          :key="contribution"
          :class="getContributionClass(contribution)"
        >
          {{ contribution }}
        </span>
      </div>
    </div>
  </div>
</template>

