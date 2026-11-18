import { StyleSheet } from 'react-native'
import { colors } from '@/styles/colors'
import { fontFamily, typography } from '@/styles/typography'

export const styles = StyleSheet.create({
  section: {
    marginTop: 28,
  },
  label: {
    ...typography.titleSm,
    color: colors.brown.dark,
    marginBottom: 8,
  },
  coordinates: {
    ...typography.textSm,
    color: colors.gray[500],
    marginBottom: 16,
  },
  button: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.green.dark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    ...typography.action,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[100],
  },
})
