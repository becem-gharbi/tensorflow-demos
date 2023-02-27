<template>
    <div class="flex flex-wrap gap-5 my-4">
        <div class="max-w-sm mx-4 flex flex-col gap-3">
            <n-h2>{{ title }}</n-h2>
            <n-text class="leading-6">{{ description }}</n-text>

            <NuxtLink v-if="link" :to="link" target="_">
                <n-button block text>
                    <template #icon>
                        <NaiveIcon name="ph:link-simple-horizontal-bold" />
                    </template>
                    Find out more
                </n-button>
            </NuxtLink>
        </div>

        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{ title: string, description: string, link?: string }>()
</script>