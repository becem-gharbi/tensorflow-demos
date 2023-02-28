<template>
    <div v-for="hand of hands">
        <div v-for="keypoint of hand.keypoints" :style="getKeypointStyle(keypoint)">
        </div>
    </div>
</template>

<script setup lang="ts">
import { StyleValue } from "vue"
import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection';

defineProps<{ hands: Hand[] }>()

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