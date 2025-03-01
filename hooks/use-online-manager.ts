import * as React from "react";
import * as Network from "expo-network";
import { onlineManager } from "@tanstack/react-query";
import { Platform } from "react-native";

export function useOnlineManager() {
  React.useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== "web") {
      onlineManager.setEventListener((setOnline) => {
        const eventSubscription = Network.addNetworkStateListener((state) => {
          setOnline(!!state.isConnected && !!state.isInternetReachable);
        });
        return eventSubscription.remove;
      });
    }
  }, []);
}
