<script setup lang="ts">
import AddPostIt from '@/components/AddPostIt.vue'
import EditPostIt from '@/components/EditPostIt.vue'
import { toDoListStore } from '@/stores/toDoListStore'
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const { toDoList } = storeToRefs(toDoListStore())
toDoListStore().closeAll()
watch(toDoList.value, () => {
  // console.log(toDoList)
})



let array = [{ isImportant: false, isDone: true }, { isImportant: false, isDone: true }, { isImportant: false, isDone: false }, { isImportant: true, isDone: false }, { isImportant: true, isDone: false }]
console.log(
  array.sort((a, b) => {
    if (a.isImportant && !b.isImportant) {
      return -1;
    }
    if (!a.isImportant && b.isImportant) {
      return 1;
    }
    if (a.isDone && !b.isDone) {
      return 1;
    }
    if (!a.isDone && b.isDone) {
      return -1;
    }
    return 0;
  }))



</script>
<template>
  <div>
    <div class="mt-2 mb-2">
      <AddPostIt />
    </div>
    <div class="mt-2 mb-2">
      <!-- <PostIt class="mt-2 mb-2" v-for="(i, index) in toDoList" :key="index" :title="i?.title" :isDone="i.isDone"
        :isImportant="i.isImportant" :is-edit="i.isEdit" :deadLineDate="i.deadLineDate" :deadLineTime="i.deadLineTime"
        :file="i.file" :comment="i.comment" status="edit" @cancle="(data) => cancleData(data, index)"
        @save="(data) => editData(data, index)" /> -->
      <EditPostIt class="mt-3 mb-3" v-for=" (it, index) in toDoList" :key="index" :data="it" :index="index" />
    </div>
  </div>
</template>

<style></style>
