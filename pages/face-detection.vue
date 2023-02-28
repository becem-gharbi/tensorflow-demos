<template>
    <DemoLayout title="Face detection" :description="description" :link="link" :loading="loading">
        <Camera @ready="predict">
            <FaceDetectionOverlay :faces="faces" />
        </Camera>
    </DemoLayout>
</template>

<script setup lang="ts">
import '@tensorflow/tfjs-core';
import "@tensorflow/tfjs-backend-wasm"
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from '@tensorflow-models/face-detection';

let detector: faceDetection.FaceDetector | undefined = undefined
const loading = ref(true)
const faces = ref<faceDetection.Face[]>([])

onMounted(async () => {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;

    detector = await faceDetection.createDetector(model, {
        runtime: "mediapipe",
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
    });

    loading.value = false
})

function predict(video: HTMLVideoElement) {
    if (video.srcObject && detector) {
        detector.estimateFaces(video).then((_faces) => {
            faces.value = _faces
            window.requestAnimationFrame(() => predict(video));
        }).catch(err => alert(err))
    }
}

onUnmounted(() => {
    detector?.dispose()
})

const link = "https://github.com/tensorflow/tfjs-models/tree/master/face-detection"

const description = `
This package provides models for running real-time face detection. 
Currently, we provide 1 model option: MediaPipe FaceDetection. 
MediaPipe FaceDetection can detect multiple faces, each face contains 6 keypoints.
`
</script>