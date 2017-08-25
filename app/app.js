// @flow

import { Rotor } from './core/rotor'
import { Renderer } from './core/renderer'

const root = new Rotor(50, 0)

document.addEventListener('DOMContentLoaded', () => {
  // :: get DOM hooks
  const cyclorama = document.getElementById('cyclorama')
  const renderer = new Renderer(root)

  renderer.initialize(cyclorama)

  // renderer.render()
  renderer.play()
})
