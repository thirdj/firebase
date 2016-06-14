

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      // document.getElementById('quickstart-oauthtoken').textContent = token;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
      } else {
        console.error(error);
      }
    });
  } else {
    firebase.auth().signOut();
    document.getElementById('file').disabled = false;
    document.getElementById('user-image').setAttribute('src', 'firebase-logo.png');
  }
  document.getElementById('quickstart-sign-in').disabled = true;
  document.getElementById('file').disabled = true;
}

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // window.firebase.user = user;


      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL,
        isAnonymous: isAnonymous,
        uid: uid,
        providerData: providerData
      }, null, '  ');
      document.getElementById('user-image').setAttribute('src', providerData[0].photoURL);
      document.getElementById('file').disabled = false;
      window.firebase.user = user;
      window.firebase.userImg = providerData[0].photoURL;
    } else {
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
      document.getElementById('quickstart-account-details').textContent = 'null';
      document.getElementById('file').disabled = true;
      // document.getElementById('quickstart-oauthtoken').textContent = 'null';
    }
    document.getElementById('quickstart-sign-in').disabled = false;
  });

  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
  initApp();
};
