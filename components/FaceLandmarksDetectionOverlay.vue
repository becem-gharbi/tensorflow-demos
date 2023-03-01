<template>
    <div v-for="face of faces" :style="getBoxStyle(face.box)">
        <div v-for="keypoint of face.keypoints" :style="getKeypointStyle(face.box, keypoint)" />
    </div>
</template>

<script setup lang="ts">
import { StyleValue } from "vue"
import { Face, Keypoint } from '@tensorflow-models/face-landmarks-detection';

defineProps<{ faces: Face[] }>()

function getBoxStyle(box: Face["box"]): StyleValue {
    return {
        position: "absolute",
        top: Math.round(box.yMin) + "px",
        left: Math.round(box.xMin) + "px",
        width: Math.round(box.width) + "px",
        height: Math.round(box.height) + "px",
        border: "2px solid red"
    }
}

function getKeypointStyle(box: Face["box"], keypoint: Keypoint): StyleValue {
    return {
        position: "absolute",
        top: Math.round(keypoint.y - box.yMin) + "px",
        left: Math.round(keypoint.x - box.xMin) + "px",
        width: "2px",
        height: "2px",
        borderRadius: "50%",
        backgroundColor: "white",
        display: keypoint.score ? "block" : "hidden"
    }
}
</script>