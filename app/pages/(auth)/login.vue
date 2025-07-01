<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "#app"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { authClient } from "~/lib/auth"

definePageMeta({ layout: "auth" })

const form = ref({
  email: "",
  password: "",
})

const router = useRouter()

async function handleLogin() {
  const { data, error } = await authClient.signIn.email({
    email: form.value.email,
    password: form.value.password,
  })

  if (!error) {
    router.push("/dashboard")
  }

  if (data) {
    router.push("/dashboard")
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent class="space-y-4">
        <Input
          v-model="form.email"
          placeholder="Email"
          type="email"
        />
        <Input
          v-model="form.password"
          placeholder="Password"
          type="password"
        />
        <Button
          class="w-full"
          @click="handleLogin"
          >Sign in</Button
        >
      </CardContent>

      <CardFooter class="justify-center space-x-2">
        <NuxtLink
          to="/register"
          class="text-sm text-muted-foreground hover:underline"
          >Don't have an account?</NuxtLink
        >
        <NuxtLink
          to="/forgot-password"
          class="text-sm hover:underline"
          >Forgot password?</NuxtLink
        >
      </CardFooter>
    </Card>
  </div>
</template>
