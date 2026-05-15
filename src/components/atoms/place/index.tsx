import { TouchableOpacity, View, Text, Image } from 'react-native'
import { styles } from './styles'
import { TouchableOpacityProps } from 'react-native'

export type DiscoveryProps = {
  id: string
  title: string
  description: string | null
  imageUrl?: string
}

type Props = TouchableOpacityProps & {
  data: DiscoveryProps
}

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image
        style={styles.image}
        source={
          data.imageUrl
            ? { uri: data.imageUrl }
            : require('../../../assets/avatarImg.png')
        }
      />
      <View style={styles.content}>
        <Text style={styles.name}>{data.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description ?? 'No description provided.'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
