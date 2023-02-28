<template>
    <div>
        <h2 v-show="!isDetectorLoaded">Loading detector...</h2>

        <div v-show="isDetectorLoaded">
            <Camera @ready="predictWebcam">
                <PoseKeypoints :poses="poses"></PoseKeypoints>
            </Camera>
        </div>
    </div>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from '@tensorflow-models/pose-detection';

let detector: poseDetection.PoseDetector | undefined = undefined
const isDetectorLoaded = ref(false)
const poses = ref<poseDetection.Pose[]>([])

onMounted(async () => {
    const detectorConfig: poseDetection.MoveNetModelConfig = {
        modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
        enableTracking: true,
        trackerType: poseDetection.TrackerType.BoundingBox,
        minPoseScore: 0.5
    };

    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

    isDetectorLoaded.value = true
})

function predictWebcam(video: HTMLVideoElement) {
    if (video.srcObject && detector) {
        detector.estimatePoses(video).then((_poses) => {
            poses.value = _poses
            window.requestAnimationFrame(() => predictWebcam(video));
        }).catch(err => alert(err))
    }
}
</script>