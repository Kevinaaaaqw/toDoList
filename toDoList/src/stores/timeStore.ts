// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const timeStore = defineStore('uploadedTime', () => {

  //判断一個日期是否是當前的昨天
  const uploadedTime = (target: Date) => {
    const targetTime = target.getTime()  //  檔案上傳時間
    const now = new Date()               //  現在時間
    const nowZero = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`).getTime(); //當日0時

    const nowTime = now.getTime() - targetTime
    const day = (nowZero - targetTime) / (24 * 3600 * 1000) //

    if (nowTime < 1000 * 3600) return `uploaded ${Math.floor(nowTime / 1000 / 60)} minute ago`
    if (nowTime < 1000 * 3600 * 24 && day < 0) return `uploaded ${Math.floor(nowTime / 1000 / 60 / 60)} hour ago`
    if (day < 1) return 'uploaded yesterday'
    if (day < 2) return 'uploaded two days ago'
    return 'uploaded ' + target.getDate()
  }

  return { uploadedTime }
})
