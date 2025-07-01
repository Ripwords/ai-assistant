<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "#app"

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

const route = useRoute()
const router = useRouter()

const form = ref({ password: "", confirm: "" })

async function handleReset() {
  const token = route.query.token as string | undefined
  if (!token) return

  await useFetch("/api/auth/reset-password", {
    method: "POST",
    body: { token, password: form.value.password },
  })
  router.push("/login")
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>

      <CardContent class="space-y-4">
        <Input
          v-model="form.password"
          placeholder="New Password"
          type="password"
        />
        <Input
          v-model="form.confirm"
          placeholder="Confirm Password"
          type="password"
        />
        <Button
          class="w-full"
          @click="handleReset"
          >Update Password</Button
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
