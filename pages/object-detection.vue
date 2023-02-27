<template>
    <DemoLayout title="Object detection (coco-ssd)" :description="description" :link="link">
        <div v-if="isModelLoaded">
            <Camera @ready="predictWebcam">
                <BoundingBoxes :detected-objects="detectedObjects" />
            </Camera>
        </div>

        <div v-else>
            <n-h3>Loading model...</n-h3>
        </div>
    </DemoLayout>
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

const link = "https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd"

const description = `
        This model detects objects defined in the COCO dataset, 
        which is a large-scale object detection, segmentation, and captioning dataset. 
        The model is capable of detecting 80 classes of objects. (SSD stands for Single Shot MultiBox Detection).
`
</script>

