<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MenuList from '@/components/MenuList.vue'
</script>

<template>
  <MenuList />
  <div class="bg-bg-6 w-full flex justify-center">
    <RouterView />
  </div>
</template>
