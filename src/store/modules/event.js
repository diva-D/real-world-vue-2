import EventService from '@/services/EventService.js'

export const state = {
  events: [],
  total_count: 0,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_TOTAL_COUNT(state, count) {
    state.total_count = count
  }
}

export const actions = {
  createEvent({ commit }, event) {
    EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_TOTAL_COUNT', Number(response.headers['x-total-count']))
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit, getters }, id) {
    let event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
