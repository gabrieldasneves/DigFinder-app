import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Loading } from '@/components/atoms/loading'
import { DiscoveryCarousel } from '@/components/molecules/discoveryCarousel'
import type { DiscoveryDetailData } from './types'
import { styles } from './styles'

type Props = {
  discovery: DiscoveryDetailData | null
  isLoading: boolean
  hasError: boolean
}

function formatDiscoveryDate (iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export function DiscoveryDetail ({ discovery, isLoading, hasError }: Props) {
  const insets = useSafeAreaInsets()

  if (isLoading) {
    return <Loading />
  }

  if (hasError || !discovery) {
    return (
      <View style={styles.screen}>
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + 8 }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.errorBody}>
          <Text style={styles.errorText}>Could not load this discovery.</Text>
        </View>
      </View>
    )
  }

  const isVerified = discovery.status === 'verified'

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 8 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <DiscoveryCarousel images={discovery.images} />
        <View style={styles.content}>
          <Text style={styles.title}>{discovery.title}</Text>
          <View style={[styles.badge, isVerified && styles.badgeVerified]}>
            <Text
              style={[styles.badgeText, isVerified && styles.badgeTextVerified]}
            >
              {discovery.status}
            </Text>
          </View>
          <Text style={styles.meta}>Reported by {discovery.user.name}</Text>
          <Text style={styles.meta}>
            {formatDiscoveryDate(discovery.discoveryDate)}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
