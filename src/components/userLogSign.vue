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
            <label for=""><button @click="loginUser">信箱登入</button></label>
            <button @click="signLoginToogle=!signLoginToogle">返回註冊</button>
            <button @click="userFormToggle">返回</button>
        </div>
    </div>
</template>

<script setup>
    import { myPiniaStore } from "../store/myPiniaStore";
    import { auth, database } from "../../src/firebase.js"; // 根據你的檔案結構調整路徑
    import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth"; 
    //身分驗證、社交媒體登入、用戶管理功能、用戶登入狀態檢驗
    import { getFirestore, setDoc, doc ,getDocs,collection} from "firebase/firestore";
    //另外保存用戶的暱稱或頭像等其他資訊，getDoc跟collection是讀取firestore上的集合
    import { ref } from "vue";
    
    const userPinia=myPiniaStore()//執行pinia
    const fireStoreDatabase=getFirestore()
    //用firestore存用戶的其他資訊


    //呼叫 關閉頁面
    const userFormToggle=()=>{
        userPinia.userFormToggle()//呼叫寫在pinia內的action改變是否顯示葉面
        userPinia.MaskToggle()//背景蒙版
    }

    //切換註冊、登入表單
    const signLoginToogle=ref(false)
    //用戶訊息
    const userName=ref("")
    const userMail=ref("")
    const userPassword=ref("")
    
    const regisuser= async function regisuser(){
        //異步執行
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        //密碼正則測試
        if(userName.value==""||null){
            alert("暱稱為空")
        }
        if(passwordRegex.test(userPassword.value)){
            // console.log("密碼有效")
        }else{
            return alert("密碼格式錯誤")
        }

        try{
        //嘗試Promise
            const userCredential  = await createUserWithEmailAndPassword(auth,userMail.value,userPassword.value)
            //會員授權
            const user= userCredential.user
            //回傳的會員資料
            await setDoc(doc(fireStoreDatabase,"users",user.uid),{
                uid:user.uid,
                email: user.email,
                nickname: userName.value
                //把uid 信箱 暱稱 另存到fireStore裡面備用
            })
            // 結構
            // users (collection)
            //     └── userUID (document)
            //         ├── uid: "userUID"
            //         ├── email: "user@example.com"
            //         └── nickname: "用戶暱稱"
            const getDataFromFirestore = async () => {
                const querySnapshot = await getDocs(collection(fireStoreDatabase, "users"));
                //第二個參數是fireStore上的集合名稱
                querySnapshot.forEach((doc) => {
                    if(doc.uid==user.uid){
                        return doc.nickname
                    }else{
                        return console.log("無名氏")
                    }
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                });
            };
            const userPack={
                uid:user.uid,
                email:user.email,
                nickName:getDataFromFirestore().catch(console.error)
                //找fireBase內的暱稱 沒有就報錯
                //打包成pinia內的user物件
            }
            userPinia.setUserData(userPack)
            //pinia寫入用戶資料
            userPinia.userIsLogin()
            //轉換成登入狀態
        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("註冊失敗:", errorCode, errorMessage);
        }
        alert("註冊完成 登入中")
        userFormToggle()
    }

        // 用戶登錄
    const loginUser = async ()=>{
            //異步函數
            try{
                const userCredential = await signInWithEmailAndPassword(auth, userMail.value, userPassword.value)
                const user = userCredential.user; // 獲取用戶信息
                const querySnapshot = await getDocs(collection(fireStoreDatabase, "users"));
                //第二個參數是fireStore上的集合名稱
                let getNickName="無名氏";
                // ↑接從fireStore裡面取得的用戶暱稱
                querySnapshot.forEach((doc) => {
                    //比對users集合底下相同的uid 回傳暱稱
                    if(doc.data().uid === user.uid){
                        getNickName=doc.data().nickname
                        //記得補上.data()才能獲取數據
                    }
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                });
                const userPack={
                uid:user.uid,
                email:user.email,
                nickName:getNickName
                //找fireBase內的暱稱 沒有就報錯
                //打包成pinia內的user物件
                }
                userPinia.setUserData(userPack)
                 //pinia寫入用戶資料
                userPinia.userIsLogin()
                //轉換成登入狀態
                console.log(userPinia.userLogInState+"登入狀態",userPinia.user+"用戶當前資料")
                userFormToggle()
                // 關閉登入表單
                
            }catch(err){
                console.error("操作時出錯:", err);
            }


    };

        //google登入
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // console.log("Google 登錄成功:", user);
            // 用戶資料，用這邊去改寫pinia內部的用戶狀態
            userPinia.setUserData(user)
            //set函數改寫user
        })
        .catch((error) => {
            console.error("Google 登錄錯誤:", error.code,error.message);
            if (error.code === 'auth/invalid-credential') {
                console.error("憑證無效，請檢查設定。");
            }
        });
        console.log(userPinia.user)
        //看一下有沒有變
        userFormToggle()
        //執行登入後關閉登入頁面
};
</script>

<style scoped  lang="scss">
 *{
        transition: 1s;
    }

@media (min-width: 1024px) {
    
    #userForm{
        position: absolute;
        border: 1px black solid;
        left: 400px;
        top: 100px;
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
                width: 100px;
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
                width: 100px;
            }
        }
    }
}
</style>
