import { defineStore } from 'pinia'
import { chinese } from '@/language/chinese'
import { english } from '@/language/english'
import { ref } from 'vue'

export const languageStore = defineStore('language', () => {
    const lang = ref(chinese)

    const allLang = [chinese, english]

    return { lang, allLang }


})