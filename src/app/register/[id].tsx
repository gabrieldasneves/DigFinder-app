import { useLocalSearchParams } from 'expo-router'
import { DiscoveryDetail } from '@/components/organisms/discoveryDetail'
import { useGetDiscoveryDetails } from '@/hooks/useGetDiscoveryDetails'
import { useStatusBar } from '@/hooks/useStatusBar'

export default function RegisterDetail () {
  useStatusBar('dark')
  const { id } = useLocalSearchParams()
  const { discovery, isLoading, hasError } = useGetDiscoveryDetails(id)

  return (
    <DiscoveryDetail
      discovery={discovery}
      isLoading={isLoading}
      hasError={hasError}
    />
  )
}
