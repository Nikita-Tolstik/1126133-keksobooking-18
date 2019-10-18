'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var avatarFile = window.util.formAd.querySelector('.ad-form-header__input');
  var avatarPreview = window.util.formAd.querySelector('.ad-form-header__preview img');
  var originalAvatarPreview = avatarPreview.src;


  avatarFile.addEventListener('change', function () {

    changePhoto(avatarFile, avatarPreview, onSrcRender);

  });


  var houseFileChooser = window.util.formAd.querySelector('.ad-form__input');
  window.housePreview = window.util.formAd.querySelector('.ad-form__photo');
  window.photoContainer = window.util.formAd.querySelector('.ad-form__photo-container');

  houseFileChooser.addEventListener('change', function () {

    changePhoto(houseFileChooser, window.housePreview, onImageRender);

  });

  var changePhoto = function (fileChooser, preview, onRender) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          onRender(preview, reader.result);
        });

        reader.readAsDataURL(file);
      }
    }
  };


  var onSrcRender = function (preview, src) {
    preview.src = src;
  };


  var onImageRender = function (preview, src) {

    getImages().forEach(function (elem) {
      if (!elem.childNodes[0]) {
        elem.remove();
      }
    });

    var containerElement = preview.cloneNode(true);
    var imageElement = avatarPreview.cloneNode(true);
    imageElement.src = src;

    containerElement.appendChild(imageElement);
    window.photoContainer.appendChild(containerElement);
  };


  var getImages = function () {
    var images = window.photoContainer.querySelectorAll('.ad-form__photo');
    return images;
  };


  // Сброс фото аватара
  window.resetImage = function () {

    avatarPreview.src = originalAvatarPreview; // Сброс аватарки

    getImages().forEach(function (elem) {
      elem.remove();
    });

    window.photoContainer.appendChild(window.housePreview);
  };

})();


