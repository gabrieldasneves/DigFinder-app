/**
 * Sets the root UIWindow background to match the splash (#5A3725) so iOS does not flash white before RN paints.
 */
const { CodeGenerator, withAppDelegate } = require('@expo/config-plugins')

const { mergeContents } = CodeGenerator

/** Expo template AppDelegate window creation (SDK 54). */
const WINDOW_LINE =
  /^\s*window = UIWindow\(frame: UIScreen\.main\.bounds\)\s*$/

const BROWN_BACKGROUND_SWIFT =
  'window?.backgroundColor = UIColor(red: 90/255, green: 55/255, blue: 37/255, alpha: 1)'

module.exports = function withIosBrownWindow (config) {
  return withAppDelegate(config, (config) => {
    if (config.modResults.language !== 'swift') {
      return config
    }
    try {
      const result = mergeContents({
        tag: 'digfinder-ios-brown-window',
        src: config.modResults.contents,
        newSrc: BROWN_BACKGROUND_SWIFT,
        anchor: WINDOW_LINE,
        offset: 1,
        comment: '//'
      })
      if (result.didMerge || result.didClear) {
        config.modResults.contents = result.contents
      }
    } catch (error) {
      if (error.code === 'ERR_NO_MATCH') {
        throw new Error(
          'with-ios-brown-window: AppDelegate template changed (no `window = UIWindow(frame: UIScreen.main.bounds)`). Update plugins/with-ios-brown-window.js.'
        )
      }
      throw error
    }
    return config
  })
}
