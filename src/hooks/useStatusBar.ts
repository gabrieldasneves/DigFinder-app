import { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { useFocusEffect } from 'expo-router'

export function useStatusBar(style: 'light' | 'dark') {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(
        style === 'light' ? 'light-content' : 'dark-content',
      )
    }, [style]),
  )
}
