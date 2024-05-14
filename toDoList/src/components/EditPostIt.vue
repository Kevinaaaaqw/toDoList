<script setup lang="ts">
import EditInput from '@/components/editInput.vue'
import DetailDiv from '@/components/DetailDiv.vue'
import PostItButton from '@/components/PostItButton.vue'
import { toDoListStore } from '@/stores/toDoListStore'
import { computed, ref, watch } from 'vue';
import type { postIt } from './types/type'

const { editDataList } = toDoListStore()
const props = defineProps<{ data: postIt, index: number }>()
const editData = ref<postIt>({
    ...props.data
})

watch(props, () => {
    editData.value = { ...props.data }
})

const sendStatus = () => {
    if (editData.value.isDone) {
        editData.value.isImportant = false
        editDataList({ isDone: editData.value.isDone, isImportant: editData.value.isImportant, isEdit: editData.value.isEdit }, props.index)
    }
    editDataList({ isDone: editData.value.isDone, isImportant: editData.value.isImportant, isEdit: editData.value.isEdit }, props.index)
    toDoListStore().sortTodolist()
}

const cancle = () => {
    editDataList({ isEdit: false }, props.index)
    editData.value = { ...props.data }
}

const save = () => {
    editDataList({ ...editData.value, isEdit: false }, props.index)
    editData.value = { ...props.data }
}

const divCSS = computed(() => {
    if (editData.value.isEdit) return 'md:w-620px h520px duration-500 bg-bg-1 rd-1 outline-none'
    if (editData.value.deadLineDate || editData.value.file.file || editData.value.comment) return 'w-310px md:w-620px h-102px duration-500 bg-bg-1 box-border rd-1 add cursor-pointer'
    return 'w-310px md:w-620px h-76px duration-500 bg-bg-1 box-border rd-1 add cursor-pointer'
})




</script>
<template>
    <div tabindex="0" :class="`${divCSS} relative w-310px overflow-hidden editPostIt-show`">
        <div class="absolute left-1.1 top-50% translate-y--50% z-1 hidden editPostIt-show">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <!-- Edit Form -->
        <EditInput v-model="editData" :isTitle="!editData?.isEdit" @sendStatus="sendStatus" />
        <DetailDiv v-model="editData" />
        <PostItButton v-if="editData.isEdit" :onCancle="() => cancle()" :onSave="() => save()" :status="'edit'" />
    </div>
</template>
<style>
.editPostIt-show:hover .editPostIt-show {
    display: block;
}
</style>