<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Settings {
  emailNotifications: boolean
  theme: string
}

const { data: initial } = await useAsyncData<Settings | null>("settings", () =>
  $fetch<Settings>("/api/settings")
)

const settings = ref<Settings>(
  initial.value ?? { emailNotifications: true, theme: "system" }
)

async function save() {
  const { error } = await useFetch("/api/settings", {
    method: "POST",
    body: settings.value,
  })
  if (!error.value) {
    // success toast (placeholder)
  }
}
</script>

<template>
  <div class="mx-auto max-w-xl p-6">
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>

      <CardContent class="space-y-6">
        <!-- Email notifications toggle -->
        <div class="flex items-center justify-between">
          <span>Email Notifications</span>
          <Switch v-model="settings.emailNotifications" />
        </div>

        <!-- Theme select -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Theme</label>
          <select
            v-model="settings.theme"
            class="rounded border p-2"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <Button @click="save">Save</Button>
      </CardContent>
    </Card>
  </div>
</template>
