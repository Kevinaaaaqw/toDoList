<script setup lang="ts">
import AddPostIt from '@/components/AddPostIt.vue'
import EditPostIt from '@/components/EditPostIt.vue'
import { toDoListStore } from '@/stores/toDoListStore'
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { type postIt } from '@/components/types/type'
import draggable from 'vuedraggable'; //引入

const { toDoList } = storeToRefs(toDoListStore())
const toDoItems = toDoListStore()
toDoItems.closeAll()

const tasksLength = computed(() => {
    return `${toDoList.value.filter((i) => {
        return !i.isDone
    }).length} tasks left`
})

const hiddenCSS = (it: postIt) => {
    if (it.isDone) return 'hidden'
}

</script>
<template>
    <div>
        <div class="mt-2 mb-2">
            <draggable v-model="toDoList" @change="() => {
                toDoItems.sortTodolist();
            }">
                <template #item="{ element, index }">
                    <EditPostIt :key="index" :class="`${hiddenCSS(element)} mt-3 mb-3`" :data="element"
                        :index="index" />
                </template>
            </draggable>
        </div>
        <div class="status ms-3% w-full">{{ tasksLength }}</div>
    </div>
</template>