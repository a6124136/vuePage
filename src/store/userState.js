import { defineStore } from "pinia";
//定義儲存庫

export const userStateStore = defineStore('userStateStore',{
    state:()=>({
        userLogInState:false,
        //判斷用戶是否登入狀態
    }),
    actions:{
        checkUserLogin() {
            const token = this.getCookie('firebaseToken');
            //查詢cookie內有沒有firebaseToken這項
            this.userLogInState = !!token; // 如果 token 存在，則設置為 true
        },
        getCookie(name) {
            // 讓checkUserLogin調用
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            //冒號結尾把cookie拆分成陣列做運算
            for (let i = 0; i < ca.length; i++) {
                //for迴圈尋找每個cookie 看是否有符合的
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
            //firebaseToken = token+過期時間+路徑
        },
        setUserCookie(name, userData, days) {
            const jsonString = JSON.stringify(userData); // 將物件轉換為字符串
            const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString(); // 設置過期時間
            document.cookie = `${name}=${encodeURIComponent(jsonString)}; expires=${expires}; path=/;`;
            }
        ,
        getUserCookie(name) {
            const cookieArr = document.cookie.split(';');
            for (let i = 0; i < cookieArr.length; i++) {
                const cookiePair = cookieArr[i].trim();
                if (cookiePair.startsWith(name + '=')) {
                const cookieValue = cookiePair.split('=')[1];
                return JSON.parse(decodeURIComponent(cookieValue)); // 將字符串轉換回物件
                }
            }
            return null; // 如果找不到 cookie，返回 null
        },
        userLogOut(tokenName,userDataName){
            // console.log("登出")
            document.cookie = tokenName+"=;"+"expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            //name一般預設firebaseToken
            document.cookie=userDataName+"=;"+"expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            //清除cookie
        }
    }
})