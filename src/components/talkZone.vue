
<template>
    <div id="talkZone">
        <h2>
            即時聊天室
        </h2>
        <div id="userBox">
            <label for="">
                用戶暱稱:
                <input  placeholder="輸入暱稱" v-model="userName" >
                <!-- 跟ref的userName綁定 -->
            </label>
            <button @click="sendUserName" >開始聊天</button>
        </div>
        

    </div>
</template>

<script setup>
    import { ref as firebaseRef, set, onValue } from "firebase/database";
    import { database ,auth} from "../../src/firebase.js"; // 根據你的檔案結構調整路徑
    import { ref } from "vue";
    
    const userName=ref("")
    //V-model輸入暱稱

    const sendUserName=()=>{
        const databaseRoot= firebaseRef(database);
        //指定數據庫，後面參數沒寫路徑就是在根目錄底下生成
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
