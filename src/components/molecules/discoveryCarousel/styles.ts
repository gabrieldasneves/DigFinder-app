import { StyleSheet } from 'react-native'
import { colors } from '@/styles/colors'
import { typography } from '@/styles/typography'

export const carouselHeight = 260

export const styles = StyleSheet.create({
  frame: {
    height: carouselHeight,
  },
  image: {
    height: carouselHeight,
  },
  placeholder: {
    height: carouselHeight,
    backgroundColor: colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    alignItems: 'center',
    gap: 8,
  },
  counter: {
    ...typography.textXs,
    color: colors.gray[100],
    backgroundColor: 'rgba(26, 31, 36, 0.55)',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(252, 253, 254, 0.5)',
  },
  dotActive: {
    backgroundColor: colors.gray[100],
  },
})
