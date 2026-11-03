import { useEffect, useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { styles } from './styles'
import { api } from '@/services/api'
import { uploadAvatarToFirebase } from '@/services/storage'
import type { User } from '@/contexts/Authcontext'

type EditProfileModalProps = {
  visible: boolean
  user: User
  onClose: () => void
  onSaved: (user: User) => void
}

export function EditProfileModal({
  visible,
  user,
  onClose,
  onSaved,
}: EditProfileModalProps) {
  const [name, setName] = useState(user.name)
  const [avatarUri, setAvatarUri] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (visible) {
      setName(user.name)
      setAvatarUri(null)
    }
  }, [visible, user.name])

  async function pickAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })
    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri)
    }
  }

  async function handleSave() {
    if (name.trim().length < 2) {
      Alert.alert('Invalid name', 'Name must be at least 2 characters.')
      return
    }
    setSaving(true)
    try {
      let avatarUrl = user.avatarUrl ?? undefined
      if (avatarUri) {
        avatarUrl = await uploadAvatarToFirebase(avatarUri, user.id)
      }
      const { data } = await api.put<User>('/auth/me', {
        name: name.trim(),
        ...(avatarUrl ? { avatarUrl } : {}),
      })
      onSaved(data)
      onClose()
    } catch (error: unknown) {
      const axiosLike = error as {
        response?: { data?: { error?: string } }
      }
      Alert.alert(
        'Could not save',
        axiosLike.response?.data?.error ?? 'Try again later.',
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Edit profile</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TouchableOpacity style={styles.photoButton} onPress={pickAvatar}>
            <Text style={styles.photoButtonText}>
              {avatarUri ? 'Photo selected' : 'Choose profile photo'}
            </Text>
          </TouchableOpacity>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#FFFDFE" />
              ) : (
                <Text style={styles.saveText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
