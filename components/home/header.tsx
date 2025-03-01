import { SearchIcon, TimerIcon } from "@/components/general-icons";
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";

interface IProps extends ViewProps {
  formattedTime: string;
}

export const Header = ({ style, formattedTime, ...rest }: IProps) => {
  return (
    <View style={[styles.header, style]} {...rest}>
      <View style={styles.timerContainer}>
        <TimerIcon />
        <Text style={styles.timerText}>{formattedTime}</Text>
      </View>

      {/* Having only this assuming we have only one tab */}
      <TouchableOpacity style={styles.tabButton}>
        <Text style={styles.headerText}>For You</Text>
        <View style={styles.underline} />
      </TouchableOpacity>

      <TouchableOpacity style={{ minWidth: 100, alignItems: "flex-end" }}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingHorizontal: 22,
  },
  tabButton: {
    position: "relative",
    alignItems: "center",
    flex: 1,
  },
  headerText: {
    fontFamily: "SF_Bold",
    fontSize: 16,
    color: "white",
    lineHeight: 22,
  },
  underline: {
    position: "absolute",
    backgroundColor: "white",
    height: 4,
    width: 30,
    bottom: -8,
  },
  timerText: {
    color: "#FFFFFF99",
    fontSize: 14,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    gap: 4,
  },
});
