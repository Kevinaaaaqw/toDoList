import {defineConfig} from 'unocss'

export default defineConfig({
    rules:[
    ],

    //自訂義綜合class
    shortcuts:{
        'title': 'font-size-24px text-bg-5',
        'subtitle': 'font-size-20px text-bg-5',
        'paragraph': 'font-size-16px text-bg-5',
        'remerk': 'font-size-24px text-bg-3',
        'placeholder': 'font-size-16px text-bg-3',
        'status': 'font-size-24px text-bg-2',
    },

    //自訂主題
    theme:{
        colors:{
            'base':'#4A90E2',
            'sub':'#00408B',
            'danger':'#D0021B',
            'warning':'#F5A623',
            'choose':'#FFF2DC',
            'bg-1':'#F2F2F2',
            'bg-2':'#C8C8C8',
            'bg-3':'#757575',
            'bg-4':'#FFFFFF',
            'bg-5':'#000000',
            'bg-6':'#E1E1E1',
        }
    }
})