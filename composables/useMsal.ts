import { AccountInfo, InteractionStatus, PublicClientApplication } from "@azure/msal-browser"
import { getCurrentInstance, Ref, toRefs } from "vue"

export type MsalContext = {
  instance: PublicClientApplication
  accounts: Ref<AccountInfo[]>
  inProgress: Ref<InteractionStatus>
}

export function useMsal(): MsalContext {
  const { $msal } = useNuxtApp()
  const { instance, accounts, inProgress } = toRefs($msal())

  if (!instance || !accounts || !inProgress) {
    throw "Please install the msalPlugin"
  }

  if (inProgress.value === InteractionStatus.Startup) {
    instance.value.handleRedirectPromise().catch(() => {
      // Errors should be handled by listening to the LOGIN_FAILURE event
      return
    })
  }

  return {
    instance: instance.value,
    accounts,
    inProgress,
  }
}
