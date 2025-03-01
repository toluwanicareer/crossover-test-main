import { FontMedium } from "@/constants/style";
import { ReactElement, ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface IProps extends TextProps {
  children: ReactNode;
}
export const CustomText = ({ children, style, ...rest }: IProps) => {
  return (
    <Text style={[{ fontFamily: FontMedium, color: "white" }, style]} {...rest}>
      {children}
    </Text>
  );
};
