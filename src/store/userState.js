import { defineStore } from "pinia";
//定義儲存庫

export const userStateStore = defineStore('userStateStore',{
    state:()=>({
        userLogInState:false,
        //判斷用戶是否登入狀態
        user:{},
        //留個空物件填充用戶登入後的資料，登出後清空
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
        }
    }
})