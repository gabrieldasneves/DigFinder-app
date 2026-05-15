'use strict'

if (!Array.prototype.toReversed) {
  Object.defineProperty(Array.prototype, 'toReversed', {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function toReversed() {
      return [...this].reverse()
    },
  })
}
