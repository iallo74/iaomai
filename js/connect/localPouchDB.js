webpackJsonp([0],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalPouchDB = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(86);

var _pouchdb = __webpack_require__(87);

var _pouchdb2 = _interopRequireDefault(_pouchdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalPouchDB = exports.LocalPouchDB = function () {
  /**
   * 
   * @param {string} name Name of the PouchDB database
   * @param {object} options Options for opening PouchDB database
   */
  function LocalPouchDB(name, options) {
    _classCallCheck(this, LocalPouchDB);

    this._name = name;
    this._options = options;
  }

  _createClass(LocalPouchDB, [{
    key: '_openDB',
    value: function _openDB() {
      this._db = new _pouchdb2.default(this._name, this._options);
    }
  }, {
    key: '_closeDB',
    value: function _closeDB() {
      return this._db.close(); // Promise
    }

    /**
     * Set an item with specified key and value
     * @param {string} key Key to use
     * @param {*} value Value to set
     * @returns {Promise<object>} Object containing the property `err` defined or not
     */

  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      var _this = this;

      this._openDB();
      return this._db.get(key).then(function (doc) {
        return (// esiste, controlliamo se è cambiato
          doc.value !== value ? _this._db.put(Object.assign({}, doc, { value: value })) : doc
        );
      }, function () {
        return (// non esiste, lo aggiungiamo
          _this._db.put({ _id: key, value: value })
        );
      }).then(function () {
        return { err: false };
      }, function (err) {
        return { err: err };
      });
    }

    /**
     * Get the item saved with the specified key
     * @param {string} key Key to use
     * @returns {Promise<*>} Value assigned to the key
     */

  }, {
    key: 'getItem',
    value: function getItem(key) {
      this._openDB();
      return this._db.get(key).then(function (doc) {
        return doc.value;
      }, function () {
        return undefined;
      });
    }

    /**
     * Remove the item saved with the specified key
     * @param {string} key Key to use
     * @returns {Promise<object>} Object containing the property `err` defined or not
     */

  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      var _this2 = this;

      this._openDB();
      return this._db.get(key).then(function (doc) {
        return _this2._db.remove(doc);
      }).then(function () {
        return { err: false };
      }, function (err) {
        return { err: err };
      });
    }

    /**
     * Completely delete the opened database
     * @returns {Promise<object>} Object containing the return value of the destroy
     */

  }, {
    key: 'clear',
    value: function clear() {
      this._openDB();
      return this._db.destroy();
    }

    /**
     * Remove the item saved with the specified key
     * @param {string} key Key to use
     * @returns {Promise<object>} Object containing the property `err` defined or not
     */
  }]);

  return LocalPouchDB;
}();

window.localPouchDB = new LocalPouchDB('myPouchDB', { auto_compaction: true });

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(117);


/***/ })

},[311]);