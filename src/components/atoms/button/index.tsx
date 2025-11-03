import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";

type ButtonProps = {
  children: ReactNode;
  style?: ViewStyle;
  isLoading?: boolean;
  onPress: () => void;
};

type ButtonTextProps = {
  children: ReactNode;
  style?: TextStyle;
};

type ButtonIconProps = {
  icon: React.ComponentType<IconProps>;
};

function Button({ children, style, isLoading, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[styles.container, style]}
      onPress={onPress}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function ButtonText({ children, style }: ButtonTextProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

function ButtonIcon({ icon: Icon }: ButtonIconProps) {
  return <Icon size={24} color={colors.gray[100]} />;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;
export { Button, ButtonText };
