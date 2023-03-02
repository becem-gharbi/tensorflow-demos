<template>
    <n-card title="Configuration">

        <div class="flex flex-col gap-4">
            <div class="flex gap-4 justify-between items-center">
                <n-text class="text-base">My saved models</n-text>
                <n-button secondary size="small" type="info" @click="() => isSaveModelModalVisible = true">
                    Add
                </n-button>
            </div>

            <n-alert v-if="savedModels.length === 0">No model found</n-alert>

            <div v-else class="flex gap-4 justify-between items-center" v-for="savedModel of savedModels">
                <n-text>{{ savedModel.name }}</n-text>
                <n-text italic>{{ '(' + savedModel.library + ')' }}</n-text>
                <div class="flex gap-3">
                    <n-button secondary type="error" size="small" @click="() => deleteSavedModel(savedModel)">
                        Delete
                    </n-button>
                    <n-button secondary size="small" type="success" @click="() => onTestModel(savedModel)">
                        {{ activeModel?.name === savedModel.name ? 'active' : 'test' }}
                    </n-button>
                </div>
            </div>

        </div>


        <n-modal v-model:show="isSaveModelModalVisible" preset="dialog" title="Save new model to localStorage">
            <n-form @submit.prevent="saveModel" class="w-full max-w-sm">
                <n-form-item label="Name" required>
                    <n-input v-model:value="modelToSave.name" placeholder="Name your model"></n-input>
                </n-form-item>
                <n-form-item label="URL" required>
                    <n-input v-model:value="modelToSave.url" placeholder="Url of the uploaded model"></n-input>
                </n-form-item>
                <n-form-item label="Description" required>
                    <n-input v-model:value="modelToSave.description" placeholder="Describe your model"></n-input>
                </n-form-item>
                <n-form-item label="Library" required>
                    <n-select :options="[{
                        label: 'Image', value: 'image'
                    }, { label: 'Audio', value: 'audio' }, { label: 'Pose', value: 'pose' }]"
                        v-model:value="modelToSave.library"></n-select>
                </n-form-item>
                <n-form-item label="Link">
                    <n-input v-model:value="modelToSave.link"
                        placeholder="Link to reference your Teachable machine project"></n-input>
                </n-form-item>
                <n-button attr-type="submit" block>Save model</n-button>
            </n-form>
        </n-modal>


    </n-card>
</template>

<script setup lang="ts">

const emits = defineEmits<{ (e: "testModel", model: TeachableMachineConfigModel): void }>()

const activeModel = ref<TeachableMachineConfigModel>()

const modelToSave = ref<TeachableMachineConfigModel>({
    name: "",
    url: "",
    description: "",
    link: "",
    library: "image"
})

const isSaveModelModalVisible = ref(false)

const savedModels = ref<TeachableMachineConfigModel[]>([])

onMounted(() => {
    savedModels.value = getSavedModels()
})

function getSavedModels() {
    const results: TeachableMachineConfigModel[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i) as string;
        if (key.slice(0, 3) === "tm_" && window.localStorage.getItem(key)) {
            const payload: TeachableMachineConfigModel = JSON.parse(window.localStorage.getItem(key) as string)
            results.push(payload);
        }
    }
    return results
}

function saveModel() {
    if (modelToSave.value.name && modelToSave.value.url) {
        const payload = JSON.stringify(modelToSave.value)
        window.localStorage.setItem("tm_" + modelToSave.value.name.trim(), payload)
    }

    savedModels.value = getSavedModels()
    isSaveModelModalVisible.value = false

}

function deleteSavedModel(model: TeachableMachineConfigModel) {
    window.localStorage.removeItem("tm_" + model.name)

    savedModels.value = getSavedModels()
}

function onTestModel(model: TeachableMachineConfigModel) {
    activeModel.value = model
    emits("testModel", model)
}
</script>