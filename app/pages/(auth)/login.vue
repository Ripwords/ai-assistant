<script setup lang="ts">
import { useRouter } from "#app"

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

const router = useRouter()

async function handleGoogleLogin() {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar.app.created",
    ],
    callbackURL: "/dashboard",
  })

  if (!error && data) {
    router.push("/dashboard")
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to AI Assistant</CardTitle>
      </CardHeader>

      <CardContent class="space-y-4">
        <Button
          class="w-full"
          @click="handleGoogleLogin"
          >Sign in with Google</Button
        >
      </CardContent>

      <CardFooter class="justify-center">
        <p class="text-sm text-muted-foreground">
          Sign in with your Google account to get started
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
