import { StyleSheet } from 'react-native'
import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/typography'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.gray[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    color: colors.brown.strong,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[600],
    marginBottom: 16,
    backgroundColor: colors.gray[100],
  },
  photoButton: {
    borderWidth: 1.5,
    borderColor: colors.brown.middle,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  photoButtonText: {
    fontFamily: fontFamily.semiBold,
    color: colors.brown.middle,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[300],
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: fontFamily.semiBold,
    color: colors.gray[500],
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.brown.strong,
    alignItems: 'center',
  },
  saveText: {
    fontFamily: fontFamily.semiBold,
    color: colors.gray[100],
  },
})
