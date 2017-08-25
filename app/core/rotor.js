// @flow

type Point = {
  x: number,
  y: number
}

type RotorLink = {
  rotation: number,
  rotor: Rotor // eslint-disable-line no-use-before-define
}

type RotorConnection = {
  offset: Point,
  rotor: Rotor // eslint-disable-line no-use-before-define
}

/**
 * A Rotor is a circular object that rotates,
 * and can have other rotors attached to its circumference.
 *
 * @class Rotor
 */
export class Rotor {

  _rotation: number
  _speed: number
  _links: RotorLink[]

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
    // :: (2 * Math.PI / torque * 1000)
    return Math.PI / (this._speed * 500)
  }

  /**
   * Returns all the rotors attached to this rotor,
   * along with a tuple offset of each from this rotor's origin.
   *
   * @readonly
   * @type {RotorConnection[]}
   * @memberof Rotor
   */
  get links (): RotorConnection[] {
    return this._links.map(link => {
      // :: TODO
      return {
        offset: { x: 0, y: 0 },
        rotor: link.rotor
      }
    })
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
    return this._links.map(link => link.rotor)
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
  }

  rotate (tick: number = 0) {
    console.log(this.speed, tick, this.rotation, (this.speed * tick))
    this._rotation += (this.speed * tick)
    this._rotation %= (2 * Math.PI)
  }
}
