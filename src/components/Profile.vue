<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
    <v-flex d-flex xs4>
      <v-card color="blue">
        <v-card-title primary class="title">Welcome {{user.displayName}}</v-card-title>
      </v-card>
    </v-flex>
    <v-flex d-flex md5>
      <v-card color="purple">
        <v-card-title primary class="title">Overwatch Calculator</v-card-title>
        <v-card-text>Use this to calculate averages across multiple accounts if you have them!</v-card-text>
        <router-link to="Calculator">
        <v-btn class="text-xs-center" color="green" raised>Go Now!  <v-icon right dark>arrow_forward</v-icon></v-btn>
        </router-link>
      </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import fb from '../firebase';
    const newsKey = '7dc7c4d380b84bfbb04d68568e703f96';
    import axios from 'axios';

    export default {
        name: "profile",
        data(){
          return {
            user: {},
            roles: {},
            news: [],
            display:false,
            lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
          }
        },
        mounted(){
          fb.auth().onAuthStateChanged(u => {
            if(!u){
              this.$router.push("/");
            } else {
              fb.firestore().collection("Users").doc(u.uid).onSnapshot(snap => {
                this.roles = snap.data();
                this.display = true;
              });
              this.user = u;
              axios.get(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsKey}`)
                .then(res => {
                  this.news = res.data.articles;
                  console.log(this.news);
                })
            }
          })
        },
        methods:{
          logout(){
            fb.auth().signOut().then(this.$router.push("/"));
          }
        }
    }
</script>

<style scoped>

</style>
