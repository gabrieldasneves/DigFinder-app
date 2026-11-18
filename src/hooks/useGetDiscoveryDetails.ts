import { useCallback, useEffect, useState } from 'react'
import { api } from '@/services/api'
import type { DiscoveryDetailData } from '@/components/organisms/discoveryDetail/types'

function resolveId (id: string | string[] | undefined) {
  if (Array.isArray(id)) return id[0]
  return id
}

export function useGetDiscoveryDetails (id: string | string[] | undefined) {
  const discoveryId = resolveId(id)
  const [discovery, setDiscovery] = useState<DiscoveryDetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const fetchDiscovery = useCallback(async () => {
    if (!discoveryId) {
      setDiscovery(null)
      setHasError(true)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setHasError(false)

    try {
      const { data } = await api.get<DiscoveryDetailData>(
        `/registers/${discoveryId}`,
      )

      if (!data) {
        setDiscovery(null)
        setHasError(true)
        return
      }

      setDiscovery(data)
    } catch (error) {
      console.log(error)
      setDiscovery(null)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [discoveryId])

  useEffect(() => {
    void fetchDiscovery()
  }, [fetchDiscovery])

  return { discovery, isLoading, hasError }
}
