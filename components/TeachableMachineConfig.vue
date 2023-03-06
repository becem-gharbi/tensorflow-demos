<template>
    <n-card title="Configuration">

        <div class="flex flex-col gap-4">
            <div class="flex gap-4 justify-between items-center">
                <n-text class="text-base">My saved models</n-text>
                <n-button secondary size="small" type="info" @click="addModel">
                    Add
                </n-button>
            </div>

            <n-alert v-if="savedModels.length === 0">No model found</n-alert>

            <div v-else class="flex gap-4 justify-between items-center" v-for="savedModel of savedModels">
                <n-text>{{ savedModel.name }}</n-text>

                <div class="flex gap-3">
                    <n-button secondary type="error" size="small" @click="() => deleteModel(savedModel)">
                        Delete
                    </n-button>
                    <n-button secondary type="warning" size="small" @click="() => editModel(savedModel)">
                        Edit
                    </n-button>
                    <n-button secondary size="small" type="success" @click="() => onTestModel(savedModel)">
                        {{ activeModel?.name === savedModel.name ? 'active' : 'test' }}
                    </n-button>
                </div>
            </div>

        </div>


        <n-modal v-model:show="isSaveModelModalVisible" preset="dialog" title="Save model to localStorage">
            <n-form @submit.prevent="saveModel" class="w-full max-w-sm">
                <n-form-item label="Name" required>
                    <n-input v-model:value="modelForm.name" placeholder="Name your model" :disabled="editMode"></n-input>
                </n-form-item>

                <n-form-item label="URL" required>
                    <n-input v-model:value="modelForm.url" placeholder="Url of the uploaded model"></n-input>
                </n-form-item>

                <n-form-item label="Description" required>
                    <n-input v-model:value="modelForm.description" placeholder="Describe your model"></n-input>
                </n-form-item>

                <n-form-item label="Link">
                    <n-input v-model:value="modelForm.link"
                        placeholder="Link to reference your Teachable machine project"></n-input>
                </n-form-item>

                <n-button attr-type="submit" block>Save</n-button>
            </n-form>
        </n-modal>


    </n-card>
</template>

<script setup lang="ts">

const props = defineProps<{ library: TeachableMachineConfigModel["library"] }>()
const emits = defineEmits<{ (e: "testModel", model: TeachableMachineConfigModel): void }>()

const activeModel = ref<TeachableMachineConfigModel>()

const modelForm = ref<TeachableMachineConfigModel>({
    name: "",
    url: "",
    description: "",
    link: "",
    library: props.library
})

const editMode = ref(false)

const isSaveModelModalVisible = ref(false)

const savedModels = ref<TeachableMachineConfigModel[]>([])

onMounted(() => {
    savedModels.value = getModels()
})

function getModels() {
    const results: TeachableMachineConfigModel[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i) as string;
        if (key.slice(0, 3) === "tm_" && window.localStorage.getItem(key)) {
            const payload: TeachableMachineConfigModel = JSON.parse(window.localStorage.getItem(key) as string)
            if (payload.library === props.library) {
                results.push(payload);
            }
        }
    }
    return results
}

function saveModel() {
    if (modelForm.value.name && modelForm.value.url) {
        const payload = JSON.stringify(modelForm.value)
        window.localStorage.setItem("tm_" + modelForm.value.name.trim(), payload)
    }

    savedModels.value = getModels()
    isSaveModelModalVisible.value = false

}

function deleteModel(model: TeachableMachineConfigModel) {
    window.localStorage.removeItem("tm_" + model.name)

    savedModels.value = getModels()
}

function editModel(model: TeachableMachineConfigModel) {
    modelForm.value = model
    editMode.value = true
    isSaveModelModalVisible.value = true
}

function addModel() {
    editMode.value = false
    modelForm.value = {
        name: "",
        url: "",
        description: "",
        link: "",
        library: props.library
    }
    isSaveModelModalVisible.value = true
}

function onTestModel(model: TeachableMachineConfigModel) {
    activeModel.value = model
    emits("testModel", model)
}
</script>