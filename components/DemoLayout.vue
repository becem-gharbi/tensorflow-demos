<template>
    <div class="grid md:grid-cols-2 md:m-10 m-4 gap-4">
        <div class="max-w-sm flex flex-col gap-4">
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

        <div class="justify-self-center self-center">
            <div v-if="loading">
                <n-result title="Loading model" description="Please wait a moment">
                    <template #icon>
                        <n-spin size="large" />
                    </template>
                </n-result>
            </div>

            <div v-else>
                <slot></slot>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
defineProps<{ title: string, description: string, link?: string, loading: boolean }>()
</script>