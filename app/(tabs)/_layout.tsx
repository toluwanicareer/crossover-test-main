import { ActivityIcon, BookmarkIcon, DiscoverIcon, HomeIcon, ProfileIcon } from "@/components/tab-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

const TabScreens = [
  {
    name: "index",
    title: "Home",
    icon: HomeIcon,
  },
  {
    name: "discover",
    title: "Discover",
    icon: DiscoverIcon,
  },
  {
    name: "activity",
    title: "Activity",
    icon: ActivityIcon,
  },
  {
    name: "bookmarks",
    title: "Bookmarks",
    icon: BookmarkIcon,
  },
  {
    name: "profile",
    title: "Profile",
    icon: ProfileIcon,
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBackground,
        tabBarLabel(props) {
          return <Text style={[styles.tabLabel, { color: props.focused ? "white" : "#FFFFFF66" }]}>{props.children}</Text>;
        },
      }}
    >
      {TabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          /**
           * Prevent clicking on other tabs assuming they are disabled and only the home tab is active
           */
          listeners={{
            tabPress: (e) => e.preventDefault(),
          }}
          options={{
            title: screen.title,
            tabBarIcon: () => <screen.icon />,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 10,
    fontFamily: "SF_Medium",
  },
  tabBackground: {
    backgroundColor: "#000",
  },
});
