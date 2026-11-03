import { UserProfile } from '@/components/organisms/userProfile'
import { useStatusBar } from '@/hooks/useStatusBar'

export default function ProfileScreen() {
  useStatusBar('dark')
  return <UserProfile />
}
