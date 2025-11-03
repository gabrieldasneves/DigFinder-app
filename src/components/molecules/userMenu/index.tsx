import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { IconUser, IconLogout } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";
import { useState } from "react";
import { styles } from "./styles";
import { ModalConfirm } from "../modalConfirm";
import { router } from "expo-router";
import { api } from "@/services/api";

type MenuOption = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export function UserMenu() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

  const menuOptions: MenuOption[] = [
    {
      label: "Profile",
      icon: <IconUser size={20} color={colors.gray[600]} />,
      onPress: () => {
        setIsMenuVisible(false);
        // Navigation will be implemented later
      },
    },
    {
      label: "Logout",
      icon: <IconLogout size={20} color={colors.gray[600]} />,
      onPress: () => {
        setIsMenuVisible(false);
        setModalConfirmVisible(true);
      },
    },
  ];

  const handleLogout = async () => {
    try {
      // Chamada à API de logout (ajuste a rota conforme seu backend)
      await api.post("/auth/logout");
      router.replace("/");
    } catch (error: any) {
      Alert.alert(
        "Logout failed",
        error.response?.data?.message || "Try again later."
      );
    } finally {
      setModalConfirmVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setIsMenuVisible(true)}
      >
        <IconUser size={24} color={colors.gray[600]} />
      </TouchableOpacity>

      <Modal
        visible={isMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.menuOption,
                  index !== menuOptions.length - 1 && styles.menuOptionBorder,
                ]}
                onPress={option.onPress}
              >
                {option.icon}
                <Text style={styles.menuOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      <ModalConfirm
        visible={modalConfirmVisible}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setModalConfirmVisible(false)}
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </View>
  );
}
