<template>
    <div>

        <DemoLayout title="Teachable machine audio" :description="teachableMachineDescription" :loading="false"
            :link="teachableMachineLink">
            <TeachableMachineConfig library="audio" @test-model="testModel"></TeachableMachineConfig>
        </DemoLayout>

        <DemoLayout v-if="selectedModel" :description="selectedModel.description" :link="selectedModel.link"
            :title="selectedModel.name" :loading="loading">
            <AudioControls @start="start" @stop="stop">
                <n-h2>{{ classWithHighestScore }}</n-h2>
            </AudioControls>
        </DemoLayout>

    </div>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs"
import * as speechCommands from '@tensorflow-models/speech-commands';

let recognizer: speechCommands.SpeechCommandRecognizer | undefined = undefined
const loading = ref(false)
const selectedModel = ref<TeachableMachineConfigModel>()
const wordLabels = ref<string[]>([])
const classWithHighestScore = ref<string>()
const isListening = ref(false)

async function testModel(_selectedModel: TeachableMachineConfigModel) {
    killModel()

    selectedModel.value = _selectedModel

    await loadModel(_selectedModel.url).catch(err => {
        alert(err)
        selectedModel.value = undefined
    })
}

async function loadModel(url: string) {
    loading.value = true
    const modelURL = url + 'model.json';
    const metadataURL = url + 'metadata.json';

    recognizer = speechCommands.create('BROWSER_FFT', undefined, modelURL, metadataURL);
    await recognizer.ensureModelLoaded().finally(() => loading.value = false);
    wordLabels.value = recognizer.wordLabels()
}

function start() {
    recognizer?.listen(onRecognizeWord, {
        includeSpectrogram: false,
        probabilityThreshold: 0.9
    });
    isListening.value = true
}

async function onRecognizeWord(result: speechCommands.SpeechCommandRecognizerResult) {
    const scores = result.scores.map(score => score as number)
    const heighestScore = Math.max(...scores)
    const heighestScoreIndex = result.scores.findIndex(el => el === heighestScore)
    classWithHighestScore.value = wordLabels.value[heighestScoreIndex]
}

function stop() {
    recognizer?.stopListening()
    classWithHighestScore.value = undefined
    isListening.value = false
}

function killModel() {
    stop()
    selectedModel.value = undefined
    recognizer = undefined
}

onUnmounted(() => {
    stop()
    killModel()
})

const teachableMachineLink = "https://teachablemachine.withgoogle.com/train/audio"

const teachableMachineDescription = `
    Teachable Machine is a web-based application developed by Google that allows users to create machine learning models. 
    Using Teachable Machine, users can train models to recognize and classify images, sounds, and poses by providing examples of what the model should learn. 
    The application uses a technique called transfer learning, which involves taking pre-trained neural network models and retraining them with the user's data.
`
</script>