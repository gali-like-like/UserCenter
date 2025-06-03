<script setup>
    import { defineModel, ref } from 'vue';
    const model = defineModel("value");
    const isEdit = defineModel("isEdit")
</script>

<template>
    <div class="content">
        <input type="text" :value="model" @input="e => model = e.target.value" :disabled="isEdit">
        <slot name="suffix">

        </slot>
    </div>
</template>

<style scoped>
    .content {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .content input {
        outline:none;
        font-size: 20px;
        color: black;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid white;
    }
    .content input:disabled {
        background-color: transparent;
        border-color: transparent;
        color: black;
    }
</style>
