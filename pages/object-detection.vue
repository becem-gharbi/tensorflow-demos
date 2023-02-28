<template>
    <DemoLayout title="Object detection (coco-ssd)" :description="description" :link="link" :loading="loading">
        <Camera @ready="predict">
            <ObjectDetectionOverlay :detected-objects="detectedObjects" />
        </Camera>
    </DemoLayout>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

let model: cocoSsd.ObjectDetection | undefined = undefined
const loading = ref(true)
const detectedObjects = ref<cocoSsd.DetectedObject[]>();

onMounted(async () => {
    model = await cocoSsd.load()
    loading.value = false
})

function predict(video: HTMLVideoElement) {
    if (video.srcObject && model) {
        model.detect(video).then((_detectedObjects) => {
            detectedObjects.value = _detectedObjects
            window.requestAnimationFrame(() => predict(video));
        }).catch(err => alert(err))
    }
}

onUnmounted(() => {
    model?.dispose()
})

const link = "https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd"

const description = `
        This model detects objects defined in the COCO dataset, 
        which is a large-scale object detection, segmentation, and captioning dataset. 
        The model is capable of detecting 80 classes of objects. (SSD stands for Single Shot MultiBox Detection).
`
</script>

