<template>
    <DemoLayout title="Question and Answer" :description="description" :link="link" :loading="loading">
        <n-form @submit.prevent="predict" class="w-full max-w-sm">
            <n-form-item label="Context" required>
                <n-input v-model:value="context" type="textarea" autosize show-count></n-input>
            </n-form-item>
            <n-form-item label="Question" required>
                <n-input v-model:value="question"></n-input>
            </n-form-item>

            <n-form-item label="Answers" v-if="answers">
                <n-alert :title="answers.length + ' results'" type="info" class="w-full" closable
                    @close="() => answers = undefined">

                    <ul v-if="answers.length">
                        <li v-for="answer of answers" class="pt-3">
                            <n-text italic class="block">{{ "Score: " + Math.round(answer.score * 10) + "%" }}</n-text>
                            <n-text>{{ answer.text }}</n-text>
                        </li>
                    </ul>
                </n-alert>
            </n-form-item>

            <n-button attr-type="submit" block>Submit</n-button>
        </n-form>
    </DemoLayout>
</template>

<script setup lang="ts">
import "@tensorflow/tfjs"
import * as qna from "@tensorflow-models/qna";

let model: qna.QuestionAndAnswer | undefined = undefined

const question = ref<string>()
const context = ref<string>()
const answers = ref<QnaAnswer[]>()
const loading = ref(true)

onMounted(async () => {
    model = await qna.load();
    loading.value = false
})

function predict() {
    if (question.value && context.value && model) {
        model.findAnswers(question.value, context.value).then((_answers) => {
            answers.value = _answers
        }).catch(err => alert(err))
    }
}

onUnmounted(() => {
    model = undefined
})

const link = "https://github.com/tensorflow/tfjs-models/tree/master/qna"

const description = `
    Use a pre-trained model to answer questions based on the content of a given passage.
    The model can be used to build a system that can answer users’ questions in natural language. It was created using a pre-trained BERT model fine-tuned on SQuAD 2.0 dataset.
    BERT, or Bidirectional Encoder Representations from Transformers, is a method of pre-training language representations which obtains state-of-the-art results on a wide array of Natural Language Processing tasks.
    This app uses a compressed version of BERT, MobileBERT, that runs 4x faster and has 4x smaller model size.
`
</script>

