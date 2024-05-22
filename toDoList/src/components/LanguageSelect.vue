<script setup lang="ts">
import { languageStore } from '@/stores/languageStore'
import { storeToRefs } from 'pinia'

const language = languageStore()

const { lang } = storeToRefs(languageStore())

</script>
<template>
    <select @change="() => { console.log(lang) }" v-model="lang">
        <option v-for="(i, index) in language.allLang" :key="index" :value="i">{{ i.language }}</option>
    </select>
</template>