import {defineStore} from "pinia";
import {ref, computed} from   'vue';
export const userInfoStore = defineStore("userInfo",() => {
    const user = ref(null);
    const changeUser = (newUser) => {
        user.value = newUser;
    }
    const avatarUrl = computed(() => user.value?user.value.avatarUrl:null);
    const username = computed(() => user.value?user.value.userName:null);
    return {
        changeUser,username,avatarUrl,user
    }
})
