const firebaseConfig = {
  apiKey: "AIzaSyCBqOmCloTVn6gmCljLdLYLhKtp9lNNJEw",
  authDomain: "fire-base-sign-in-practice.firebaseapp.com",
  projectId: "fire-base-sign-in-practice",
  storageBucket: "fire-base-sign-in-practice.appspot.com",
  messagingSenderId: "999920116269",
  appId: "1:999920116269:web:529c51bb417eb9db744ea4",
  measurementId: "G-R94D42KP0Q",
};

var provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function signUp() {
  var fistName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("signUpEmail").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      db.collection("userData")
        .add({
          fistName: fistName,
          lastName: lastName,
          email: email,
          uid: user.uid,
        })
        .then((susesrData) => {
          console.log(susesrData);
        })
        .catch((error) => {
          console.log("error", error);
        });
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function signIn() {
  var email2 = document.getElementById("signINEmail")
  var password2 = document.getElementById("password2")

  firebase
    .auth()
    .signInWithEmailAndPassword(email2.value, password2.value)
    .then((userCredential) => {
      var user = userCredential.user;

      // Console mein user data
      console.log(user);

      // Firestore se user ka data retrieve karna
      db.collection("userData")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var userData = doc.data();
            console.log("userData", userData);
            // Webpage par user ka data show karna
            var userInfoDiv = (document.getElementById("userInfo").innerHTML = `
                            <p>First Name: ${userData.fistName}</p>
                            <p>Last Name: ${userData.lastName}</p>
                            <p>Email: ${userData.email}</p>
                        `);
            document.getElementById("userInfo").style.display = "block";
            alert(userInfoDiv);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
