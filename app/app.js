// @flow

import { Rotor } from './core/rotor'
import { Renderer } from './core/renderer'

const root = new Rotor(75, 0, 9)

// : DEBUG
const secondaryRotor = new Rotor(100, 0, 3)
secondaryRotor.addPen(100, 0)

const tertiaryRotor = new Rotor(100, 0, 3)
tertiaryRotor.addPen(100, 0, 'red')

root.addRotorLink(secondaryRotor, 0)
root.addRotorLink(tertiaryRotor, Math.PI)

document.addEventListener('DOMContentLoaded', () => {
  // :: get DOM hooks
  const cyclorama = document.getElementById('cyclorama')
  const renderer = new Renderer(root)

  console.log(renderer)

  renderer.initialize(cyclorama)

  // renderer.tick()
  renderer.play()
})
