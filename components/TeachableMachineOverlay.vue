<template>
    <n-table class="absolute w-fit m-1" size="small">
        <thead>
            <tr>
                <th v-for="result of results">
                    {{ result.className }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td v-for="result of results">
                    {{ Math.floor(result.probability * 100) + "%" }}
                </td>
            </tr>
        </tbody>
    </n-table>
</template>

<script setup lang="ts">
defineProps<{ results: TeachableMachineResult[] }>()
</script>