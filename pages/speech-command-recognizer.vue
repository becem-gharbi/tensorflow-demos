<template>
    <DemoLayout title="Speech command recognizer" :description="description" :link="link" :loading="loading">

        <n-button v-if="!isListening" @click="start">
            <template #icon>
                <NaiveIcon name="ic:round-play-circle-outline" />
            </template>
            Start listening
        </n-button>

        <n-button v-if="isListening" @click="stop">
            <template #icon>
                <NaiveIcon name="mingcute:stop-line" />
            </template>
            Stop listening
        </n-button>

        <n-h2 v-if="isListening">{{ wordWithHighestScore }}</n-h2>
    </DemoLayout>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs"
import * as speechCommands from '@tensorflow-models/speech-commands';

const loading = ref(true)
const isListening = ref(false)

let recognizer: speechCommands.SpeechCommandRecognizer | undefined = undefined

const wordScores = ref<number[]>([])
const wordLabels = ref<string[]>([])
const wordWithHighestScore = ref<string>()

onMounted(async () => {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    wordLabels.value = recognizer.wordLabels()
    loading.value = false
})

function start() {
    recognizer?.listen(onRecognizeWord, {
        includeSpectrogram: false,
        probabilityThreshold: 0.9
    });
    isListening.value = true
}

async function onRecognizeWord(result: speechCommands.SpeechCommandRecognizerResult) {
    wordScores.value = []
    result.scores.forEach((score) => wordScores.value.push(score as number))
    const maxScore = Math.max(...wordScores.value)
    const maxScoreIndex = result.scores.findIndex(el => el === maxScore)
    wordWithHighestScore.value = wordLabels.value[maxScoreIndex]
}

function stop() {
    recognizer?.stopListening()
    wordScores.value = []
    wordWithHighestScore.value = undefined
    isListening.value = false
}

const link = "https://github.com/tensorflow/tfjs-models/tree/master/speech-commands"

const description = `
The Speech Command Recognizer is a JavaScript module that enables recognition of spoken commands comprised of simple isolated English words from a small vocabulary. The default vocabulary includes the following words: the ten digits from "zero" to "nine", "up", "down", "left", "right", "go", "stop", "yes", "no", as well as the additional categories of "unknown word" and "background noise".
`
</script>