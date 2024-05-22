<script setup lang="ts">
import EditPostIt from '@/components/EditPostIt.vue'
import { toDoListStore } from '@/stores/toDoListStore'
import { storeToRefs } from 'pinia';
import TaskLength from '@/components/TaskLength.vue'
import LanguageSelect from '@/components/LanguageSelect.vue'
import { type postIt } from '@/components/types/type'
import draggable from 'vuedraggable'; //引入

const { toDoList } = storeToRefs(toDoListStore())
const toDoItems = toDoListStore()
toDoItems.closeAll()


const hiddenCSS = (it: postIt) => {
    if (!it.isDone) return 'hidden'
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
        <div class="flex justify-between">
            <TaskLength task-count-type="taskCompleted" />
            <LanguageSelect />
        </div>
    </div>
</template>