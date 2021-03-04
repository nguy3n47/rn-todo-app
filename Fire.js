import firebase from 'firebase';
import '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBYEvyPQGq1EgVP6Hzx4DkYTwqLrK0Sa5c',
  authDomain: 'todoapp-2c135.firebaseapp.com',
  projectId: 'todoapp-2c135',
  storageBucket: 'todoapp-2c135.appspot.com',
  messagingSenderId: '564666982996',
  appId: '1:564666982996:web:bc87fe8a545dae766483c1',
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists = (callback) => {
    firebase.firestore().settings({ experimentalForceLongPolling: true });
    let ref = this.ref.orderBy('name');

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  };

  addList(list) {
    let ref = this.ref;
    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists');
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
