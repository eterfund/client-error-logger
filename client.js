var JL = require('jsnlog').JL;


JL.setOptions({
  beforeSend: function (_, json) {
    json.userAgent = navigator.userAgent;
  }
});
