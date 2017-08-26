const component = {
  props: ['rotors'],
  template: `
    <div class="rotor-list">
      <rotor v-for="rotor in rotors" v-bind:rotor="rotor"></rotor>
    </div>
  `
}

export default Vue.component('rotor-list', component)
