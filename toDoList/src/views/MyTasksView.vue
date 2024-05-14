<script setup lang="ts">
import AddPostIt from '@/components/AddPostIt.vue'
import EditPostIt from '@/components/EditPostIt.vue'
import { toDoListStore } from '@/stores/toDoListStore'
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const { toDoList } = storeToRefs(toDoListStore())
const toDoItems = toDoListStore()
toDoItems.closeAll()
const tasksLength = computed(() => {
  return `${toDoList.value.filter((i) => {
    return !i.isDone
  }).length} tasks left`
})


const target = ref()
const mouseXPos = ref(0)
const mouseYPos = ref(0)
const pageX = ref(0)
const pageY = ref(0)
const x = ref(0)
const y = ref(0)
const startChange = ref(false)

const dragStart = (event: any, index: number) => {
  event.preventDefault()
  toDoItems.setDragIndex(index.toString())
  startChange.value = true
  target.value = document.getElementById(`${index}EDit`)
  target.value.style.zIndex = 1
  target.value.classList.add('tasksShadow')
  mouseXPos.value = event.clientX
  mouseYPos.value = event.clientY
  pageX.value = event.pageX
  pageY.value = event.pageY
  document.addEventListener("mousemove", dragover)
}

const dragover = (event: any) => {
  if (target.value) {
    const diffX = event.pageX - pageX.value
    const diffY = event.pageY - pageY.value
    x.value += diffX
    y.value += diffY
    target.value.style.left = `${x.value}px`
    target.value.style.top = `${y.value}px`
    mouseXPos.value = event.clientX
    mouseYPos.value = event.clientY
    pageX.value = event.pageX
    pageY.value = event.pageY
  }

}

const dragend = () => {
  document.removeEventListener("mousemove", dragover)
  if (target.value) {
    target.value.classList.remove("tasksShadow")
    target.value.style.left = '0px'
    target.value.style.top = '0px'
    target.value.style.zIndex = 0
    target.value = null
    x.value = 0
    y.value = 0
    setTimeout(() => { startChange.value = false }, 10)
  }
}

const changeItems = (e: Event, index: number) => {
  if (!startChange.value) return 0
  toDoItems.changeItems(index.toString())
  startChange.value = false

}


window.addEventListener("mouseup", dragend)
</script>
<template>
  <div>
    <div class="mt-2 mb-2">
      <AddPostIt />
    </div>
    <div class="mt-2 mb-2">
      <div v-for=" (it, index) in toDoList" :key="index" :id="`${index}EDit`" draggable="true"
        @dragstart="(d) => { dragStart(d, index) }" @dragend="() => { dragend() }"
        @mouseenter="(e) => { changeItems(e, index) }" class="pt-5px pb-5px relative">
        <EditPostIt class="relative tasksShadow" :data="it" :index="index" />
      </div>

    </div>
    <div class="status ms-3% w-full">{{ tasksLength }}</div>
  </div>
</template>

<style>
.item {
  width: 100px;
  height: 100px;
  opacity: 0.5;
  touch-action: none;
  user-select: none;
  position: absolute;
  border-radius: 50px;
}

.tasksShadow .tasksShadow {
  box-shadow: 0px 0px 30px black;
  ;
}
</style>
