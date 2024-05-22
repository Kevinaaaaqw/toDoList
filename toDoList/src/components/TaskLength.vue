<script setup lang="ts">
import { languageStore } from '@/stores/languageStore'
import { toDoListStore } from '@/stores/toDoListStore'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps<{ taskCountType: 'taskLeft' | 'taskCompleted' }>()
const { lang } = storeToRefs(languageStore())
const { toDoList } = storeToRefs(toDoListStore())

const tasksLength = computed(() => {
    return `${toDoList.value.filter((i) => {
        return !i.isDone
    }).length} ${lang.value[props.taskCountType]}`
})

</script>
<template>
    <div class="status ms-3%">
        {{ tasksLength }}
    </div>
</template>