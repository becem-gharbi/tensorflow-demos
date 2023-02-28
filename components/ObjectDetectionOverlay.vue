<template>
    <div v-for="detectedObject of detectedObjects" :style="getStyle(detectedObject)">
        <div class="absolute right-0 top-0 bg-red-600 text-white">
            {{ detectedObject.class + " " + Math.floor(detectedObject.score * 100) + "%" }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { StyleValue } from "vue"
import { DetectedObject } from "@tensorflow-models/coco-ssd"

defineProps<{ detectedObjects?: DetectedObject[] }>()

function getStyle(detectedObject: DetectedObject): StyleValue {
    return {
        border: '3px red solid',
        position: 'absolute',
        left: Math.round(detectedObject.bbox[0]) + 'px',
        top: Math.round(detectedObject.bbox[1]) + 'px',
        width: Math.round(detectedObject.bbox[2]) + 'px',
        height: Math.round(detectedObject.bbox[3]) + 'px',
    }
}
</script>