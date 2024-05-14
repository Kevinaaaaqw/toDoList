<script setup lang="ts">
const props = defineProps<{ status?: 'edit' | 'add' }>()
const emit = defineEmits(['save', 'cancle'])
</script>
<template>
    <div class="absolute bottom-0 h-60px w-full flex cursor-pointer">
        <div @click="() => emit('cancle')"
            class="w-50% bg-bg-4 title text-danger flex items-center justify-center box-border">
            <i class="fa-solid fa-x fa-xs me-3"></i> <span>Cancel</span>
        </div>
        <div @click="() => emit('save')" class="w-50% bg-base title text-bg-4 flex items-center justify-center">
            <i class="fa-solid fa-plus fa-sm me-3"></i>
            <span v-if="props.status === 'add'">Add Task</span>
            <span v-if="props.status === 'edit'">Save</span>
        </div>
    </div>
</template>