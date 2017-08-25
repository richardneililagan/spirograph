// @flow

import Two from 'two.js'
import { Rotor } from './rotor'

type Point = {
  x: number,
  y: number
}

function plotPoint (origin: Point, radius: number, angle: number): Point {
  return {
    x: Math.cos(angle) * radius + origin.x,
    y: Math.sin(angle) * radius + origin.y
  }
}

export class Renderer {

  canvas: Two
  rootRotor: Rotor

  tickSpeed: number

  get origin (): Point {
    return {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    }
  }

  constructor (root: Rotor) {
    this.rootRotor = root
    this.canvas = new Two({
      type: Two.Types.canvas,
      fullscreen: true
    })
  }

  /**
   * Attaches the Two instance into the DOM
   *
   * @param {*} element
   * @memberof Renderer
   */
  initialize (element: any) {
    this.canvas.appendTo(element)
  }

  render () {
    this.canvas.clear()
    this.drawRotor(this.rootRotor, this.origin, this.canvas.timeDelta)
    // this.canvas.update()
  }

  drawRotor (rotor: Rotor, origin: Point, delta: number) {
    // :: rotate this rotor by the number of ms
    rotor.rotate(delta)
    const rotorPath = this.canvas.makeCircle(origin.x, origin.y, rotor.radius)

    // rotorPath.stroke = 'rgba(0,0,0,.26)'
    rotorPath.stroke = 'red'
    rotorPath.lineWidth = 1

    // :: draw rotor mark
    const anchor: Point = plotPoint(origin, rotor.radius, rotor.rotation)
    const rotorMark = this.canvas.makeLine(
      origin.x, origin.y,
      anchor.x, anchor.y
    )

    rotorMark.stroke = 'rgba(0,0,0,.26)'
    rotorMark.lineWidth = 1
  }

  play () {
    this.canvas.bind('update', () => this.render()).play()
  }
}
