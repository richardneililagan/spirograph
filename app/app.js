// @flow

import { Rotor } from './core/rotor'
import { Renderer } from './core/renderer'

import { initializeApp } from './components/vue.app'

const root = new Rotor(75, 0, 9)

// : DEBUG
const secondaryRotor = new Rotor(100, 0, 3)
secondaryRotor.addPen(100, 0)

root.addRotorLink(secondaryRotor, 0)

const tertiaryRotor = new Rotor(175, 0, 6)
tertiaryRotor.addPen(175, 0, 'red')

secondaryRotor.addRotorLink(tertiaryRotor, 0)

document.addEventListener('DOMContentLoaded', () => {
  // :: get DOM hooks
  const cyclorama = document.getElementById('cyclorama')
  const renderer = new Renderer(root)

  renderer.initialize(cyclorama)

  // :: --- initialize vue bindings

  initializeApp({
    rotors: [root],
    renderer
  })

  // :: ---

  // renderer.play()
})
