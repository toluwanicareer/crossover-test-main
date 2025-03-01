import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BookMarkIcon, CommentIcon, HeartIcon } from "../general-icons";
import { CustomText } from "../shared/custom-text";
import { ShareIcon } from "../general-icons/share-icon";
import { Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IProps {
  avatar: string;
}

export const Stat = ({ avatar }: IProps) => {
  return (
    <View style={styles.asideContainer}>
      <TouchableOpacity style={[styles.touchStyle, styles.avatarStyle]}>
        <Image source={{ uri: avatar }} style={{ width: "100%", height: "100%" }} />
        <AntDesign name="pluscircle" style={styles.iconStyle} size={24} color="#28B18F" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchStyle}>
        <HeartIcon />
        <CustomText style={{ fontSize: 12 }}>87</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchStyle}>
        <CommentIcon />
        <CustomText style={{ fontSize: 12 }}>12</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchStyle}>
        <BookMarkIcon />
        <CustomText style={{ fontSize: 12 }}>203</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchStyle}>
        <ShareIcon />
        <CustomText style={{ fontSize: 12 }}>17</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  asideContainer: {
    minWidth: 50,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 15,
  },
  touchStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarStyle: {
    width: 45,
    height: 45,
    borderRadius: "100%",
    position: "relative",
    marginBottom: 15,
  },
  iconStyle: {
    position: "absolute",
    bottom: -10,
  },
});
