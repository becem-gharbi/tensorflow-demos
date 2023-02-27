<template>
    <div>
        <div v-if="isModelLoaded">
            <Camera @ready="predictWebcam">
                <BoundingBoxes :detected-objects="detectedObjects" />
            </Camera>
        </div>

        <div v-else>
            <NH3>Loading model...</NH3>
        </div>
    </div>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

let model: cocoSsd.ObjectDetection | null = null
const isModelLoaded = ref(false)
const detectedObjects = ref<cocoSsd.DetectedObject[]>();

onMounted(async () => {
    model = await cocoSsd.load()
    isModelLoaded.value = true
})

function predictWebcam(video: HTMLVideoElement) {
    if (video.srcObject && model) {
        model.detect(video).then((predictions) => {
            detectedObjects.value = predictions
            window.requestAnimationFrame(() => predictWebcam(video));
        })
    }
}
</script>

