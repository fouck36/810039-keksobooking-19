'use strict';
(function () {
  var successBlock = document.querySelector('#success').content.querySelector('.success');
  var errorBlock = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var deleteBlock = function () {
    if (document.querySelector('.error')) {
      var sendPopup = document.querySelector('.error');
    } else if (document.querySelector('.success')) {
      sendPopup = document.querySelector('.success');
    }
    window.removeEventListener('keydown', closeBlock);
    window.removeEventListener('click', closeBlock);
    sendPopup.remove();
  };

  var closeBlock = function (evt) {
    if (evt.key === 'Escape' || evt.type === 'click') {
      deleteBlock();
    }
  };

  var actionsIfSuccess = function () {
    window.disablePage.on();
    successBlock.cloneNode(true);
    main.appendChild(successBlock);
    window.addEventListener('keydown', closeBlock);
    window.addEventListener('click', closeBlock);
  };

  var actionsIfError = function () {
    errorBlock.cloneNode(true);
    main.appendChild(errorBlock);
    window.addEventListener('keydown', closeBlock);
    window.addEventListener('click', closeBlock);
  };
  window.onSendPopup = {
    actionsIfSuccess: actionsIfSuccess,
    actionsIfError: actionsIfError
  };

})();
