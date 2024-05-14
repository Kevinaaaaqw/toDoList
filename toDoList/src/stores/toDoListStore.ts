import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type postIt } from '@/components/types/type'


export const toDoListStore = defineStore('toDoList', () => {
    const toDoList = ref<postIt[]>([])

    const addTodolist = (mask: postIt) => {
        toDoList.value.push(mask)
        sortTodolist()
    }

    const editDataList = (data: object, index: number) => {
        toDoList.value[index] = { ...toDoList.value[index], ...data }
    }

    const sortTodolist = () => {
        const array = [...toDoList.value]
        array.sort((a: postIt, b: postIt) => {
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
        })
        toDoList.value = array
    }

    const reset = () => {
        toDoList.value = []
    }

    const closeAll = () => {
        toDoList.value = toDoList.value.map((i) => {
            return { ...i, isEdit: false }
        })
    }

    const dragItem = ref<postIt>()

    const dragIndex = ref<string>()

    const setDragIndex = (index: string) => {
        dragIndex.value = index
    }

    const changeItems = (index: string) => {
        if (dragIndex.value && isNaN(parseInt(dragIndex.value))) return 0
        const num = parseInt(dragIndex.value as string)
        dragItem.value = toDoList.value[parseInt(index)]
        toDoList.value[parseInt(index)] = toDoList.value[num]
        toDoList.value[num] = dragItem.value
        sortTodolist()
    }

    return { toDoList, addTodolist, sortTodolist, editDataList, reset, closeAll, setDragIndex, changeItems }
}, { persist: { storage: localStorage } })