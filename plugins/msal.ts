import { reactive } from "vue"
import {
  EventMessage,
  EventMessageUtils,
  EventType,
  InteractionStatus,
  PublicClientApplication,
  AccountInfo,
  AuthenticationResult,
} from "@azure/msal-browser"
import { msalConfig } from "@/msal.config"

type AccountIdentifiers = Partial<Pick<AccountInfo, "homeAccountId" | "localAccountId" | "username">>

/**
 * Helper function to determine whether 2 arrays are equal
 * Used to avoid unnecessary state updates
 * @param arrayA
 * @param arrayB
 */
function accountArraysAreEqual(arrayA: Array<AccountIdentifiers>, arrayB: Array<AccountIdentifiers>): boolean {
  if (arrayA.length !== arrayB.length) {
    return false
  }

  const comparisonArray = [...arrayB]

  return arrayA.every((elementA) => {
    const elementB = comparisonArray.shift()
    if (!elementA || !elementB) {
      return false
    }

    return (
      elementA.homeAccountId === elementB.homeAccountId &&
      elementA.localAccountId === elementB.localAccountId &&
      elementA.username === elementB.username
    )
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const msalInstance = new PublicClientApplication(msalConfig(config))

  const inProgress = InteractionStatus.Startup
  const accounts = msalInstance.getAllAccounts()
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0])
  }

  const msal = reactive({
    instance: msalInstance,
    inProgress: inProgress,
    accounts: accounts,
  })

  const state = msal
  msalInstance.addEventCallback((message: EventMessage) => {
    switch (message.eventType) {
      case EventType.ACCOUNT_ADDED:
      case EventType.ACCOUNT_REMOVED:
      case EventType.LOGIN_SUCCESS:
      case EventType.SSO_SILENT_SUCCESS:
      case EventType.HANDLE_REDIRECT_END:
      case EventType.LOGIN_FAILURE:
      case EventType.SSO_SILENT_FAILURE:
      case EventType.LOGOUT_END:
      case EventType.ACQUIRE_TOKEN_SUCCESS:
      case EventType.ACQUIRE_TOKEN_FAILURE:
        const currentAccounts = msalInstance.getAllAccounts()
        if (!accountArraysAreEqual(currentAccounts, state.accounts)) {
          state.accounts = currentAccounts
        }
        break
    }

    const status = EventMessageUtils.getInteractionStatusFromEvent(message, state.inProgress)
    if (status !== null) {
      state.inProgress = status
    }
  })

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult
      const account = payload.account
      msalInstance.setActiveAccount(account)
    }
  })

  return {
    provide: {
      msal: () => msal,
    },
  }
})
