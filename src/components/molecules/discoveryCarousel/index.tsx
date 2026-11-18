import { useState } from 'react'
import {
  FlatList,
  Image,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import { IconBone } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'
import { carouselHeight, styles } from './styles'

type CarouselImage = {
  id: string
  url: string
  orderIndex: number
}

type Props = {
  images: CarouselImage[]
}

export function DiscoveryCarousel ({ images }: Props) {
  const { width } = useWindowDimensions()
  const [activeIndex, setActiveIndex] = useState(0)
  const orderedImages = [...images].sort((a, b) => a.orderIndex - b.orderIndex)

  function handleScroll (event: NativeSyntheticEvent<NativeScrollEvent>) {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width)
    setActiveIndex(nextIndex)
  }

  if (orderedImages.length === 0) {
    return (
      <View style={[styles.placeholder, { width }]}>
        <IconBone size={48} color={colors.gray[400]} strokeWidth={1.5} />
      </View>
    )
  }

  return (
    <View style={styles.frame}>
      <FlatList
        data={orderedImages}
        horizontal
        pagingEnabled
        bounces={false}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={[styles.image, { width }]}
            resizeMode="cover"
          />
        )}
      />
      <View style={styles.indicator} pointerEvents="none">
        <Text style={styles.counter}>
          {activeIndex + 1} / {orderedImages.length}
        </Text>
        {orderedImages.length > 1 && (
          <View style={styles.dots}>
            {orderedImages.map((image, index) => (
              <View
                key={image.id}
                style={[styles.dot, index === activeIndex && styles.dotActive]}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
