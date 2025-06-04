import {defineStore} from "pinia";
import {ref, computed, reactive} from   'vue';
export const userInfoStore = defineStore("userInfo",() => {
    const user = ref(null);
    const changeUser = (newUser) => {
        user.value = newUser;
    }
    const changeAvatarUrl = (newAvatarUrl) => {
        user.value.avatarUrl = newAvatarUrl;
    }
    const avatarUrl = computed(() => user.value?user.value.avatarUrl:null);
    const username = computed(() => user.value?user.value.userName:null);
    const baseUser = reactive({
            hiddenPhone: user.hiddenPhone,
            hiddenEmail: user.hiddenEmail,
            userName: user.userName,
            userAccount: user.userAccount
    })
    return {
        changeUser,username,avatarUrl,user,baseUser,changeAvatarUrl
    }
})
