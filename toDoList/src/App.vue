<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MenuList from '@/components/MenuList.vue'
</script>

<template>
  <MenuList />
  <div class="bg-bg-6 w-full flex justify-center min-h-100vh">
    <RouterView />
  </div>
</template>
<style>
:root {
  --base: #4A90E2;
  --bg-4: #FFFFFF;
  --bg-2: #C8C8C8;
  --danger: #D0021B;
}
</style>
