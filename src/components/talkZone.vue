
<template>
    <div id="talkZone">
        <h2>
            即時聊天室
        </h2>
        <div id="userBox" v-if="!userState.userLogInState">
            
            <FullScreenMask v-if="userPinia.fullScreenMask">
                <userLogSign v-if="userPinia.userForm" @close=""></userLogSign>
                <!-- 蒙板內的插槽放入用戶表單 -->
            </FullScreenMask>
            <!-- 呼叫的是pinia內部的屬性 -->
            <button @click="userFormToggle" >用戶登入、註冊</button>
        </div>
        <!-- 聊天室內容 不管登入不登入都看的到 只影響到排版 -->
        <div v-for="msg in talkZoneData" :class="getMessageClass(msg.userMsgContent.userName)">
            <!-- 這邊每個數據結構要看realtimeDatabase上的寫法，然後比對sendUserMsg內的包裝方式 -->
            <p>用戶姓名</p>
            {{ msg.userMsgContent.userName}}
            <span>用戶訊息:</span>
            {{msg.userMsgContent.userMSG}}
        </div>

        <div id="userLoginBox" v-if="userState.userLogInState">
            <FullScreenMask v-if="userPinia.fullScreenMask">
                <userLogSign v-if="userPinia.userForm" @close=""></userLogSign>
                <!-- 蒙板內的插槽放入用戶表單 -->
            </FullScreenMask>
            <!-- 呼叫的是pinia內部的屬性 -->
            <p >用戶名稱:{{ userData.nickName }}</p>
            <button @click="logout" >登出</button>
            <input type="text" name="" id="" placeholder="訊息" v-model="userMsg">
            <button @click="sendUserMsg" >發送</button>
            
        </div>
    </div>
</template>

<script setup>
    import userLogSign from "./userLogSign.vue";
    import FullScreenMask from "./FullScreenMask.vue";
    import { myPiniaStore } from "../store/myPiniaStore";
    import { userStateStore } from "../store/userState";
    import { ref as firebaseRef, set,get,child ,push,onValue} from "firebase/database";
    //firebaseRef 建立路徑  set 修改 get 取得 child 子目錄 push 推送唯一資料 onvalue 監聽資料變化
    import { getAuth, signOut } from "firebase/auth";
    import { database } from "../../src/firebase.js"; // 根據你的檔案結構調整路徑
    import { onMounted, ref } from "vue";


    const userMsg=ref("")
    const userPinia=myPiniaStore()//執行主要的pinia
    const userState=userStateStore()//用戶狀態的pinia
    const talkZoneData=ref([])
    //陣列接每一條訊息
    var userData={}
    // 物件接用戶資料
    //呼叫 關閉頁面
    const userFormToggle=()=>{
        userPinia.userFormToggle()//呼叫寫在pinia內的action改變是否顯示葉面
        userPinia.MaskToggle()//背景蒙版
    }
    

    const sendUserMsg= async ()=>{
        const databaseRoot= firebaseRef(database,"chatData");
        //指定數據庫，後面參數沒寫路徑就是在根目錄底下生成，目前在chatData底下生成資料
        const newMessageRef = push(databaseRoot); 
        // 獲取一個新的推送引用，避免用戶的留言被重複覆蓋，這會產生一個唯一的token 底下再生成下方打包的物件
        await set(newMessageRef,{
            userMsgContent:{
                userMsgTime:new Date().toLocaleString(),
                //當下的時間戳
                userName:userState.getUserCookie("userData").nickName,
                //pinia用戶暱稱
                userMSG:userMsg.value
                //v-model內容
            }
        }).then(()=>{
            // console.log("數據發送到database")
        }).catch((error)=>{
            console.error("產生如下錯誤:",error)
        })
        userMsg.value=""
        //訊息送完清空
    }
    //用戶登出
    const logout = () => {
        const auth=getAuth();
        signOut(auth)
        .then(() => {
            userState.userLogOut("firebaseToken","userData")
            //登出後清除cookie
            userState.checkUserLogin()
            // 查看用戶狀態
            console.log("用戶已成功退出");
        })
        .catch((error) => {
            console.error("退出失敗:", error);
        });
    
};

//聊天室內容
const fetchChatData=async()=>{
    const dbRef = firebaseRef(database,"chatData");
    try {
        
        // const snapshot = await get(child(dbRef, 'chatData'));
        //原本的寫法，直接firebaseRef指定路徑也可以
        onValue(dbRef,(e)=>{
            if(e.exists()){
                const chatData=e.val();
                talkZoneData.value=chatData
            }else{
                console.log("查無資料")
            }
        })


        // if (snapshot.exists()) {
        // const chatData = snapshot.val(); // 取得realtime上的聊天數據
        // // console.log(chatData);
        // talkZoneData.value=chatData;
        // } else {
        // console.log("沒有資料");
        // }
    } catch (error) {
        console.error("取得資料時出錯:", error);
    }
}
//留言的樣式
const getMessageClass=(userName)=>{
        return userName===userData.nickName?"userMsg":"message"
    }
    //判斷是不是用戶的留言，是就改變樣式
onMounted(()=>{
    fetchChatData();//掛載時載入聊天室數據
    setInterval(() => {
        fetchChatData();
        if(userState.userLogInState){
        userData=userState.getUserCookie("userData")
    }
    //如果用戶登入了就把用戶資料放進物件
    }, 1000);
    //每1秒更新一次聊天室數據
    
})


</script>

<style scoped  lang="scss">
 *{
        transition: 1s;
    }

@media (min-width: 1024px) {
    
    #talkZone{
        position: absolute;
        width: 600px;
        height: 600px;
        right: 300px;
        bottom: 20px;
        background-color: #fff;
        border: 20px solid #000;
        h2{
            text-align: center;
        }
        #userBox{
            border: #000 solid 1px;
            text-align: center;
            margin:  0 auto;
            width: 300px;
        }
        #userLoginBox{
            background-color: red;
            border: #000 solid 1px;
            text-align: center;
            margin:  0 auto;
            width: 300px;
        }
        .message{
            //聊天室內容
            color: chartreuse;
        }
        .userMsg{
            //如果是用戶的留言
            color: red;
        }
    }

}
</style>
