// @flow

import Two from 'two.js'
import { Pen, Rotor } from './rotor'

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

  paths: any = {}

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

    console.debug(this.canvas)
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

    rotorPath.noFill()
    rotorPath.stroke = 'rgba(0,0,0,.26)'
    rotorPath.lineWidth = 0.5

    // :: draw rotor mark
    const anchor: Point = plotPoint(origin, rotor.radius, rotor.rotation)
    const rotorMark = this.canvas.makeLine(
      origin.x, origin.y,
      anchor.x, anchor.y
    )

    rotorMark.stroke = 'rgba(0,0,0,.26)'
    rotorMark.lineWidth = 0.5

    // :: ---

    // :: draw rotor pen paths
    rotor.pens.forEach(pen => {
      const projectedOrigin = plotPoint(origin, pen.radius, rotor.rotation + pen.rotation)
      this.drawPenPath(pen, projectedOrigin)
    })

    // :: ---

    // :: draw rotor links
    rotor.links.forEach(link => {
      const projectedOrigin = plotPoint(origin, rotor.radius, rotor.rotation + link.rotation)
      this.drawRotor(link.rotor, projectedOrigin, delta)
    })
  }

  drawPenPath (pen: Pen, vertex: Point) {
    if (!this.paths[pen.id]) {
      console.debug(`Creating path for pen ${pen.id}`)

      const p = new Two.Path([], false, true)

      p.stroke = pen.color
      p.linewidth = pen.width
      p.noFill()

      this.paths[pen.id] = p
    }

    const path = this.paths[pen.id]
    path.vertices.push(new Two.Anchor(vertex.x, vertex.y))
    this.canvas.scene.add(path)

    // console.debug(path)
  }

  tick () {
    this.render()
    this.canvas.update()
  }

  play () {
    this.canvas.bind('update', () => this.render()).play()
  }
}
