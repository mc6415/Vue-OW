<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list v-if="loggedIn" dense>
        <v-list-tile v-for="item in listItems" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.link">
             <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="" v-if="userRoles.admin">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Admin Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="red" raised v-if="loggedIn" @click="signout">Logout</v-btn>
    </v-toolbar>
    <v-content>
          <router-view></router-view>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import fb from './firebase';
require('firebase/firestore');
import Firebase from 'firebase';
import testchart from './components/Charts/Zarya/newChart';

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [],
      showSearch: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      loggedIn: false,
      userRoles: {},
      heroData: {},
      title: 'Vuetify.js',
      listItems: [
        {title: 'Profile', icon:'person', link:'Profile'},
        {title: 'Settings', icon:'settings', link:'Settings'}
      ]
    }
  },
  name: 'App',
  mounted(){
      fb.auth().onAuthStateChanged(u => {
        this.loggedIn = !!u;
        if(this.loggedIn){
          fb.firestore().collection("Users").doc(u.uid).onSnapshot(snap => {
            this.userRoles = snap.data();
          })
        }
      })
  },
  methods: {
    signout(){
      fb.auth().signOut()
        .then(err => {
          this.$router.push("/");
        })
    },
    saveHeroData(){
      console.log("Hello World")
    },
    components: { testchart }
  }
}
</script>

<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
  a{
    text-decoration:none;
  }
</style>
