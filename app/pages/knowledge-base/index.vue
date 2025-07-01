<script setup lang="ts">
import { ref } from "vue"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

definePageMeta({ middleware: "auth" })

const textDump = ref("")
const file = ref<File | null>(null)

async function uploadText() {
  if (!textDump.value.trim()) return
  await useFetch("/api/knowledge-base/text", {
    method: "POST",
    body: { text: textDump.value },
  })
  textDump.value = ""
}

function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length) {
    file.value = target.files[0]
  }
}

async function uploadFile() {
  if (!file.value) return
  const body = new FormData()
  body.append("file", file.value)
  await useFetch("/api/knowledge-base/file", { method: "POST", body })
  file.value = null
}
</script>

<template>
  <div class="mx-auto max-w-2xl p-6">
    <h1 class="mb-4 text-2xl font-bold">Knowledge Base</h1>

    <Accordion
      type="single"
      collapsible
    >
      <AccordionItem value="text">
        <AccordionTrigger>Paste Text</AccordionTrigger>
        <AccordionContent>
          <Textarea
            v-model="textDump"
            rows="6"
            placeholder="Paste text..."
          />
          <Button
            class="mt-2"
            @click="uploadText"
            >Add</Button
          >
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="file">
        <AccordionTrigger>Upload File</AccordionTrigger>
        <AccordionContent>
          <Input
            type="file"
            @change="handleFile"
          />
          <Button
            class="mt-2"
            @click="uploadFile"
            >Upload</Button
          >
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
