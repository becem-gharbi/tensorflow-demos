<template>
    <div>

        <DemoLayout title="Teachable machine image" :description="teachableMachineDescription" :loading="false"
            :link="teachableMachineLink">
            <TeachableMachineConfig @test-model="testModel"></TeachableMachineConfig>
        </DemoLayout>


        <DemoLayout v-if="selectedModel" :description="selectedModel.description" :link="selectedModel.link"
            :title="selectedModel.name" :loading="loading">
            <Camera @ready="predict">
                <TeachableMachineOverlay :results="results" />
            </Camera>
        </DemoLayout>

    </div>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as tmImage from '@teachablemachine/image';

let model: tmImage.CustomMobileNet | undefined = undefined
const loading = ref(false)
const results = ref<TeachableMachineResult[]>([])
const selectedModel = ref<TeachableMachineConfigModel>()

async function loadModel(url: string) {
    loading.value = true
    const modelURL = url + 'model.json';
    const metadataURL = url + 'metadata.json';
    model = await tmImage
        .load(modelURL, metadataURL)
        .finally(() => loading.value = false)
}

function predict(video: HTMLVideoElement) {
    if (video.srcObject && model) {
        model.predict(video).then((_results) => {
            results.value = _results
            window.requestAnimationFrame(() => predict(video));
        }).catch(err => alert(err))
    }
}

function killModel() {
    selectedModel.value = undefined
    model = undefined
}

async function testModel(_selectedModel: TeachableMachineConfigModel) {
    killModel()

    selectedModel.value = _selectedModel

    await loadModel(_selectedModel.url).catch(err => {
        alert(err)
        selectedModel.value = undefined
    })
}

onUnmounted(() => {
    killModel()
})

const teachableMachineLink = "https://teachablemachine.withgoogle.com/train/image"

const teachableMachineDescription = `
    Teachable Machine is a web-based application developed by Google that allows users to create machine learning models. 
    Using Teachable Machine, users can train models to recognize and classify images, sounds, and poses by providing examples of what the model should learn. 
    The application uses a technique called transfer learning, which involves taking pre-trained neural network models and retraining them with the user's data.
`
</script>