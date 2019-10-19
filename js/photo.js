'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var avatarFile = window.util.formAd.querySelector('.ad-form-header__input');
  var avatarPreview = window.util.formAd.querySelector('.ad-form-header__preview img');
  var originalAvatarPreview = avatarPreview.src;

  var houseFile = window.util.formAd.querySelector('.ad-form__input');
  var housePreview = window.util.formAd.querySelector('.ad-form__photo');
  var photoContainer = window.util.formAd.querySelector('.ad-form__photo-container');


  avatarFile.addEventListener('change', function () {
    loadImage(avatarFile, avatarPreview, onAvatarChange);
  });


  houseFile.addEventListener('change', function () {
    loadImage(houseFile, housePreview, onImageChange);
  });

  // Функция загрузки аватара и картинок жилья
  var loadImage = function (fileChooser, preview, onChangeImage) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          onChangeImage(preview, reader.result);
        });

        reader.readAsDataURL(file);
      }
    }
  };

  // Функция обратного вызова загрузки аватара
  var onAvatarChange = function (preview, dataUrl) {
    preview.src = dataUrl;
  };

  // Функция обратного вызова загрузки картинок жилья
  var onImageChange = function (preview, dataUrl) {

    getImages().forEach(function (elem) {
      if (!elem.childNodes[0]) {
        elem.remove();
      }
    });

    var containerBlock = preview.cloneNode(true);
    var imageHouse = avatarPreview.cloneNode(true);
    imageHouse.src = dataUrl;

    containerBlock.appendChild(imageHouse);
    photoContainer.appendChild(containerBlock);
  };

  // Функция возвращает все элементы с классом ad-form__photo
  var getImages = function () {
    var images = photoContainer.querySelectorAll('.ad-form__photo');
    return images;
  };


  // Сброс картинок
  window.resetImage = function () {

    avatarPreview.src = originalAvatarPreview; // Сброс аватарки

    // Сброс картинок жилья
    getImages().forEach(function (elem) {
      elem.remove();
    });

    photoContainer.appendChild(housePreview);
  };

})();


