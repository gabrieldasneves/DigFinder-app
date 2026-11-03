import { useCallback, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router, useFocusEffect } from 'expo-router'
import { useAuth, type User } from '@/contexts/Authcontext'
import { api } from '@/services/api'
import { Place } from '@/components/atoms/place'
import { Loading } from '@/components/atoms/loading'
import { ModalConfirm } from '@/components/molecules/modalConfirm'
import { EditProfileModal } from '@/components/organisms/editProfileModal'
import { styles } from './styles'

type ProfileDiscovery = {
  id: string
  title: string
  description: string | null
  discoveryDate: string
  images?: Array<{ url: string; isPrimary: boolean }>
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase()
}

function formatDiscoveryDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export function UserProfile() {
  const insets = useSafeAreaInsets()
  const { user, updateUser, signOut } = useAuth()
  const [discoveries, setDiscoveries] = useState<ProfileDiscovery[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false)

  const fetchDiscoveries = useCallback(async () => {
    setLoadingList(true)
    try {
      const { data } = await api.get<ProfileDiscovery[]>(
        '/discoveries/getDiscoveries',
      )
      setDiscoveries(data)
    } catch {
      Alert.alert('Error', 'Could not load your discoveries.')
    } finally {
      setLoadingList(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      void fetchDiscoveries()
    }, [fetchDiscoveries]),
  )

  if (!user) {
    return <Loading />
  }

  async function handleDeleteAccount() {
    setDeleteConfirmVisible(false)
    try {
      await api.delete('/auth/me')
      await signOut()
    } catch {
      Alert.alert('Error', 'Could not delete account. Try again later.')
    }
  }

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 8 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 48 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {user.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitials}>{getInitials(user.name)}</Text>
            </View>
          )}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditVisible(true)}
          >
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.statLine}>
          {discoveries.length}{' '}
          {discoveries.length === 1 ? 'discovery' : 'discoveries'}
        </Text>

        <Text style={styles.sectionTitle}>Your discoveries</Text>
        {loadingList ? (
          <Loading />
        ) : discoveries.length === 0 ? (
          <Text style={styles.emptyText}>No discoveries yet.</Text>
        ) : (
          <View style={styles.listGap}>
            {discoveries.map((item) => {
              const primary =
                item.images?.find((img) => img.isPrimary) ?? item.images?.[0]
              const subtitle = formatDiscoveryDate(item.discoveryDate)
              return (
                <Place
                  key={item.id}
                  data={{
                    id: item.id,
                    title: item.title,
                    description: item.description ?? subtitle,
                    imageUrl: primary?.url,
                  }}
                  onPress={() => router.push(`/register/${item.id}`)}
                />
              )
            })}
          </View>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setDeleteConfirmVisible(true)}
        >
          <Text style={styles.deleteText}>Delete account</Text>
        </TouchableOpacity>
      </ScrollView>

      <EditProfileModal
        visible={editVisible}
        user={user}
        onClose={() => setEditVisible(false)}
        onSaved={(updated: User) => updateUser(updated)}
      />

      <ModalConfirm
        visible={deleteConfirmVisible}
        title="Delete account"
        message="This will permanently remove your account and discoveries. Continue?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteConfirmVisible(false)}
        onConfirm={handleDeleteAccount}
      />
    </View>
  )
}
