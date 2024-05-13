<script setup lang="ts">
import AddInput from '@/components/addInput.vue'
import EditInput from '@/components/editInput.vue'
import { type postIt } from '@/components/types/type'
import { timeStore } from '@/stores/timeStore'
import { computed, ref } from 'vue';

const props = defineProps<postIt>()

const { uploadedTime } = timeStore()

const emit = defineEmits(['save', 'cancle'])

const editData = ref<postIt>({
  ...props
})

const sameSame = () => {
  editData.value = {
    ...props
  }
}

const textAreaStatus = ref(true)


//檔案上傳
//檔案上傳(暫時無解)
//檔案上傳(暫時無解)
//檔案上傳(暫時無解)
const changeFile = (data: any) => {
  if (data.target.files[0].size > 200000) (editData.value.file = { file: null, name: data.target.files[0].name, date: new Date() })
  editData.value.file = { file: data.target.files[0], name: data.target.files[0].name, date: new Date() }
}
//檔案上傳時間判斷
const fileTime = computed(() => {
  if (!editData.value.file?.date) return ''
  return uploadedTime(new Date(editData.value.file.date))
})

// focus 後便條紙展開功能
const isFocus = ref(false)
const focusH = ref(false)
const divH = computed(() => {
  if (focusH.value || editData.value.isEdit) return ' postit-open  postit-box-shadow-bg-2'
  // if (editData.value.deadLineDate || editData.value.file || editData.value.comment) return ' postit-close  '
  return ' postit-close'
})
const focus = () => {
  editData.value.isEdit = true
  isFocus.value = true
  focusH.value = true
}

const blur = () => {
  editData.value.isEdit = false
  focusH.value = false
  setTimeout(() => {
    isFocus.value = false
  }, 400)
}

const save = () => {
  if (!editData.value.title?.trim()) return 0
  if (isFocus.value === false) return 0
  blur()
  emit('save', editData.value)
}

const cancle = () => {
  blur()
  sameSame()
  emit('cancle', props)
}
</script>
<template>
  <!-- 新增 便條紙 點擊後展開 -->
  <div :class="`w-310px md:w-620px ${divH} overflow-hidden`">
    <!-- 新增顯示 ADD -->
    <AddInput tabindex="0" @focus="() => focus()" @click="() => { sameSame(); focus() }" v-if="props.status === 'add'"
      v-show="!isFocus" />
    <!-- 展開內容框 -->
    <div :class="`${divH} relative bg-bg-1 overflow-hidden rd-1`">
      <!-- 上方title -->
      <!-- 如果是編輯狀態，控制是否為輸入框 -->
      <EditInput tabindex="0" :isTitle="!editData.isEdit" v-model="editData"
        @send-status="() => props.status === 'edit' && emit('save', { isDone: editData.isDone, isImportant: editData.isImportant })"
        @click="() => { editData.isEdit && (isFocus = true) }" />
      <!-- 中間 項目詳細 -->
      <div class="m-t-3 flex justify-center">
        <div class="w-80%">
          <!-- 時間選擇 -->
          <div class="h90px">
            <div class="flex children:m-2 items-center">
              <i class="fa-solid fa-calendar-days" style="color: #000000;"></i>
              <div class="subtitle">DeadLine</div>
            </div>
            <div class="subtitle ms-38px flex">
              <div class="w-162px">
                <VueDatePicker v-model="editData.deadLineDate" format="yyyy/MM/dd" hide-input-icon
                  inputClassName="post-border-style" placeholder="yyyy/mm/dd" :enable-time-picker="false" />
              </div>
              <div class="w-162px ms-2">
                <VueDatePicker v-model="editData.deadLineTime" format="hh:mm" hide-input-icon time-picker
                  inputClassName="post-border-style" placeholder="hh:mm" />
              </div>
            </div>
          </div>
          <!-- 檔案選擇 -->
          <div class="h90px">
            <div class="flex children:m-2 items-center">
              <i class="fa-regular fa-file" style="color: #000000;"></i>
              <div class="subtitle">File</div>
            </div>
            <div class="subtitle ms-38px flex items-center">
              <div class="me-2">
                <div class="paragraph">{{ editData.file?.name }}</div>
                <div class="placeholder">{{ fileTime }}</div>
              </div>
              <label>
                <input @change="(data: any) => changeFile(data)" type="file" style="display: none;">
                <i @click="() => editData.isEdit = true"
                  class="fa-solid fa-square-plus cursor-pointer fa-xl text-bg-2 hover:text-base"></i>
              </label>
            </div>
          </div>
          <!-- 備註 -->
          <div>
            <div class="flex children:m-2 items-center">
              <i class="fa-regular fa-comment-dots" style="color: #000000;"></i>
              <div class="subtitle">Comment</div>
            </div>
            <div class="subtitle ms-38px flex items-center">
              <textarea @dblclick="textAreaStatus = false" @blur="textAreaStatus = true" :readonly="textAreaStatus"
                v-model="editData.comment"
                class="w-400px resize-none min-h-100px paragraph post-border-style"></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- 下方 取消 送出 -->
      <div v-show="editData.isEdit" class="absolute bottom-0 h-60px w-full flex cursor-pointer">
        <div @click="() => cancle()"
          class="w-50% bg-bg-4 title text-danger flex items-center justify-center box-border hover:border-solid post-border-danger">
          <i class="fa-solid fa-x fa-xs me-3"></i> <span>Cancel</span>
        </div>
        <div @click="() => save()"
          class="w-50% bg-base title text-bg-4 flex items-center justify-center post-border-style">
          <i class="fa-solid fa-plus fa-sm me-3"></i>
          <span v-if="props.status === 'add'">Add Task</span>
          <span v-else>Save</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.postit-open {
  height: 520px;
  transition: 500ms ease-in-out;
}

.postit-close {
  height: 65px;
  transition: 500ms ease-in-out;
}

.post-border-style {
  box-sizing: border-box;
  border-radius: 2px;
  border: none;
}

.post-border-style:focus {
  outline: none;
}

.post-border-style:hover {
  border: 1px solid var(--base);
  box-shadow: 0 0 4px var(--base);
}

.post-border-danger:hover {
  border-color: var(--danger);
  border: 1px solid var(--danger);
  box-shadow: 0 0 4px var(--danger);
}
</style>