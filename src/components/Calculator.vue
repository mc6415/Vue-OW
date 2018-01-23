<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
      <v-flex d-flex xs5>
        <v-card color="purple">
          <v-card-title class="title" primary>Accounts: {{numberOfAccounts}}</v-card-title>
          <v-card-text>
            <v-text-field v-for="n in numberOfAccounts" label="Account" v-model="accounts[n-1]" :key="n"></v-text-field>
          </v-card-text>
          <v-card-text class="text-xs-center accountControl" @click="numberOfAccounts++">
            Add Account <v-icon class="text-xs-center">add_circle_outline</v-icon>
          </v-card-text>
          <v-card-text class="text-xs-center accountControl" @click="numberOfAccounts--">
            Remove Account <v-icon>remove_circle_outline</v-icon>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs 6>
        <v-card color="orange">
          <v-card-title class="title" primary>Calculate</v-card-title>
          <v-card-text class="text-xs-center">
            <v-btn color="green" @click="getAccounts" :disabled="numberOfAccounts < 1" :loading="loading">Calculate!</v-btn>
          </v-card-text>
          <v-card-text>
            <v-card v-for="(account, index) in accountDetails" :key="index">
              <v-card-title class="title" primary>{{accounts[index]}}</v-card-title>
              <v-divider dark></v-divider>
              <v-card-text>
                <v-data-table v-bind:headers="headers" :items="testHeroStats" item-key="hero">
                  <template slot="items" slot-scope="props">
                    <td @click="showHeroStats(props.item, accounts[index])">{{props.item.hero}}</td>
                    <td>{{props.item.stats.general_stats.time_played}}</td>
                    <td>{{props.item.stats.general_stats.win_percentage}}</td>
                  </template>
                  <template slot="expand" slot-scope="props">
                    <h1>Hello</h1>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
      <v-layout wrap row>
        <v-flex xs12>
          <v-card color="red" v-if="selectedHero != null">
            <v-card-title class="title" primary>{{selectedHero.hero}} stats</v-card-title>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import fb from '../firebase';

    export default {
        name: "calculator",
        data(){
          return{
            headers: [
              {text: 'Hero', value:'hero'},
              {text: 'Time Played (Hours)', value:'time'},
              {text: 'Win Percentage', value:'win_percentage'}
              ],
            accounts: [],
            accountDetails: [],
            testHeroStats:  [],
            numberOfAccounts: 0,
            loading: false,
            selectedHero: null
          }
        },
        methods: {
          showHeroStats(stats, player){
            this.selectedHero = stats;
            this.$router.push(`/${stats.hero}stats/${player.replace('#','-')}`);
          },
          getAccounts(){
            this.loading=true;
            axios.get(`https://owapi.net/api/v3/u/${this.accounts[0].replace('#', '-')}/blob`)
              .then(res => {
                console.log(res.data);
                this.accountDetails.push(res.data);
                for(var i in res.data.eu.heroes.stats.competitive){
                  const heroItem = {
                    hero: i,
                    stats: res.data.eu.heroes.stats.competitive[i]
                  }
                  fb.firestore().collection(this.accounts[0]).doc(i).set(res.data.eu.heroes.stats.competitive[i]);
                  this.testHeroStats.push(heroItem);
                }
                this.loading=false;
              })
          }
        }
    }
</script>

<style scoped>
  .accountControl{
    cursor: pointer;
  }
</style>
