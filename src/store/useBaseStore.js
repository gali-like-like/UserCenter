import { defineStore } from "pinia";
import { reactive } from "vue";

export const baseStore = defineStore("base",() => {
    const user = reactive({
        userName: null,
        hiddenPhone: null,
        hiddenEmail: null,
        userAccount: null,
    })
    const changeUser = (userName,userAccount,hiddenPhone,hiddenEmail) => {
        user.userName = userName;
        user.hiddenEmail = hiddenEmail;
        user.hiddenPhone = hiddenPhone;
        user.userAccount = userAccount;
    }
    return {
        user,changeUser
    }
})