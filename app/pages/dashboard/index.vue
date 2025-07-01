<script setup lang="ts">
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Message {
  role: "user" | "assistant"
  content: string
}

const messages = ref<Message[]>([
  { role: "assistant", content: "Hello! How can I help you today?" },
])

const input = ref("")
const messagesContainer = ref<HTMLElement | null>(null)

async function send() {
  if (!input.value.trim()) return

  const userContent = input.value
  messages.value.push({ role: "user", content: userContent })
  input.value = ""

  const data = await $fetch("/api/chat", {
    method: "POST",
    body: { message: userContent },
  })
  messages.value.push({
    role: "assistant",
    content: data.reply.text ?? "Sorry, something went wrong.",
  })

  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<template>
  <div class="flex h-screen flex-col">
    <div
      ref="messagesContainer"
      class="flex-1 space-y-4 overflow-y-auto p-4"
    >
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
      >
        <Card
          class="max-w-[70%]"
          :class="
            msg.role === 'user' ? 'bg-primary text-primary-foreground' : ''
          "
        >
          <CardContent class="whitespace-pre-line p-3 text-sm">
            {{ msg.content }}
          </CardContent>
        </Card>
      </div>
    </div>

    <form
      class="border-t p-4"
      @submit.prevent="send"
    >
      <div class="flex items-end gap-2">
        <Textarea
          v-model="input"
          rows="2"
          placeholder="Type your message..."
          class="flex-1"
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  </div>
</template>
