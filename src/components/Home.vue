<template>
  <v-container fluid dark>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center dark>
        <v-layout row wrap>
          <v-flex d-flex md12 class="align-center">
            <h1 class="display-4 text-xs-center">Hello and Welcome</h1>
          </v-flex>
          <v-flex d-flex xs12>
            <h3 class="text-xs-center">Please use one of the methods below to sign in</h3>
          </v-flex>
          <v-flex d-flex>
            <v-btn color="green" @click="loginGoogle">Login with Google</v-btn>
            <v-btn color="blue" @click="loginFacebook">Login with Facebook</v-btn>
          </v-flex>
        </v-layout>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
    import fb from '../firebase';
    import Moment from 'moment';
    import PasswordGen from 'z-password-gen';
    import Firebase from 'firebase';
    require('firebase/firestore');

    export default {
        name: "home",
        data(){
          return{
            clients: [],
            menu: false,
            dateFormatted: '',
            loading: false,
            client: {},
            headers: [
              {text: 'First Name', value: 'firstName'},
              {text: 'Surname', value: 'surname'},
              {text: 'Date of Birth', value: 'dob'}
            ]
          }
        },
        mounted(){
          fb.auth().onAuthStateChanged(u => {
            if(u){
              this.$router.push('/Profile');
            }
          })
        },
        methods: {
          loginGoogle(){
            const provider = new Firebase.auth.GoogleAuthProvider();
            fb.auth().signInWithPopup(provider)
              .then(user => {
                this.loginUser(user);
              });
          },
          loginFacebook(){
            const provider = new Firebase.auth.FacebookAuthProvider();
            fb.auth().signInWithPopup(provider)
              .then(user => {
                this.loginUser(user);
              })
          },
          loginUser(user){
            const userRef = fb.firestore().collection("Users").doc(user.user.uid);
            userRef.get().then(snap => {
              if(!snap.exists){
                const userRole = {
                  admin: false
                };
                fb.firestore().collection("Users").doc(user.user.uid).set(userRole);
              }
            })
            this.$router.push("/Profile");
          }
        }

    }
</script>

<style scoped>

</style>
