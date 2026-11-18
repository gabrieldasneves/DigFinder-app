import { ScrollView } from 'react-native'
import { Category } from '@/components/atoms/category'
import { styles } from './styles'

type DiscoveryCategoryItem = {
  id: string
  name: string
}

type Props = {
  categories: DiscoveryCategoryItem[]
}

export function DiscoveryCategories ({ categories }: Props) {
  if (categories.length === 0) return null

  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          name={category.name}
          iconId={category.id}
          isSelected
          disabled
        />
      ))}
    </ScrollView>
  )
}
