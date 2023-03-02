<template>
    <DemoLayout title="Hand pose detection" :description="description" :link="link" :loading="loading">
        <Camera @ready="predict">
            <handPoseDetectionOverlay :hands="hands" />
        </Camera>
    </DemoLayout>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs"
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';

let detector: handPoseDetection.HandDetector | undefined = undefined
const loading = ref(true)
const hands = ref<handPoseDetection.Hand[]>([])

onMounted(async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands

    detector = await handPoseDetection.createDetector(model, {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
        modelType: 'full'
    });

    loading.value = false
})

function predict(video: HTMLVideoElement) {
    if (video.srcObject && detector) {
        detector.estimateHands(video).then((_hands) => {
            hands.value = _hands
            window.requestAnimationFrame(() => predict(video));
        }).catch(err => alert(err))
    }
}

onUnmounted(() => {
    detector?.dispose()
    detector = undefined
})

const link = "https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection"

const description = `
This package provides models for running real-time hand pose detection.
Currently, we provide 1 model option: MediaPipe.
MediaPipe Hands can detect multiple hands, each hand contains 21 3D hand keypoints.
`
</script>