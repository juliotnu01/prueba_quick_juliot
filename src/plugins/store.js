import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    pokemons_nacionales:[],
    dialog_view_pokemon_modal: false,
    pokemon_detail:{},
  },
  getters:{
    pokemons_nacionales: state => state.pokemons_nacionales,
    dialog_view_pokemon_modal: state => state.dialog_view_pokemon_modal,
    pokemon_detail: state => state.pokemon_detail
  },
  mutations: {
    setPokemonesNacionales (state,data) {
      state.pokemons_nacionales = data
    },
    setViewPokemonModal(state, data){
      state.dialog_view_pokemon_modal = data
    },
    setPokemonDetail(state, data){
      state.pokemon_detail = data
    }
  }
})