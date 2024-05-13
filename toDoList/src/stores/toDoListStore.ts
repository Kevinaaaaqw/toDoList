import { ref, computed } from 'vue'
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
        // console.log(toDoList.value)
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
        console.log(array)
        toDoList.value = array
        // console.log(toDoList.value)
    }

    const reset = () => {
        toDoList.value = []
    }

    const closeAll = () => {
        toDoList.value = toDoList.value.map((i) => {
            return { ...i, isEdit: false }
        })
    }

    return { toDoList, addTodolist, sortTodolist, editDataList, reset, closeAll }
}, { persist: { storage: localStorage } })