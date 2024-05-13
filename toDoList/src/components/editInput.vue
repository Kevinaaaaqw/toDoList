<script setup lang="ts">
import starSolid from '@/components/icons/star-solid.svg'
import starRegular from '@/components/icons/star-regular.svg'
import ChexkBox from '@/components/CheckBox.vue'
import solidPen from '@/components/icons/solid-pen.vue'
import solidPenEdit from '@/components/icons/solid-pen-edit.vue'
import { type editInput, type postIt } from '@/components/types/type'

import { computed } from 'vue'

const props = defineProps<editInput>()
const model = defineModel<postIt>()
const emit = defineEmits(['sendStatus'])

//切換是否為重要Mask
const handelisImportant = () => {
    if (model.value) (model.value.isImportant = !model.value.isImportant, emit('sendStatus'))
}

//點擊編輯鈕展開
const turnIsEdit = () => {
    if (model.value) (model.value.isEdit = true)
}

//完成Mask後title需有刪除線
const isDoneCSS = computed(() => {
    if (model.value?.isDone) return 'decoration-line-through'
    return ''
})

const isImportantCSS = computed(() => {
    if (model.value?.isImportant) return 'bg-choose'
    return ''
})

const divH = computed(() => {
    if ((model.value?.deadLineDate || model.value?.file.file || model.value?.comment) && !model.value?.isEdit) return 'h-105px'
    return 'h-75px'
})

//時間
const time = computed(() => {
    if (model.value?.deadLineDate) {
        let t = new Date(model.value?.deadLineDate)
        if (t.getFullYear() !== new Date().getFullYear()) {
            return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}`
        }
        return `${t.getMonth() + 1}/${t.getDate()}`
    }
    return ''
})


</script>
<template>
    <div :class="`${isImportantCSS} ${divH} relative post-hr flex flex-wrap w-full`">
        <div :class="`w-full h-75px relative flex items-center justify-between children:m-e-3% children:m-s-3%`">
            <div class="flex h-75px  items-center">
                <ChexkBox v-if="model" v-model="model.isDone" size="md" @change="() => emit('sendStatus')" />
                <input v-if="model && !props.isTitle" type="text" v-model="model.title"
                    :class="`${isDoneCSS} border-none h-28px focus:outline-none w-150px md:w-400px bg-bg-1/0 title cursor-pointer hover:bg-bg-6 placeholder:title`"
                    placeholder="Type Something Here…" />

                <div v-else>
                    <div
                        :class="`${isDoneCSS} border-none h-28px focus:outline-none w-150px md:w-400px title relative`">
                        <div>
                            {{ model?.title }}
                        </div>
                    </div>
                    <div class="absolute children:me-3 p-t-1 h-24px flex items-center placeholder">
                        <div v-if="model?.deadLineDate">
                            <i v-if="model?.deadLineDate" class="fa-solid fa-calendar-days"></i>
                            {{ time }}
                        </div>
                        <i v-if="model?.file.file" class="fa-regular fa-file"></i>
                        <i v-if="model?.comment" class="fa-regular fa-comment-dots"></i>
                    </div>
                </div>
            </div>
            <!-- 圖示狀態 -->
            <div class="flex items-center children:ms-3 children:cursor-pointer">
                <div @click="() => handelisImportant()">
                    <img v-if="model && model.isImportant" class="w-24px" :src="starSolid" alt="">
                    <img v-else class="w-24px" :src="starRegular" alt="">
                </div>
                <div>
                    <solidPen v-if="model && model.isEdit" class="me-3 font-size-24px" />
                    <solidPenEdit v-else class="me-3 font-size-24px" @click="() => turnIsEdit()" />
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.post-hr::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    top: 100%;
    box-sizing: content-box;
    border: solid var(--bg-2);
    border-width: 3px 0 0 0;
}
</style>