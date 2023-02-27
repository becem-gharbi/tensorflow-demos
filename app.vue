<template>
  <NaiveConfig :theme-config="themeConfig">
    <NaiveNavbar :routes="routes" menu-inverted>

      <template #start>
        <NuxtLink to="/">
          <div class=" flex items-center gap-3">
            <NaiveIcon name="logos:tensorflow" :size="30"></NaiveIcon>
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
        <NaiveColorModeSwitch></NaiveColorModeSwitch>
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
    path: "/object-detection"
  },
  {
    label: "Re-trained",
    icon: "material-symbols:autorenew"
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