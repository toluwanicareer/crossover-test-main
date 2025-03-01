import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Body } from "./body";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { screenHeight } from "@/constants/style";
import { View } from "react-native";
import { Image } from "expo-image";

const blurHash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const Question = (props: IQuestion) => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, { height: screenHeight - tabBarHeight }]}>
      <Image contentFit="cover" transition={1000} placeholder={{ blurHash }} source={props.image} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView edges={["top", "left", "right"]} style={styles.safeAreaContainerStyle}>
        <Body {...props} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  safeAreaContainerStyle: {
    flex: 1,
    paddingTop: 90, //header height and the gap between the header and the body
    justifyContent: "space-between",
    gap: 50,
  },
});
