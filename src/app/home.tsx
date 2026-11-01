import { View } from 'react-native'
import { Welcome } from '@/components/atoms/welcome'
import { UserMenu } from '@/components/molecules/userMenu'
import { ButtonFlowList } from '@/components/atoms/buttonFlowList'
import { useStatusBar } from '@/hooks/useStatusBar'
import { colors } from '@/styles/colors'

export function Home() {
  useStatusBar('dark')

  return (
    <View
      style={{
        flex: 1,
        padding: 40,
        gap: 40,
        backgroundColor: colors.gray[100],
      }}
    >
      <UserMenu />
      <Welcome />
      <ButtonFlowList />
    </View>
  );
}

export default Home;
