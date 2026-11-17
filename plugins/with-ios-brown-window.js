/**
 * Sets the root UIWindow background to match the splash (#5A3725) so iOS does not
 * flash white before React Native paints.
 *
 * SDK 58 creates the window in SceneDelegate (UIScene lifecycle), not AppDelegate.
 */
const fs = require('fs')
const path = require('path')
const { withDangerousMod } = require('expo/config-plugins')

const MARKER = 'digfinder-ios-brown-window'
const BACKGROUND =
  'window?.backgroundColor = UIColor(red: 90/255, green: 55/255, blue: 37/255, alpha: 1)'

const METHOD = `  // @generated begin ${MARKER}
  override func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    super.scene(scene, willConnectTo: session, options: connectionOptions)
    ${BACKGROUND}
  }
  // @generated end ${MARKER}`

function findFile (dir, name) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === 'Pods' || entry.name === 'build') {
      continue
    }
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const found = findFile(fullPath, name)
      if (found) {
        return found
      }
    } else if (entry.name === name) {
      return fullPath
    }
  }
  return null
}

module.exports = function withIosBrownWindow (config) {
  return withDangerousMod(config, [
    'ios',
    (modConfig) => {
      const iosRoot = modConfig.modRequest.platformProjectRoot
      const sceneDelegatePath = findFile(iosRoot, 'SceneDelegate.swift')
      if (!sceneDelegatePath) {
        throw new Error(
          'with-ios-brown-window: SceneDelegate.swift was not generated. SDK 58 creates the window in the scene delegate.'
        )
      }

      let contents = fs.readFileSync(sceneDelegatePath, 'utf8')
      if (contents.includes(MARKER)) {
        return modConfig
      }

      if (!contents.includes('import UIKit')) {
        contents = `import UIKit\n${contents}`
      }

      const classOpen = contents.indexOf('class SceneDelegate')
      const brace = classOpen === -1 ? -1 : contents.indexOf('{', classOpen)
      if (brace === -1) {
        throw new Error(
          'with-ios-brown-window: SceneDelegate class body not found. Update plugins/with-ios-brown-window.js.'
        )
      }

      contents = `${contents.slice(0, brace + 1)}\n${METHOD}\n${contents.slice(brace + 1)}`
      fs.writeFileSync(sceneDelegatePath, contents)
      return modConfig
    },
  ])
}
