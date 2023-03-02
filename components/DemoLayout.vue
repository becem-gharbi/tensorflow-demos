<template>
    <div class="flex flex-wrap gap-5 md:my-10 my-5 justify-around items-center w-full">
        <div class="max-w-sm mx-5 flex flex-col gap-3 self-start">
            <n-h2>{{ title }}</n-h2>
            <n-text class="leading-6 text-justify">{{ description }}</n-text>

            <NuxtLink v-if="link" :to="link" target="_">
                <n-button text>
                    <template #icon>
                        <NaiveIcon name="ph:link-simple-horizontal-bold" />
                    </template>
                    Find out more
                </n-button>
            </NuxtLink>
        </div>

        <div v-show="loading">
            <n-result title="Loading model" description="Please wait a moment">
                <template #icon>
                    <n-spin size="large" />
                </template>
            </n-result>
        </div>

        <div v-show="!loading">
            <slot></slot>
        </div>

    </div>
</template>

<script setup lang="ts">
defineProps<{ title: string, description: string, link?: string, loading: boolean }>()
</script>