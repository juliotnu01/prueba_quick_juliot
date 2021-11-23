<template>
  <v-app>
    <div class="mx-10">
      <v-app-bar color="white">
        <v-avatar color="orange" size="50">
          <span class="white--text text-h5">PM</span>
        </v-avatar>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading5"
          :disabled="loading5"
          color="blue-grey"
          class="ma-2 white--text"
          fab
          @click="reset"
        >
          <v-icon dark>
            mdi-reload
          </v-icon>
        </v-btn>
        <v-text-field label="Buscar" outlined dense small class="mt-5" v-model="filter" />
      </v-app-bar>
      <v-divider class="mt-10"></v-divider>
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="3">
          <v-card-title>filter <v-icon>mdi-filter </v-icon></v-card-title>
          <v-divider class="mt-2"></v-divider>
          <v-row class="">
            <v-col cols="6" sm="6" md="6" lg="6">
              <v-checkbox
                :label="type_pokemon.name"
                color="red"
                :value="type_pokemon.name"
                hide-details
                v-for="(type_pokemon, tp) in filter_type_pokemon1"
                :key="tp"
                v-model="filter_type_pokemon_selected"
              ></v-checkbox>
            </v-col>
            <v-col cols="6" sm="6" md="6" lg="6">
              <v-checkbox
                :label="type_pokemon.name"
                color="red"
                :value="type_pokemon.name"
                hide-details
                v-for="(type_pokemon, tp) in filter_type_pokemon2"
                :key="tp"
                v-model="filter_type_pokemon_selected"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-divider class="mt-5"></v-divider>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="12" class="d-flex">
              <v-radio-group v-model="filter_color_pokemon_selected" row>
                <v-radio
                  v-for="(color_pokemon, cp) in filter_color_pokemon"
                  :key="cp"
                  :label="color_pokemon.name"
                  :value="color_pokemon.name"
                  :color="color_pokemon.name"
                  class="m-5"
                />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-divider class="mt-5"></v-divider>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-checkbox
                :label="gender.name"
                :value="gender.name"
                hide-details
                v-for="(gender, gp) in filter_gender_pokemon"
                :key="gp"
                class="m-2"
                v-model="filter_gender_pokemon_selected"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="mt-3"></v-divider>
        <v-col cols="12" sm="7" md="7" lg="7">
          <v-card-title>Choose a pokemon to get more information</v-card-title>
          <v-row class="d-flex justify-space-around mb-6" v-if="pokemones.length > 0">
            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
              v-for="(pokemon, p) in filteredPokemones"
              :key="p"
            >
              <v-card @click.prevent="ViewPokemonDetail(pokemon)" >
                <v-img height="200px" :src="pokemon.default_img" contain> </v-img>
                <v-card-text style="text-transform: uppercase">
                  {{ pokemon.nombre_pokemon }}</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-btn color="success" @click.prevent="handleListPokemons(true)">Load More...</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    <view-pokemon-modal />
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import ViewPokemonModal from './modals/viewPokemonModal.vue'
export default {
  name: "HelloWorld",
  components:{
    'view-pokemon-modal': ViewPokemonModal
  },
  data() {
    return {
      pokemones: [],
      filter_color_pokemon: "",
      filter_color_pokemon_selected: "",
      filter_type_pokemon1: "",
      filter_type_pokemon2: "",
      filter_type_pokemon_selected: [],
      filter_gender_pokemon: "",
      filter_gender_pokemon_selected: '',
      filter: "",
      loading5: false,
    };
  },
  mounted() {
    this.getPokemons();
    this.filtersPokemon();
  },
  computed: {
    ...mapGetters(["pokemons_nacionales"]),
    filteredPokemones() {
      return this.filterBynamePokemones(this.filterByColorPokemones(this.filterByTypePokemones(this.filterByGenderPokemones(this.pokemones))));
    },
  },
  methods: {
    async getPokemons() {
      try {
        this.loading5 = true
        let { data } = await axios("https://pokeapi.co/api/v2/pokedex/1");
        this.$store.commit("setPokemonesNacionales", data.pokemon_entries);
        this.handleListPokemons();
      } catch (error) {
        console.log(error);
      }
    },
    async handleListPokemons(addAnothertwenty = false) {
      try {
        var primeros_20_pokemon = this.pokemons_nacionales.slice(0, 20);

        if(addAnothertwenty){
          primeros_20_pokemon = this.pokemons_nacionales.slice(primeros_20_pokemon.length, (primeros_20_pokemon.length + 20 ))
        }

        for (let index = 0; index < primeros_20_pokemon.length; index++) {
          const element = primeros_20_pokemon[index];
          var { data } = await axios(element.pokemon_species.url);
          var img_pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${element.entry_number}`);
          var gender_pokemon = await axios(`https://pokeapi.co/api/v2/pokemon-species/${element.entry_number}`);
          var descripcion_pokemon = await axios(`https://pokeapi.co/api/v2/characteristic/${element.entry_number}`);
          var evolution_pokemon = await axios(`https://pokeapi.co/api/v2/evolution-chain/${element.entry_number}`);
          var type_pokemon = data.egg_groups.map((item) => {
            return item.name;
          });
          var model = {
            id: element.entry_number,
            nombre_pokemon: element.pokemon_species.name ?? "",
            color: data.color.name ?? "",
            type: type_pokemon ?? "",
            gender: gender_pokemon.data.gender_rate >= 4 ? "female" : gender_pokemon.data.gender_rate <= 4 ? "male" : gender_pokemon.data.gender_rate < 0 ? "genderless" : "",
            default_img: img_pokemon.data.sprites.other.home.front_default ?? "",
            descripcion_pokemon: descripcion_pokemon.data.descriptions[1].description,
            altura: img_pokemon.data.height,
            peso: img_pokemon.data.weight,
            categoria: '',
            habitad: gender_pokemon.data.habitat.name,
            evolucion: evolution_pokemon.data.chain
          };
          this.pokemones.push(model);
        }
        this.loading5 = false
      } catch (error) {
        console.log(error);
      }
    },
    async filtersPokemon() {
      try {
        var color = await axios("https://pokeapi.co/api/v2/pokemon-color/");
        var type = await axios("https://pokeapi.co/api/v2/egg-group/");
        var gender = await axios("https://pokeapi.co/api/v2/gender/");
        this.filter_type_pokemon1 = type.data.results.slice(0, 10);
        this.filter_type_pokemon2 = type.data.results.slice(10, 20);
        this.filter_color_pokemon = color.data.results;
        this.filter_gender_pokemon = gender.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    filterBynamePokemones(pokemones) {
      return pokemones.filter((pokemon) => {
        const filter = this.filter.toUpperCase();
        const hasNameMatch = pokemon.nombre_pokemon.toUpperCase().includes(filter);
        return hasNameMatch;
      });
    },
    filterByColorPokemones(pokemones) {
      return pokemones.filter((pokemon) => {
        const filter = this.filter_color_pokemon_selected.toUpperCase();
        const hasColorMatch = pokemon.color.toUpperCase().includes(filter);
        return hasColorMatch;
      });
    },
    filterByTypePokemones(pokemones) {
      return pokemones.filter((pokemon) => {
        const filter = this.filter_type_pokemon_selected;
        const hasTypeMatch = pokemon.type.join().includes(filter.join());
        return hasTypeMatch;
      });
    },
    filterByGenderPokemones(pokemones) {
      return pokemones.filter((pokemon) => {
        const filter = this.filter_gender_pokemon_selected.toUpperCase();
        const hasGenderMatch = pokemon.gender.toUpperCase().includes(filter);
        return hasGenderMatch;
      });
    },
    reset(){
      this.pokemones = [];
      this.filter_color_pokemon = "";
      this.filter_color_pokemon_selected = "";
      this.filter_type_pokemon1 = "";
      this.filter_type_pokemon2 = "";
      this.filter_type_pokemon_selected = [];
      this.filter_gender_pokemon = "";
      this.filter_gender_pokemon_selected = '';
      this.filter = "";
      this.getPokemons();
      this.filtersPokemon();
    },
    async ViewPokemonDetail(item){
      try{
        this.$store.commit("setPokemonDetail", item);
        this.$store.commit("setViewPokemonModal", true);
      }catch(error){
        console.log(error)
      }
    }
  },
};
</script>
