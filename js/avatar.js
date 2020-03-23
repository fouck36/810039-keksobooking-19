'use strict';

(function () {
  var userChooser = document.querySelector('.ad-form__field input[type=file]');
  var userPreview = document.querySelector('.ad-form-header__preview img');
  var bookingChooser = document.querySelector('.ad-form__upload input[type=file]');
  var bookingPreview = document.querySelector('.ad-form__photo');
  var previews = [];

  var makeNewImg = function () {
    var newImg = new Image(70, 70);
    newImg.classList.add('home-photo');
    bookingPreview.appendChild(newImg);
    var bookingPrevieImg = document.querySelector('.ad-form__photo img');

    return bookingPrevieImg;
  };

  var makePreviewer = function (fileChooser, preview) {
    previews.push(preview);
    fileChooser.addEventListener('input', function () {
      var file = fileChooser.files[0];
      if (file) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
          if (!preview.alt) {
            preview.alt = 'Фотографии вашего жилья';
          }
        });

        reader.readAsDataURL(file);
      }
    });
  };

  makePreviewer(userChooser, userPreview);

  window.avatar = {
    previews: previews,
    makePreviewer: makePreviewer,
    makeNewImg: makeNewImg,
    bookingChooser: bookingChooser,
  };
})();
