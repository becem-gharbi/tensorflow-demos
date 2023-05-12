<template>
    <DemoLayout title="Face landmarks detection" :description="description" :link="link" :loading="loading">
        <Camera @ready="predict">
            <FaceLandmarksDetectionOverlay :faces="faces" />
        </Camera>
    </DemoLayout>
</template>

<script setup lang="ts">
import * as tf from "@tensorflow/tfjs"
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

let detector: faceLandmarksDetection.FaceLandmarksDetector | undefined = undefined
const loading = ref(true)
const faces = ref<faceLandmarksDetection.Face[]>([])

onMounted(async () => {
    await tf.ready()

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

    detector = await faceLandmarksDetection.createDetector(model, {
        refineLandmarks: true,
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
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
    detector = undefined
})

const link = "https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection"

const description = `
This package provides models for running real-time face detection and landmark tracking.
Currently, we provide 1 model option: MediaPipe FaceMesh.
MediaPipe Facemesh can detect multiple faces, each face contains 468 keypoints.
`
</script>