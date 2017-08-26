// @flow

require('./menu/menu.component')
require('./rotor-list/rotor-list.component')
require('./rotor/rotor.component')

export function initializeApp (data: any) {
  const app = new Vue({
    el: '#chrome',
    data
  })

  return app
}
