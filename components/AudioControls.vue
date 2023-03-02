<template>
    <div>
        <n-button v-if="!isOn" @click="start">
            <template #icon>
                <NaiveIcon name="ic:round-play-circle-outline" />
            </template>
            Start
        </n-button>

        <n-button v-if="isOn" @click="stop">
            <template #icon>
                <NaiveIcon name="mingcute:stop-line" />
            </template>
            Stop
        </n-button>

        <slot v-if="isOn"></slot>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "start"): void, (e: "stop"): void }>()

const isOn = ref(false)

function start() {
    isOn.value = true
    emits("start")
}

function stop() {
    isOn.value = false
    emits("stop")
}
</script>