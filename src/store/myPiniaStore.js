import { defineStore } from "pinia";
import NavBar from "../components/navBar.vue";
//定義儲存庫

export const myPiniaStore = defineStore('main',{
    state:()=>({
        // shareData:null,
        // // 要共用的數據
        navBarEle:
            [
                {
                zoneName:"討論區",
                describe:"firebase資料庫",
                router:"路徑A"
            },{
                zoneName:"小遊戲",
                describe:"phaser引擎",
                router:"路徑B"
            },{
                zoneName:"3D模型導入",
                describe:"threeJS庫",
                router:"路徑C"
            }
        ],
        userForm:false
    }),
    actions:{
        sizeChange(){
            //更改尺寸數值的函數，在mounted的時候註冊resize觸發的事件監聽器讓尺寸保持一致
            this.clientWidth=window.innerWidth
            this.clientHeight=window.innerHeight
            // console.log("當前寬"+this.clientWidth)
        },
        userFormToggle(){
            this.userForm=!this.userForm
            console.log("呼叫、切換註冊頁面")
        }  
    }
})