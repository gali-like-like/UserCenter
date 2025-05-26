import {reactive, computed} from "vue";
import { defineStore } from 'pinia'
export const userStore
    = defineStore("loginRegedit",() => {
    const accountInfo = reactive({
        userPassword: "",
        userAccount: "",
        code: ""
    })
    const changePassword = (newPassword) => {
        console.log(`修改后的数据:${newPassword}`);
        accountInfo.userPassword = newPassword;
    }
    const changeCode = (newCode) => {
        console.log(`修改后的数据:${newCode}`);
        accountInfo.code = newCode;
    }
    const changeUserAccount = (newUserAccount) => {
        console.log(`修改后的账号数据:${newUserAccount}`);
        accountInfo.userAccount = newUserAccount;
    }
    const userLoginInfo = computed(() => {
        return {
            userPassword: accountInfo.userPassword,
            userAccount: accountInfo.userAccount
        }
    })
    return {
        accountInfo, changePassword, changeCode, changeUserAccount,userLoginInfo
    }
})
