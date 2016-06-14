
var auth = firebase.auth()
  , storageRef = firebase.storage().ref();

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var file = evt.target.files[0];
  var metadata = {
    'contentType': file.type
  };

  var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

  uploadTask.on('state_changed', null, function(error) {
    console.error('Upload failed:', error);
  }, function() {
    console.log('Uploaded',uploadTask.snapshot.totalBytes,'bytes.');
    console.log('uploadTask.snapshot ', uploadTask.snapshot);

    var metadata = uploadTask.snapshot.metadata
      , url = metadata.downloadURLs[0]
      , contentType = metadata.contentType
      , linkbox = document.getElementById('linkbox');

    console.log('File available at', url);

    if (contentType.indexOf('image/') !== -1) {
      linkbox.innerHTML = '<a href="' +  url + '" target="_blank"><img width="200" src="' + url + '" alt="test image" /></a>';
    } else {
      linkbox.innerHTML = '<a href="' +  url + '" target="_blank">Click here</a>';
    }
  });
}

document.getElementById('file').addEventListener('change', handleFileSelect, false);
