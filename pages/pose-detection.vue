<template>
    <DemoLayout title="Pose detection (MoveNet)" :description="description" :link="link" :loading="loading">
        <Camera @ready="predict">
            <PoseDetectionOverlay :poses="poses" />
        </Camera>
    </DemoLayout>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from '@tensorflow-models/pose-detection';

let model: poseDetection.PoseDetector | undefined = undefined
const loading = ref(true)
const poses = ref<poseDetection.Pose[]>([])

onMounted(async () => {
    model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
        modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
        minPoseScore: 0.5
    });

    loading.value = false
})

function predict(video: HTMLVideoElement) {
    if (video.srcObject && model) {
        model.estimatePoses(video).then((_poses) => {
            poses.value = _poses
            window.requestAnimationFrame(() => predict(video));
        }).catch(err => alert(err))
    }
}

onUnmounted(() => {
    model?.dispose()
})

const link = "https://github.com/tensorflow/tfjs-models/tree/master/pose-detection"

const description = `
MoveNet is an ultra fast and accurate model that detects 17 keypoints of a body. The model is offered on TF.Hub with two variants, Lightning and Thunder. Lightning is intended for latency-critical applications, and Thunder is intended for applications that require high accuracy. Both models run faster than real time (30+ FPS) on most modern desktops and laptops, which proves crucial for live fitness, health, and wellness applications.
`
</script>