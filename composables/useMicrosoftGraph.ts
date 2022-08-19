import { graphConfig } from "@/msal.config"

export async function useMicrosoftGraph(accessToken: string) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append("Authorization", bearer)

  const options = {
    method: "GET",
    headers: headers,
  }

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
      throw error
    })
}
