<template>
    <div id="userForm">
        <form action="">
            <label for="">註冊帳號</label><input  type="text" placeholder="英數8位帳號">
            <label for="">註冊密碼</label><input type="password" placeholder="英數8位密碼">
            <label for="">用戶暱稱</label><input placeholder="英數8位帳號">
            <button @click="userFormToggle">登入</button>
            <button @click="userFormToggle">返回</button>
        </form>
    </div>
</template>

<script setup>
    import { ref as firebaseRef, set, onValue } from "firebase/database";
    import { myPiniaStore } from "../store/myPiniaStore";
    import { auth, database } from "../../src/firebase.js"; // 根據你的檔案結構調整路徑
    import { getAuth,onAuthStateChanged } from "firebase/auth"; //身分驗證、社交媒體登入、用戶管理功能、用戶登入狀態檢驗
    import { ref } from "vue";
    
    const userPinia=myPiniaStore()//執行pinia
    const userFormToggle=()=>{
        userPinia.userFormToggle()//呼叫寫在pinia內的action改變是否顯示葉面
    }

    const userName=ref("")
    //V-model輸入暱稱


    const sendUserName=()=>{
        const databaseRoot= firebaseRef(database,"chatData");
        //指定數據庫，後面參數沒寫路徑就是在根目錄底下生成，目前在chatData底下生成資料
        set(databaseRoot,{
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
    #userForm{
        position: absolute;
        border: 1px black solid;
        left: -50px;
        top: -50px;
        width: 600px;
        height: 500px;
        background-color: aqua;

        form{
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
