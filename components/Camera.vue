<template>
    <div class="flex flex-col gap-3 w-fit m-3">

        <div class="flex gap-3">
            <n-button v-show="!isCameraOn" @click="start" text>
                <NaiveIcon name="material-symbols:play-circle-outline" :size="24"></NaiveIcon>
            </n-button>
            <n-button v-show="isCameraOn" @click="stop" text>
                <NaiveIcon name="material-symbols:stop-circle-outline" :size="24"></NaiveIcon>
            </n-button>
            <n-select v-model:value="facingMode" :options="[{
                label: 'Back', value: 'environment'
            }, { label: 'Front', value: 'user' }]" />
        </div>

        <div v-show="isCameraOn" class="relative w-full">
            <slot></slot>
            <video ref="video" autoplay muted />
        </div>

    </div>
</template>

<script setup lang="ts">
let stream: MediaStream | null = null

const emits = defineEmits<{ (e: "ready", video: HTMLVideoElement): void }>()
const video = ref<HTMLVideoElement>()
const isCameraOn = ref(false)
const facingMode = ref<"user" | "environment">("user")

function start() {
    // Check camera permission
    if (!navigator.mediaDevices.getUserMedia) {
        return;
    }

    const constraints: MediaStreamConstraints = {
        video: {
            width: {
                ideal: window.innerWidth,
            },
            facingMode: facingMode.value
        }
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then((_stream) => {
            if (!video.value) {
                return
            }

            stream = _stream

            video.value.srcObject = stream;

            video.value.addEventListener('loadeddata', () => {
                isCameraOn.value = true
                emits("ready", video.value as HTMLVideoElement)
            });
        }).catch(error => alert(error));
}

function stop() {
    stream?.getTracks().forEach((track) => {
        track.stop();
    });

    stream = null
    video.value!.srcObject = null
    isCameraOn.value = false
}


watch(facingMode, restart)

function restart() {
    stop()
    start()
}
</script>