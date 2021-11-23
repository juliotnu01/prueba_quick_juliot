<template>
  <v-app>
    <v-dialog v-model="openDialog" persistent width="900px">
      <v-card>
        <v-card-title> </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="6">
              <v-img height="400px" :src="pokemon_detail.default_img" contain> </v-img>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="6">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-chip class="ma-2" color="primary" outlined pill>
                    POKEMON: {{ pokemon_detail.nombre_pokemon }}
                    <v-icon right> {{ pokemon_detail.id }} </v-icon>
                  </v-chip>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <span> {{ pokemon_detail.descripcion_pokemon }}</span>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left"></th>
                          <th class="text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td class="text-start" >Nombre del Pokemon</td>
                          <td class="text-start">{{ pokemon_detail.nombre_pokemon }}</td>
                        </tr>
                        <tr >
                          <td class="text-start" >ID del Pokemon</td>
                          <td class="text-start">{{ pokemon_detail.id }}</td>
                        </tr>
                        <tr >
                          <td class="text-start" >Descripcion del Pokemon</td>
                          <td class="text-start">{{ pokemon_detail.descripcion_pokemon }}</td>
                        </tr>
                        <tr >
                          <td class="text-start" >Altura</td>
                          <td class="text-start">{{ pokemon_detail.altura }}cm</td>
                        </tr>
                        <tr >
                          <td class="text-start" >Peso</td>
                          <td class="text-start">{{ pokemon_detail.peso }}kg</td>
                        </tr>
                        <tr >
                          <td class="text-start" >Categoria</td>
                          <td class="text-start">{{ pokemon_detail.type.join() }}kg</td>
                        </tr>
                        <tr >
                          <td class="text-start" >Genero</td>
                          <td class="text-start">{{ pokemon_detail.gender }}</td>
                        </tr>
                        <tr >
                          <td class="text-start" >gabitad</td>
                          <td class="text-start">{{ pokemon_detail.habitad }}</td>
                        </tr>
                        <tr >
                          <td class="text-start" >Color</td>
                          <td class="text-start">{{ pokemon_detail.color }}</td>
                        </tr>
                        <tr >
                          <td class="text-start" >Tipo</td>
                          <td class="text-start">{{ pokemon_detail.type.join() }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="6">
              <v-timeline align-left dense>
                <v-timeline-item>
                    <div class="text-start" v-if="Object.entries(pokemon_detail).length > 0">
                    
                    {{ pokemon_detail.evolucion.species.name }} evoluciona a:
                    
                    <v-timeline align-left dense>
                        <v-timeline-item v-for="(evo2, ev2) in pokemon_detail.evolucion.evolves_to" :key="ev2">
                            <div class="text-start" v-if="pokemon_detail.evolucion.evolves_to.length > 0">
                            
                            {{ evo2.species.name }} evoluciona a:


                            <v-timeline align-left dense>
                                <v-timeline-item v-for="(evo3, ev3) in evo2.evolves_to" :key="ev3">
                                    <div class="text-start" v-if="pokemon_detail.evolucion.evolves_to.length > 0">
                                    
                                    {{ evo3.species.name }} 
                                    
                                    
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                            
                            
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                    
                    </div>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="openDialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["dialog_view_pokemon_modal", "pokemon_detail"]),
    openDialog: {
      get() {
        return this.dialog_view_pokemon_modal;
      },
      set(val) {
        this.$store.commit("setViewPokemonModal", val);
      },
    },
  },
  data() {
    return {
      messages: [
        {
          from: "You",
          message: `Sure, I'll see you later.`,
          time: "10:42am",
          color: "deep-purple lighten-1",
        },
      ],
    };
  },
};
</script>
