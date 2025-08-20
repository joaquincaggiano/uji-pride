import * as React from "react"
import { ActivityIndicator, View } from "react-native"
import { WebView, WebViewProps } from 'react-native-webview'
import { light } from "../../theme"

interface AppWebViewProps extends WebViewProps {
  forwardedRef?: any
}

export function AppWebView(props: AppWebViewProps) {
  const {
    forwardedRef,
    ...rest
  } = props

  const [loading, setLoading] = React.useState(true)

  const onLoadEndHandler = () => {
    setLoading(false)
  }

  const onLoadStartHandler = () => {
    setLoading(true)
  }

  return (
    <View style={{flex: 1}}>
      {loading && (
        <View style={{position: "absolute", width: '100%', height: '100%', justifyContent: "center", alignItems: "center", zIndex: 100}}>
          <ActivityIndicator size="large" color={light.mainTextColor.color}/>
        </View>
      )}
      <WebView
        onLoadEnd={onLoadEndHandler}
        onLoadStart={onLoadStartHandler}
        style={{ flex: 1 }}
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
        allowsBackForwardNavigationGestures
        ref={forwardedRef}
        {...props}
      />
    </View>   
  )
}
