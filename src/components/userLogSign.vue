<template>
    <div id="userForm">
        <div id="signForm" v-show="!signLoginToogle">

            <label for="">註冊帳號</label><input  type="mail" placeholder="信箱" v-model="userMail">
            <label for="">註冊密碼</label><input type="password" placeholder="英數8位密碼" v-model="userPassword">
            <label for="">用戶暱稱</label><input placeholder="暱稱" v-model="userName">
            <button @click="regisuser">註冊</button>
            <button @click="signLoginToogle=!signLoginToogle">已有用戶登入</button>
            <!-- 發送完後切回表單 -->
            <button @click="userFormToggle">返回</button>
        </div>
        <div id="loginForm" v-show="signLoginToogle">
            <label for="">用戶帳號</label><input  type="mail" placeholder="信箱" v-model="userMail">
            <label for="">用戶密碼</label><input type="password" placeholder="英數8位密碼" v-model="userPassword">
            <label for="">google登入</label> <button @click="googleLogin">google登入</button>

            <button @click="signLoginToogle=!signLoginToogle">返回註冊</button>
            <button @click="loginUser">登入</button>
            <!-- 發送完後切回表單 -->
            <button @click="userFormToggle">返回</button>
        </div>
    </div>
</template>

<script setup>
    import { myPiniaStore } from "../store/myPiniaStore";
    import { auth, database } from "../../src/firebase.js"; // 根據你的檔案結構調整路徑
    import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth"; //身分驗證、社交媒體登入、用戶管理功能、用戶登入狀態檢驗
    import { ref } from "vue";
    
    const userPinia=myPiniaStore()//執行pinia
    const userFormToggle=()=>{
        userPinia.userFormToggle()//呼叫寫在pinia內的action改變是否顯示葉面
    }


    //切換註冊、登入表單
    const signLoginToogle=ref(false)
    //用戶訊息
    const userName=ref("")
    const userMail=ref("")
    const userPassword=ref("")
    
    const regisuser= function regisuser(){
        createUserWithEmailAndPassword(auth,userMail.value,userPassword.value)
            .then((userCredential)=>{
                const user = userCredential.user;
                console.log("註冊成功:", user);
            })
            .catch((error)=>{
                const errorCode=error.code;
                const errorMessage = error.message;
                console.error("註冊失敗:", errorCode, errorMessage);
            })
    }
        // 用戶登錄
    const loginUser = function loginUser(){

            signInWithEmailAndPassword(auth, userMail.value, userPassword.value)
            .then((userCredential) => {
                // 登錄成功
                const user = userCredential.user;
                console.log("登錄成功:", user);
            })
            .catch((error) => {
                console.error("登錄錯誤:", error);
            });
    };
    const googleLogin = () => {
    const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // console.log("Google 登錄成功:", user);
            // 用戶資料
        })
        .catch((error) => {
            console.error("Google 登錄錯誤:", error);
        });
};
</script>

<style scoped  lang="scss">

@media (min-width: 1024px) {
    #userForm{
        position: absolute;
        border: 1px black solid;
        left: -50px;
        top: -50px;
        width: 600px;
        height: 500px;
        background-color: aqua;
        #signForm{
            padding: 100px;
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 1fr ;

            button{
                justify-content: center;
                margin: 0 auto;
                width: 50px;
            }
        }
        #loginForm{
            padding: 100px;
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 1fr ;

            button{
                justify-content: center;
                margin: 0 auto;
                width: 50px;
            }
        }
    }
}
</style>
