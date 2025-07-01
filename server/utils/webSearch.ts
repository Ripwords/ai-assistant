/**
 * Perform a web search using the Brave Search API.
 *
 * Requires the environment variable `BRAVE_API_KEY` to be set with your
 * Brave Search API subscription token.
 *
 * Returns an array of result URLs for the provided query.
 *
 * Documentation: https://api-dashboard.search.brave.com/app/documentation/web-search/get-started
 */
export const webSearch = async (
  query: string,
  count = 10
): Promise<string[]> => {
  const apiKey = process.env.BRAVE_API_KEY

  if (!apiKey) {
    throw new Error("BRAVE_API_KEY must be set in environment variables")
  }

  const params = new URLSearchParams({
    q: query,
    count: count.toString(),
    search_lang: "en",
  })

  const response = await fetch(
    `https://api.search.brave.com/res/v1/web/search?${params.toString()}`,
    {
      headers: {
        "X-Subscription-Token": apiKey,
        Accept: "application/json",
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Brave Search API error: ${response.status} ${response.statusText}`
    )
  }

  const data = (await response.json()) as {
    web?: { results?: Array<{ url: string }> }
  }

  return data.web?.results?.map((r) => r.url) ?? []
}
