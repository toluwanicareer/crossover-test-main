import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import * as SplashScreen from "expo-splash-screen";
import { useOnlineManager } from "@/hooks";
import { OffLine } from "@/components/shared/offline";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SF_Bold: require("../assets/fonts/SFPRODISPLAYBOLD.otf"),
    SF_Medium: require("../assets/fonts/SFPRODISPLAYMEDIUM.otf"),
    SF_Regular: require("../assets/fonts/SFPRODISPLAYREGULAR.otf"),
  });

  useOnlineManager();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <OffLine />
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
