<template>
  <NaiveConfig :theme-config="themeConfig">
    <NaiveNavbar :routes="routes">

      <template #start>
        <NuxtLink to="/">
          <div class=" flex items-center gap-3">
            <NaiveIcon name="logos:tensorflow" :size="28"></NaiveIcon>
            <n-h4 class="m-0">TensorFlow demos</n-h4>
          </div>
        </NuxtLink>
      </template>

      <template #end>
        <NuxtLink to="https://github.com/becem-gharbi/tensorflow-demos" target="_blank">
          <n-button text>
            <NaiveIcon name="codicon:github"></NaiveIcon>
          </n-button>
        </NuxtLink>
        <NaiveColorModeSwitch />
      </template>
    </NaiveNavbar>
    <NuxtPage />
  </NaiveConfig>
</template>

<script setup lang="ts">
import { NavbarRoute, ThemeConfig } from "@bg-dev/nuxt-naiveui"

const routes: NavbarRoute[] = [
  {
    label: "Pre-trained",
    icon: "ic:baseline-check",
    children: [
      {
        label: "Object detection",
        icon: "fluent:scan-object-24-regular",
        path: "/object-detection"
      },
      {
        label: "Pose detection",
        icon: "material-symbols:detection-and-zone",
        path: "/pose-detection",
      },
      {
        label: "Face detection",
        icon: "teenyicons:face-id-outline",
        path: "/face-detection"
      },
      {
        label: "Face landmarks detection",
        icon: "carbon:face-activated",
        path: "/face-landmarks-detection"
      },
      {
        label: "Hand pose detection",
        icon: "ph:hand-pointing-fill",
        path: "/hand-pose-detection"
      },
      {
        label: "Question and answer",
        icon: "fluent:chat-bubbles-question-16-regular",
        path: "/question-and-answer"
      },
      {
        label: "Speech command recognizer",
        icon: "material-symbols:speech-to-text",
        path: "/speech-command-recognizer"
      }
    ]
  },
  {
    label: "Re-trained",
    icon: "material-symbols:autorenew",
    children: [
      {
        label: "Teachable machine image",
        icon: "ph:image-square-light",
        path: "/teachable-machine-image"
      }
    ]
  }
]

const themeConfig: ThemeConfig = {
  shared: {
    common: {
      fontFamily: "Gellix"
    }
  }
}
</script>