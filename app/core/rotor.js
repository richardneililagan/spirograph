// @flow

type RotorLink = {
  rotation: number,
  rotor: Rotor // eslint-disable-line no-use-before-define
}

export class Pen {
  rotation: number = 0
  radius: number = 10

  color: string = 'red'
  width: number = 2

  id: string

  constructor (radius: number, rotation: number, color?: string = 'blue', width?: number = 2) {
    this.radius = radius
    this.rotation = rotation
    this.color = color
    this.width = width

    // :: generate a (hopefully) unique id
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}

/**
 * A Rotor is a circular object that rotates,
 * and can have other rotors attached to its circumference.
 *
 * @class Rotor
 */
export class Rotor {

  static registration: Rotor[] = []

  _rotation: number = 0
  _speed: number = 10

  links: RotorLink[] = []
  pens: Pen[] = []

  /**
   * Radius length.
   *
   * @type {number}
   * @memberof Rotor
   */
  radius: number

  /**
   * Current rotation, in radians.
   *
   * @type {number}
   * @memberof Rotor
   */
  get rotation (): number {
    return this._rotation || 0
  }

  /**
   * Returns the radians of rotation per ms
   * for this rotor.
   * This calculation is based off of the torque property.
   *
   * @readonly
   * @type {number}
   * @memberof Rotor
   */
  get speed (): number {
    // :: (2 * Math.PI / (speed * 1000))
    return Math.PI / (this._speed * 500)
  }

  /**
   * Returns all rotors attached to this rotor,
   * as a flat collection.
   *
   * @readonly
   * @type {Rotor[]}
   * @memberof Rotor
   */
  get rotors (): Rotor[] {
    return this.links.map(link => link.rotor)
  }

  r () {
    return this.rotors
  }

  /**
   * Creates an instance of Rotor.
   * @param {number} r - radius length of the rotor.
   * @param {number} rotation - starting rotation of the rotor, in radians.
   * @param {number} speed - how many seconds to complete one full revolution.
   * @memberof Rotor
   */
  constructor (r: number, rotation: number, speed: number = 10) {
    this.radius = r
    this._rotation = rotation
    this._speed = speed

    Rotor.registration.push(this)
  }

  /**
   * Incremets this rotor's rotation based on how much time has elapsed
   * since the last render tick.
   *
   * @param {number} [tick=0] milliseconds since last render tick
   * @memberof Rotor
   */
  rotate (tick: number = 0) {
    this._rotation += (this.speed * tick)
    this._rotation %= (2 * Math.PI)
  }

  /**
   * Attaches a Rotor to this one's circumference.
   *
   * @param {Rotor} rotor The Rotor to attach.
   * @param {nunber} rotation The angle from 0 of the bisecting line that marks the anchor point in the circumference where this rotor is attached.
   * @memberof Rotor
   */
  addRotorLink (rotor: Rotor, rotation: nunber) {
    this.links.push({ rotation, rotor })
  }

  addPen (radius: number, rotation: number, color?: string, width?: number) {
    this.pens.push(new Pen(radius, rotation, color, width))
  }

  /**
   * Deregisters this Rotor,
   * and all its links.
   *
   * @memberof Rotor
   */
  remove () {
    this.rotors.forEach(rotor => rotor.remove())
  }
}
