<script setup lang="ts">
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

definePageMeta({ layout: "auth" })

const email = ref("")

async function handleSubmit() {
  await $fetch("/api/auth/forgot-password", {
    method: "POST",
    body: { email: email.value },
  })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>

      <CardContent class="space-y-4">
        <Input
          v-model="email"
          placeholder="Email"
          type="email"
        />
        <Button
          class="w-full"
          @click="handleSubmit"
          >Send Reset Link</Button
        >
      </CardContent>

      <CardFooter class="justify-center">
        <NuxtLink
          to="/login"
          class="text-sm hover:underline"
          >Back to login</NuxtLink
        >
      </CardFooter>
    </Card>
  </div>
</template>
