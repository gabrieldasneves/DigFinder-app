import { useMemo, useRef, useState } from 'react'
import {
  FlatList,
  PanResponder,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'
import type { DiscoveryProps } from '@/components/atoms/place'
import { router } from 'expo-router'
import { Place } from '@/components/atoms/place'

type Props = {
  data: DiscoveryProps[]
}

export function Places ({ data }: Props) {
  const { height: screenHeight } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const minHeight = Math.round(screenHeight * 0.28)
  const filterBottom = insets.top + 76 + 36
  const maxHeight = screenHeight - filterBottom - 16
  const maxHeightRef = useRef(maxHeight)
  maxHeightRef.current = maxHeight

  const heightRef = useRef(minHeight)
  const grantHeight = useRef(minHeight)
  const [height, setHeight] = useState(minHeight)

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 3,
        onPanResponderGrant: () => {
          grantHeight.current = heightRef.current
        },
        onPanResponderMove: (_, gesture) => {
          const next = Math.min(
            maxHeightRef.current,
            Math.max(minHeight, grantHeight.current - gesture.dy),
          )
          heightRef.current = next
          setHeight(next)
        },
        onPanResponderRelease: (_, gesture) => {
          const midpoint = (minHeight + maxHeightRef.current) / 2
          const pulledUp = gesture.vy < -0.4 || heightRef.current > midpoint
          const snapped = pulledUp ? maxHeightRef.current : minHeight
          heightRef.current = snapped
          setHeight(snapped)
        },
      }),
    [minHeight],
  )

  return (
    <View style={[styles.sheet, { height }]}>
      <View style={styles.handle} {...panResponder.panHandlers}>
        <View style={styles.indicator} />
        <Text style={styles.title}>Discoveries near you</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            onPress={() => router.push(`/register/${item.id}`)}
            data={item}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.content}
        ListEmptyComponent={<Text style={styles.empty}>No discoveries yet.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
