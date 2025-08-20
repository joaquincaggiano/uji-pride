import "./i18n"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { AppNavigator } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ErrorBoundary } from "./screens/error/error-boundary"
import { setLocale } from "./i18n"
import { light } from "./theme"


function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  // Kick off initial async loading actions, like loading RootStore
  useEffect(() => {
    setupRootStore().then(setRootStore)
  }, [])

  if (!rootStore) return null

  if(rootStore.appData.locale) {
    setLocale(rootStore.appData.locale)
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics} style={{backgroundColor: light.screen.backgroundColor}}>
        <ErrorBoundary catchErrors={"always"}>
          <AppNavigator />
        </ErrorBoundary>
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}

export default App
