// fireBase官方設定

//初始化firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";//註冊用


// https://firebase.google.com/docs/web/setup#available-libraries

// 網頁聊天室配置，firebase官方SDK生成
const firebaseConfig = {
    apiKey: "AIzaSyC_mmU2RR8p3f7EUwG6suDLmKMkTY_a-FY",
    authDomain: "testfirebase-19b19.firebaseapp.com",
    databaseURL: "https://testfirebase-19b19-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "testfirebase-19b19",
    storageBucket: "testfirebase-19b19.firebasestorage.app",
    messagingSenderId: "452424561090",
    appId: "1:452424561090:web:918e492f4b17839de8665b"
};

const app = initializeApp(firebaseConfig);//數據庫配置
const database = getDatabase(app);//啟用數據庫
const auth=getAuth(app);//載入註冊用的lib

export{database,auth}