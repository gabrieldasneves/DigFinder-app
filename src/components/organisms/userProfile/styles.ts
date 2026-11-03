import { StyleSheet } from 'react-native'
import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/typography'

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 2,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: colors.brown.strong,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 12,
  },
  avatarFallback: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brown.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInitials: {
    fontSize: 24,
    fontFamily: fontFamily.semiBold,
    color: colors.brown.strong,
  },
  name: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[600],
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.brown.strong,
  },
  statLine: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[600],
    marginBottom: 10,
  },
  listGap: {
    gap: 10,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[400],
    marginBottom: 8,
  },
  deleteButton: {
    marginTop: 28,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  deleteText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.red.redwood,
  },
})
