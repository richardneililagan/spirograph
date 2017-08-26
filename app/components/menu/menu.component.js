const component = {
  props: ['renderer'],
  template: `
    <div class="app-menu">
      <button class="button -playsimulation" v-on:click="play">Play simulation</button>
      <button class="button -pausesimulation" v-on:click="pause">Pause simulation</button>
    </div>
  `,
  methods: {
    play: function () { this.renderer.play() },
    pause: function () { this.renderer.pause() }
  }
}

export default Vue.component('spirograph-menu', component)
