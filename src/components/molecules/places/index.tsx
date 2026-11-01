import { useWindowDimensions, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'
import { useRef } from 'react'
import type { DiscoveryProps } from '@/components/atoms/place'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { Place } from '@/components/atoms/place'

type Props = {
  data: DiscoveryProps[]
}

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const minSnap = Math.round(dimensions.height * 0.28)
  const maxSnap = dimensions.height - insets.top - 96
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={[minSnap, maxSnap]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item: DiscoveryProps) => item.id as string}
        renderItem={({ item }: { item: DiscoveryProps }) => (
          <Place
            onPress={() => router.push(`/register/${item.id}`)}
            data={item}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Discoveries near you</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}
