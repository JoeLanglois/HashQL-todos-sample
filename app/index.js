import b from 'bss'
import m from 'mithril'
import api from './api.js'
import { sql } from 'hashql'

window.m = m

let version = 'loading...'

api.one(sql`SELECT version();`).then(data => {
  version = data.version
})

m.mount(document.body, {
  view() {
    return m('div',
      m('h1', 'Hello HashQL!'),
      m('p', version)
    )
  }
})
