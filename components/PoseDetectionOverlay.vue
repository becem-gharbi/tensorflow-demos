<template>
    <div v-for="pose of poses">
        <div v-for="keypoint of pose.keypoints" :style="getKeypointStyle(keypoint)">
        </div>
    </div>
</template>

<script setup lang="ts">
import { StyleValue } from "vue"
import { Pose, Keypoint } from '@tensorflow-models/pose-detection';

defineProps<{ poses: Pose[] }>()

function getKeypointStyle(keypoint: Keypoint): StyleValue {
    return {
        position: "absolute",
        top: keypoint.y + "px",
        left: keypoint.x + "px",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "white",
        display: keypoint.score ? "block" : "hidden"
    }
}
</script>