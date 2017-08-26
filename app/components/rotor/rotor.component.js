const component = {
  props: ['rotor'],
  template: `
    <div class="rotor">
      <div class="properties">
        <label class="rotorproperty">
          <span>r</span>
          <input v-model="rotor.radius">
        </label>
        <label class="rotorproperty">
          <span>speed</span>
          <input v-model="rotor._speed">
        </label>
        <label class="rotorproperty">
          <span>rot</span>
          <input v-model="rotor._rotation">
        </label>
        <button class="action -addrotor"></button>
        <button class="action -deleterotor"></button>
      </div>

      <rotor-list v-if="rotor.rotors.length" v-bind:rotors="rotor.rotors"></rotor-list>
    </div>
  `
}

export default Vue.component('rotor', component)
