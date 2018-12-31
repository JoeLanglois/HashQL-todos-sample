import b from 'bss'
import m from 'mithril'
import api from './api.js'
import { sql } from 'hashql'

window.m = m // For Wright to do its magic

// Styles
b.css('html', b.ff('system-ui'))


// State
let version = 'loading...'

// Loading the postgres version
api.one(sql`SELECT version();`).then(data => {
  version = data.version
})

// Mount the component
m.mount(document.body, {
  view() {
    return m('div',
      m('h1' + b.c('red').ls('-0.075rem').ta('center'), 'Hello HashQL!'),
      m('p' + b.c('green').td('underline'), version)
    )
  }
})
