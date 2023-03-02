<template>
    <DemoLayout title="Speech command recognizer" :description="description" :link="link" :loading="loading">
        <AudioControls @start="start" @stop="stop">
            <n-h2>{{ classWithHighestScore }}</n-h2>
        </AudioControls>
    </DemoLayout>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs"
import * as speechCommands from '@tensorflow-models/speech-commands';

let recognizer: speechCommands.SpeechCommandRecognizer | undefined = undefined

const wordLabels = ref<string[]>([])
const classWithHighestScore = ref<string>()
const loading = ref(true)

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
}

async function onRecognizeWord(result: speechCommands.SpeechCommandRecognizerResult) {
    const scores = result.scores.map(score => score as number)
    const heighestScore = Math.max(...scores)
    const heighestScoreIndex = result.scores.findIndex(el => el === heighestScore)
    classWithHighestScore.value = wordLabels.value[heighestScoreIndex]
}

function stop() {
    if (recognizer) {
        recognizer.stopListening()
        classWithHighestScore.value = undefined
        recognizer = undefined
    }
}

onUnmounted(() => {
    stop()
})

const link = "https://github.com/tensorflow/tfjs-models/tree/master/speech-commands"

const description = `
The Speech Command Recognizer is a JavaScript module that enables recognition of spoken commands comprised of simple isolated English words from a small vocabulary. The default vocabulary includes the following words: the ten digits from "zero" to "nine", "up", "down", "left", "right", "go", "stop", "yes", "no", as well as the additional categories of "unknown word" and "background noise".
`
</script>