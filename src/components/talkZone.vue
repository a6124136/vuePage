
<template>
    <div id="talkZone">
        <h2>
            即時聊天室
        </h2>
        <div id="userBox">
            <userLogSign v-if="userPinia.userForm"></userLogSign>
            <!-- 呼叫的是pinia內部的屬性 -->
            <button @click="userFormToggle" >用戶登入、註冊</button>
        </div>
        

    </div>
</template>

<script setup>
    import userLogSign from "./userLogSign.vue";
    import { myPiniaStore } from "../store/myPiniaStore";
    import { ref as firebaseRef, set, onValue } from "firebase/database";
    import { database } from "../../src/firebase.js"; // 根據你的檔案結構調整路徑
    import { ref } from "vue";

    const userPinia=myPiniaStore()//執行pinia
    const userFormToggle=()=>{
        userPinia.userFormToggle()//呼叫寫在pinia內的action改變是否顯示葉面
    }
    
    const sendUserName=()=>{
        const databaseRoot= firebaseRef(database,"chatData");
        //指定數據庫，後面參數沒寫路徑就是在根目錄底下生成，目前在chatData底下生成資料
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        //密碼正則測試
        if(userName.value==""||null){
            alert("暱稱為空")
        }
        if(passwordRegex.test(userPassword.value)){
            console.log("密碼有效")
        }else{
            return alert("密碼格式錯誤")
        }
        set(databaseRoot,{
            userMail:userMail.value,
            userPassword:userPassword.value,
            userName:userName.value
        }).then(()=>{
            // console.log("數據發送到database")
        }).catch((error)=>{
            console.error("產生如下錯誤:",error)
        })
    }

</script>

<style scoped  lang="scss">

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
    }

}
</style>
