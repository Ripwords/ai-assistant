import { authClient } from "~/lib/auth"
export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) {
    const protectedPaths = ["/dashboard", "/settings", "/knowledge-base", "/"]
    if (protectedPaths.includes(to.path)) {
      return navigateTo("/login")
    }
  }
})
