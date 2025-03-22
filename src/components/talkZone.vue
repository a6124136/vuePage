
<template>
    <div id="talkZone">
        <h2>
            即時聊天室
        </h2>
        <div id="userBox" v-if="!userPinia.userLogInState">
            
            <FullScreenMask v-if="userPinia.fullScreenMask">
                <userLogSign v-if="userPinia.userForm" @close=""></userLogSign>
                <!-- 蒙板內的插槽放入用戶表單 -->
            </FullScreenMask>
            <!-- 呼叫的是pinia內部的屬性 -->
            <button @click="userFormToggle" >用戶登入、註冊</button>
        </div>
        <div id="userLoginBox" v-if="userPinia.userLogInState">
            <FullScreenMask v-if="userPinia.fullScreenMask">
                <userLogSign v-if="userPinia.userForm" @close=""></userLogSign>
                <!-- 蒙板內的插槽放入用戶表單 -->
            </FullScreenMask>
            <!-- 呼叫的是pinia內部的屬性 -->
            <p >用戶名稱: {{ userPinia.user.nickName }}</p>
            <button @click="logout" >登出</button>
        </div>

    </div>
</template>

<script setup>
    import userLogSign from "./userLogSign.vue";
    import FullScreenMask from "./FullScreenMask.vue";
    import { myPiniaStore } from "../store/myPiniaStore";
    import { ref as firebaseRef, set, onValue } from "firebase/database";
    import { getAuth, signOut } from "firebase/auth";
    import { database } from "../../src/firebase.js"; // 根據你的檔案結構調整路徑
    import { ref } from "vue";

    const userPinia=myPiniaStore()//執行pinia
    //呼叫 關閉頁面
    const userFormToggle=()=>{
        userPinia.userFormToggle()//呼叫寫在pinia內的action改變是否顯示葉面
        userPinia.MaskToggle()//背景蒙版
    }
    

    const sendUserMsg=()=>{
        const databaseRoot= firebaseRef(database,"chatData");
        //指定數據庫，後面參數沒寫路徑就是在根目錄底下生成，目前在chatData底下生成資料
        
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
    //用戶登出
    const logout = () => {
        const auth=getAuth();
        signOut(auth)
        .then(() => {
            userPinia.setUserData({})
            //把用戶改回空物件
            userPinia.userIsLogin()
            //改寫用戶登入狀態
            console.log("用戶已成功退出",userPinia.user);
        })
        .catch((error) => {
            console.error("退出失敗:", error);
        });
};

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
    }

}
</style>
