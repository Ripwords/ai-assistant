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
  confirmPassword: "",
})

const router = useRouter()

async function handleRegister() {
  const { data, error } = await authClient.signUp.email({
    email: form.value.email,
    password: form.value.password,
    name: form.value.email,
  })

  if (!error && data) {
    router.push("/login")
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
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
        <Input
          v-model="form.confirmPassword"
          placeholder="Confirm Password"
          type="password"
        />
        <Button
          class="w-full"
          @click="handleRegister"
          >Register</Button
        >
      </CardContent>

      <CardFooter class="justify-center">
        <NuxtLink
          to="/login"
          class="text-sm text-muted-foreground hover:underline"
          >Already have an account?</NuxtLink
        >
      </CardFooter>
    </Card>
  </div>
</template>
