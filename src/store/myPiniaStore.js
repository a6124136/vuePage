import { defineStore } from "pinia";
//定義儲存庫

export const myPiniaStore = defineStore('main',{
    state:()=>({
        // shareData:null,
        // // 要共用的數據
        navBarEle:
            [
                {
                zoneName:"實時留言板",
                describe:"firebase資料庫",
                router:"路徑A"
            },{
                zoneName:"web遊戲",
                describe:"phaser引擎",
                router:"路徑B"
            },{
                zoneName:"3D模型導入",
                describe:"threeJS庫",
                router:"路徑C"
            }
        ],
        userForm:false,
        fullScreenMask:false,
        userLogInState:false,
        //判斷用戶是否登入狀態
        //留個空物件填充用戶登入後的資料，登出後清空
        talkZone:[]
        //聊天室內容，在realtimeDatabase上把聊天內容挖出來後填進去，用v-for把前面幾條訊息留出來
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
            // console.log("呼叫、切換註冊頁面")
        },
        MaskToggle(){
            this.fullScreenMask=!this.fullScreenMask
            // console.log("呼叫、切換註冊頁面蒙版")
        },
        userIsLogin(){
            this.userLogInState=!this.userLogInState
            //切換用戶登入登出狀態判
        },
        initAndUpdateTalkZone(arg){
            this.talkZone=arg
            //寫入聊天室內容
        }
    }
})