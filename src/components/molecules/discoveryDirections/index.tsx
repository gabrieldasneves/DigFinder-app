import { Text, TouchableOpacity, View } from 'react-native'
import { IconMap } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'
import { useOpenDiscoveryDirections } from '@/hooks/useOpenDiscoveryDirections'
import { styles } from './styles'

type Props = {
  latitude: number
  longitude: number
}

export function DiscoveryDirections ({ latitude, longitude }: Props) {
  const { openDirections } = useOpenDiscoveryDirections(latitude, longitude)

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Location</Text>
      <Text style={styles.coordinates}>
        {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => void openDirections()}>
        <IconMap size={20} color={colors.gray[100]} />
        <Text style={styles.buttonText}>Get directions</Text>
      </TouchableOpacity>
    </View>
  )
}
