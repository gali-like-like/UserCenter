import { defineStore } from "pinia";
import { reactive } from "vue";

export const passwordStore = defineStore("password",() => {
    const passwordForm = reactive({
        tryPassword: null,
        newPassword: null
    })
    return {
        passwordForm
    }
})
