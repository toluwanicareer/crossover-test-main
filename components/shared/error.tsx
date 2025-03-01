import { Button, StyleSheet, View } from "react-native";
import { CustomText } from "./custom-text";

interface IProps {
  error: string;
  onRefetch: () => void;
  refetching?: boolean;
}

export const Error = ({ error, onRefetch, refetching }: IProps) => {
  return (
    <View style={styles.container}>
      <CustomText style={{ textAlign: "center", color: "black" }}>{error}</CustomText>
      <Button onPress={onRefetch} disabled={refetching} title={refetching ? "Refetching..." : "Refetch"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
});
