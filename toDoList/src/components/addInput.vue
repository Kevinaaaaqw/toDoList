<script setup lang="ts">
import Plus from '@/components/icons/plus-solid.svg'
</script>
<template>
    <div
        class="w-310px md:w-620px h-65px bg-bg-4 border-solid border-bg-2 border-2px box-border rd-1 flex items-center add children:pe-2 cursor-pointer">
        <img class="w-20px h-20px ms-3%" :src="Plus" />
        <span>Add Task</span>
    </div>
</template>