var JL = require('jsnlog').JL;


JL.setOptions({
  defaultBeforeSend: function (_, json) {
    json.currentPage = location.href;
  }
});
