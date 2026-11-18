import { StyleSheet } from 'react-native'
import { colors } from '@/styles/colors'
import { fontFamily, typography } from '@/styles/typography'

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 2,
    padding: 7,
    backgroundColor: colors.gray[100],
    borderRadius: 12,
  },
  backButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: colors.brown.strong,
  },
  scroll: {
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    ...typography.titleLg,
    color: colors.brown.dark,
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.gray[200],
    marginBottom: 12,
  },
  badgeVerified: {
    backgroundColor: colors.green.dark,
  },
  badgeText: {
    ...typography.textXs,
    color: colors.gray[500],
    textTransform: 'capitalize',
  },
  badgeTextVerified: {
    color: colors.gray[100],
  },
  meta: {
    ...typography.textSm,
    color: colors.gray[400],
  },
  description: {
    ...typography.textMd,
    color: colors.gray[600],
    marginTop: 20,
  },
  descriptionEmpty: {
    color: colors.gray[400],
  },
  errorBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    ...typography.textMd,
    color: colors.gray[500],
    textAlign: 'center',
  },
})
