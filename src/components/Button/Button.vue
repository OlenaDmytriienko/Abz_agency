<script setup>
import './button.scss'
defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>

<template>
    <button class="button">
        {{ text }}
    </button>
</template>