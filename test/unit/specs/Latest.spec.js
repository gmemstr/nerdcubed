import Vue from 'vue'
import HelloWorld from '@/components/Latest'

describe('Latest.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.video h1').textContent)
    .toEqual('Loading')
  })
})
