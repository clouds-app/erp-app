(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/boxHalfProdIn/boxHalfProdIn"],{

/***/ 198:
/*!**********************************************************************************!*\
  !*** E:/cl_vue/erp-app/main.js?{"page":"pages%2FboxHalfProdIn%2FboxHalfProdIn"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _boxHalfProdIn = _interopRequireDefault(__webpack_require__(/*! ./pages/boxHalfProdIn/boxHalfProdIn.vue */ 199));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_boxHalfProdIn.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 199:
/*!***************************************************************!*\
  !*** E:/cl_vue/erp-app/pages/boxHalfProdIn/boxHalfProdIn.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boxHalfProdIn.vue?vue&type=template&id=8eb17f08&scoped=true& */ 200);
/* harmony import */ var _boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boxHalfProdIn.vue?vue&type=script&lang=js& */ 202);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _boxHalfProdIn_vue_vue_type_style_index_0_id_8eb17f08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boxHalfProdIn.vue?vue&type=style&index=0&id=8eb17f08&scoped=true&lang=css& */ 204);
/* harmony import */ var _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 15);

var renderjs





/* normalize component */

var component = Object(_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8eb17f08",
  null,
  false,
  _boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/boxHalfProdIn/boxHalfProdIn.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 200:
/*!**********************************************************************************************************!*\
  !*** E:/cl_vue/erp-app/pages/boxHalfProdIn/boxHalfProdIn.vue?vue&type=template&id=8eb17f08&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./boxHalfProdIn.vue?vue&type=template&id=8eb17f08&scoped=true& */ 201);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_template_id_8eb17f08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 201:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/cl_vue/erp-app/pages/boxHalfProdIn/boxHalfProdIn.vue?vue&type=template&id=8eb17f08&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  selectDropdown: function() {
    return __webpack_require__.e(/*! import() | components/selectDropdown/selectDropdown */ "components/selectDropdown/selectDropdown").then(__webpack_require__.bind(null, /*! @/components/selectDropdown/selectDropdown.vue */ 887))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 202:
/*!****************************************************************************************!*\
  !*** E:/cl_vue/erp-app/pages/boxHalfProdIn/boxHalfProdIn.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./boxHalfProdIn.vue?vue&type=script&lang=js& */ 203);
/* harmony import */ var _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 203:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/cl_vue/erp-app/pages/boxHalfProdIn/boxHalfProdIn.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 43));







































































































































































































var _mixins = _interopRequireDefault(__webpack_require__(/*! @/mixins */ 60));




var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 42));




var _validator = __webpack_require__(/*! @/utils/validator.js */ 31);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var selectDropdown = function selectDropdown() {__webpack_require__.e(/*! require.ensure | components/selectDropdown/selectDropdown */ "components/selectDropdown/selectDropdown").then((function () {return resolve(__webpack_require__(/*! @/components/selectDropdown/selectDropdown.vue */ 887));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var vTable = function vTable() {__webpack_require__.e(/*! require.ensure | components/table */ "components/table").then((function () {return resolve(__webpack_require__(/*! @/components/table.vue */ 899));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var cuCustom = function cuCustom() {__webpack_require__.e(/*! require.ensure | ui/colorui/components/cu-custom */ "ui/colorui/components/cu-custom").then((function () {return resolve(__webpack_require__(/*! @/ui/colorui/components/cu-custom.vue */ 16));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniDrawer = function uniDrawer() {__webpack_require__.e(/*! require.ensure | components/uni-drawer/uni-drawer */ "components/uni-drawer/uni-drawer").then((function () {return resolve(__webpack_require__(/*! @/components/uni-drawer/uni-drawer.vue */ 906));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniList = function uniList() {__webpack_require__.e(/*! require.ensure | components/uni-list/uni-list */ "components/uni-list/uni-list").then((function () {return resolve(__webpack_require__(/*! @/components/uni-list/uni-list.vue */ 913));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniListItem = function uniListItem() {__webpack_require__.e(/*! require.ensure | components/uni-list-item/uni-list-item */ "components/uni-list-item/uni-list-item").then((function () {return resolve(__webpack_require__(/*! @/components/uni-list-item/uni-list-item.vue */ 920));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniSearchBar = function uniSearchBar() {__webpack_require__.e(/*! require.ensure | components/uni-search-bar/uni-search-bar */ "components/uni-search-bar/uni-search-bar").then((function () {return resolve(__webpack_require__(/*! @/components/uni-search-bar/uni-search-bar.vue */ 927));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};
var defaultformItem = {
  wpl: '', //工序
  wplId: '', //工序id
  machine: '', //机台
  machineId: '', //机台id
  team: '', //班别
  teamId: '', //班别id
  ProdutName: '', //生产工序
  ProdutId: '' //生产工序
};var _default =
{
  components: { cuCustom: cuCustom, uniDrawer: uniDrawer, uniList: uniList, uniListItem: uniListItem, uniSearchBar: uniSearchBar, vTable: vTable, selectDropdown: selectDropdown },
  mixins: [_mixins.default],
  data: function data() {
    return {
      machineparams: {}, //机台过滤参数
      params: {
        type: "1",
        procType: '',
        modelCode: 'workProc_in' },
      //班别下拉接口参数
      otherHeight: 0, //title高度
      disable: true,
      dataSource: [], //数据源
      paperOutTableDataItems: [], //人员数据列表
      findGoodsColumns: [
      {
        key: 'Serial',
        title: '序号',
        $width: 80,
        titleAlign: 'center',
        columnAlign: 'center'
        // $fixed:'left'	
      },
      {
        key: 'w_ID',
        title: '编号',
        $width: 180,
        titleAlign: 'center',
        columnAlign: 'center' },

      {
        key: 'w_Name',
        title: '姓名',
        $width: 180,
        titleAlign: 'center',
        columnAlign: 'center' },

      {
        key: 'tt_quotient',
        title: '工分',
        $width: 158,
        titleAlign: 'center',
        columnAlign: 'right' },

      {
        key: 'money',
        title: '人员工资',
        $width: 158,
        titleAlign: 'center',
        columnAlign: 'right' }],


      formItem: Object.assign({}, defaultformItem),
      fromdata: [], //工单扫描信息
      // monnyList:[],//存储 wpl_WorkPrice:"工价"和 wpl_WorkPriceUnit:"工价单位"
      boxHalfProdIn: {
        wpl_WorkPriceUnitName: '', //工价单位
        wplAssNum: 1, //计件系数
        defectsNum: 0, //不良数
        monny: '', //工资
        area: '', //面积
        wpl_WorkPriceUnit: '', //工价单位
        YxStr: '', //入库数
        wpl_WorkPrice: '', //工价
        hp_bi_WorkNo: '', //工单号
        hp_wpl_Id: '', //工序编
        hp_mo_ID: '', //机台编
        hp_tt_Code: '', //班别编
        Qty: '', //工单数
        Remark: '' //备注
      },
      baseData: {
        wplList: [], //工序列表
        machineList: [], //机台列表
        teamList: [] //班别列表
      } };

  },
  computed: {
    mainmonny: function mainmonny() {
      var data = this.boxHalfProdIn.YxStr;
      return this.getmonny(data);
    } },

  watch: {
    // 'boxHalfProdIn.YxStr'(n,o){
    // 	this.getmonny()
    // },
    // 计件系数 设置缓存
    'boxHalfProdIn.wplAssNum': function boxHalfProdInWplAssNum(n, o) {
      this.cache.put('wp.wplAssNum', n);
    },
    // 工价 设置缓存
    'boxHalfProdIn.wpl_WorkPrice': function boxHalfProdInWpl_WorkPrice(n, o) {
      this.cache.put('wp.wpl_WorkPrice', n);
    },
    // 工价单位
    'boxHalfProdIn.wpl_WorkPriceUnit': function boxHalfProdInWpl_WorkPriceUnit(n, o) {
      this.cache.put('wp.wpl_WorkPriceUnit', n);
    },
    // 工价单位显示 设置缓存
    'boxHalfProdIn.wpl_WorkPriceUnitName': function boxHalfProdInWpl_WorkPriceUnitName(n, o) {
      this.cache.put('wp.wpl_WorkPriceUnitName', n);
    },
    'formItem.ProdutId': function formItemProdutId(n, o) {
      if (n != o && !!o) {
        this.closerest();
        this.cache.put('wp.machineDrawer', '');
        this.cache.put('wp.wplDrawer', '');
        return;
      }
      return;
    },
    'formItem.wplId': function formItemWplId(n, o) {
      if (n != o) {
        this.closewplrest();
        return;
      }
      return;
    } },

  mounted: function mounted() {var _this = this;
    // debugger
    // this.getTableHeight();
    this.$nextTick(function () {
      _this.setDefaultValue();
    });

  },
  onShow: function onShow() {
    // debugger
    this.getmonny();
    // this.getTableHeight();
  },

  onReady: function onReady() {
    // debugger
  },
  // onPullDownRefresh(){
  // 	debugger
  // 	console.log('到底了')
  // },
  methods: {
    // 自定义某行样式
    rowClassNameFn: function rowClassNameFn(row, index) {
      if (Number(index) % 2 == 0) {
        return 'table-single-row';
      }
      return ''; //'table-double-row';
    },
    // 从缓存中读取上次填充的初始值
    setDefaultValue: function setDefaultValue() {
      // 班别
      var classDrawerItem = this.cache.get('wp.classDrawer');
      if (classDrawerItem) {
        var itemKey = Object.keys(classDrawerItem);
        this.formItem.team = classDrawerItem[itemKey[0]];
        this.formItem.teamId = classDrawerItem[itemKey[1]];
        if (!!this.formItem.teamId) {
          this.getWorkList();
        }
      }
      // 生产工序
      var ProdutDrawer = this.cache.get('wp.ProdutDrawer');
      if (ProdutDrawer) {
        var _itemKey = Object.keys(ProdutDrawer);
        this.formItem.ProdutName = ProdutDrawer[_itemKey[0]];
        this.formItem.ProdutId = ProdutDrawer[_itemKey[1]];

      }
      // 计件系数
      var wplAssNum = this.cache.get('wp.wplAssNum');
      if (!!wplAssNum) {
        this.boxHalfProdIn.wplAssNum = wplAssNum;
      }
      // 计价工序
      var wplDrawer = this.cache.get('wp.wplDrawer');
      if (wplDrawer) {
        var _itemKey2 = Object.keys(wplDrawer);
        this.formItem.wpl = wplDrawer[_itemKey2[0]];
        this.formItem.wplId = wplDrawer[_itemKey2[1]];
        var dataParams = {
          type: this.formItem.wplId,
          wplAssNum: this.boxHalfProdIn.wplAssNum };

        if (!!dataParams.type) {
          this.closeMain(dataParams);
        }

      }
      // 机台
      var machineDrawer = this.cache.get('wp.machineDrawer');
      if (machineDrawer) {
        var _itemKey3 = Object.keys(machineDrawer);
        this.formItem.machine = machineDrawer[_itemKey3[0]];
        this.formItem.machineId = machineDrawer[_itemKey3[1]];
      }

      //工价
      var wpl_WorkPrice = this.cache.get('wp.wpl_WorkPrice');
      if (!!wpl_WorkPrice) {
        this.boxHalfProdIn.wpl_WorkPrice = wpl_WorkPrice;
      }
      //工价单位
      var wpl_WorkPriceUnit = this.cache.get('wp.wpl_WorkPriceUnit');
      if (!!wpl_WorkPriceUnit) {
        this.boxHalfProdIn.wpl_WorkPriceUnit = wpl_WorkPriceUnit;
      }
      //工价单位显示
      var wpl_WorkPriceUnitName = this.cache.get('wp.wpl_WorkPriceUnitName');
      if (!!wpl_WorkPriceUnitName) {
        this.boxHalfProdIn.wpl_WorkPriceUnitName = wpl_WorkPriceUnitName;
      }

    },
    //计价工序回调事件
    changewpl: function changewpl(data) {
      this.boxHalfProdIn.wpl_WorkPrice = data.wpl_WorkPrice; //工价
      this.boxHalfProdIn.wpl_WorkPriceUnit = data.wpl_WorkPriceUnit; //工价单位
      this.boxHalfProdIn.wpl_WorkPriceUnitName = data.wpl_WorkPriceUnitName; //工价单位显示
    },
    //选择机台校验
    judge: function judge() {
      if (this.formItem.ProdutId) {
        return true;
      }
      this.$refs.machineDrawer.$data.modalName = null;
      this.$refs.wplDrawer.$data.modalName = null;
      this.toast.message('请选择工序');
      return false;
    },
    //生产工序回调事件
    closeMain: function closeMain(data) {
      this.machineparams = {
        wplID: data.type,
        modelCode: 'workProc_in' };

      this.boxHalfProdIn.wplAssNum = data.wplAssNum; //计件系数
      this.$refs.machineDrawer.getdataArray(this.machineparams);
      this.$refs.wplDrawer.getdataArray(this.machineparams);
      // this.closerest()
      // this.getwplArray()
    },
    // 重选计价工序清除事件
    closewplrest: function closewplrest() {
      this.boxHalfProdIn.hp_bi_WorkNo = '';
      this.getmonny();
    },
    // 重选生产工序清除事件
    closerest: function closerest() {
      this.boxHalfProdIn.wpl_WorkPriceUnitName = '';
      this.$refs.machineDrawer.$data.formItem.customers = '';
      this.$refs.machineDrawer.$data.formItem.customersId = '';
      this.$refs.wplDrawer.$data.formItem.customers = '';
      this.$refs.wplDrawer.$data.formItem.customersId = '';
      this.formItem.machineId = '';
      this.formItem.wplId = '';
      this.boxHalfProdIn.wpl_WorkPrice = '';
      this.boxHalfProdIn.monny = 0;
      this.getSubMonny();
    },
    //获取计价工序
    getwplArray: function getwplArray() {var _this2 = this;
      this.toast.loading();
      _request.default.post("/warehouse/warehouse/execute/appFindWorkProcPriceItem", this.machineparams).then(function (res) {
        if (res.list.length != 0) {
          if (res.list.length == 1) {
            _this2.toast.hide();
            _this2.$refs.wplDrawer.$data.modalArry = res.list;
            _this2.formItem.wplId = res.list[0].value;
            _this2.boxHalfProdIn.wpl_WorkPrice = res.list[0].wpl_WorkPrice; //工价
            _this2.boxHalfProdIn.wpl_WorkPriceUnit = res.list[0].wpl_WorkPriceUnit; //计价单位方式
            _this2.boxHalfProdIn.wpl_WorkPriceUnitName = res.list[0].wpl_WorkPriceUnitName; //工价单位显示
            return;
          } else {
            _this2.toast.hide();
            _this2.$refs.wplDrawer.$data.modalArry = res.list;
            return;
          }
        } else {
          _this2.toast.hide();
          _this2.toast.message('没有对应的计价工序，请重新选择！');
          return;
        }
      }).catch(function (err) {
        _this2.toast.hide();
        _this2.toast.message('数据加载失败');
        return;
      });
    },
    //获取指定内容占用高度,计算剩余高度 单位:PX
    getOtherContentHeight: function getOtherContentHeight() {var _this3 = this;var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bodyContentHeight';
      return new Promise(function (resolve, reject) {
        var eleHeight = 0;
        var _self = _this3;
        var info = uni.createSelectorQuery().in(_self).select("." + className);
        info.boundingClientRect(function (data) {//data - 各种参数
          // console.log('other Height:'+data.height)  // 获取元素宽度
          _self.otherHeight = data.height;
          eleHeight = data.height;
          resolve(data.height);
        }).exec(function (res) {
        });
      });
    },
    getTableHeight: function getTableHeight() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _self, otherHeight;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                _self = _this4;_context.next = 3;return (
                  _self.getOtherContentHeight("titlefrom"));case 3:otherHeight = _context.sent;
                console.log(otherHeight);case 5:case "end":return _context.stop();}}}, _callee);}))();
    },
    // 提交检验 
    checkSubmitData: function checkSubmitData() {
      if (this.formItem.teamId == '') {
        this.toast.message('请选择班别');
        return false;
      }
      if (this.formItem.machineId == '') {
        this.toast.message('请选择机台');
        return false;
      }
      if (this.formItem.ProdutId == '') {
        this.toast.message('请选择生产工序');
        return false;
      }
      if (this.formItem.wplId == '') {
        this.toast.message('请选择计价工序');
        return false;
      }
      if (this.boxHalfProdIn.YxStr == '') {
        this.toast.message('请输入库数');
        return false;
      }
      if (this.boxHalfProdIn.defectsNum === '') {
        this.toast.message('请输入不良数');
        return false;
      }
      if (this.boxHalfProdIn.hp_bi_WorkNo == '') {
        this.toast.message('请扫描工单号');
        return false;
      }
      return true;
    },
    // 提交数据
    SubmitData: function SubmitData() {var _this5 = this;
      var check = this.checkSubmitData();
      if (!check) {
        return;
      }
      this.toast.loading();
      var user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME);
      var data = {
        hp_bi_WorkNo: this.boxHalfProdIn.hp_bi_WorkNo,
        hp_wpl_Id: this.formItem.ProdutId, //生产工序编号
        hp_mo_ID: this.formItem.machineId, //机台编号
        hp_tt_Code: this.formItem.teamId, //班别编号
        Qty: this.boxHalfProdIn.YxStr, //入库输
        userName: user.erpUserCode, //用户
        jpWorkPrcNo: this.formItem.wplId, //计价工序
        workPay: this.boxHalfProdIn.monny, //工资
        uncertifiedQty: this.boxHalfProdIn.defectsNum, //不良数
        // prodQty:this.fromdata[0].workproc,//本工序数
        priorcertifiedQty: this.fromdata[0].bp_ProQty, //上工序数量
        wplAssNum: this.boxHalfProdIn.wplAssNum //计件系数
      };
      var list = this.paperOutTableDataItems;
      _request.default.post('/hpws/saveWorkHpws', { data: data, list: list }).then(function (res) {
        // console.log(res)
        if (res.list[0].ErrorStr == "1") {
          _this5.restFrom();
          _this5.disable = true;
          _this5.toast.hide();
          _this5.toast.message('入库成功');
          // console.log(111)
        } else {
          _this5.restFrom();
          _this5.disable = true;
          _this5.toast.hide();
          _this5.toast.message('入库失败');
          // console.log(222)
        }
      }).catch(function (err) {
        _this5.restFrom();
        _this5.disable = true;
        _this5.toast.hide();
        _this5.toast.message('入库失败');
        // console.log(333)
      });
    },
    //保存人员数据
    getpaperOutTableDataItems: function getpaperOutTableDataItems() {
      var data = this.paperOutTableDataItems;
      // 'updataItems',
      this.$store.commit('updataItems', data);
    },
    // 调整
    adjustment: function adjustment() {
      if (this.formItem.teamId == '') {
        this.toast.message('请选择班别');
        return;
      }
      this.getpaperOutTableDataItems();
      uni.navigateTo({
        url: "adjustPersonnel?team=".concat(this.formItem.team, "&teamId=") + this.formItem.teamId });

    },
    //清除
    restFrom: function restFrom() {
      // this.formItem = defaultformItem;
      // this.boxHalfProdIn.wpl_WorkPrice = '';
      this.fromdata = [];
      this.boxHalfProdIn.hp_bi_WorkNo = '';
      this.formItem.YxStr = '';
      this.formItem.Remark = '';
      this.formItem.Qty = '';
      this.boxHalfProdIn.YxStr = ''; //入库数
      this.boxHalfProdIn.area = ''; //面积
      this.boxHalfProdIn.monny = ''; //工资
      this.boxHalfProdIn.defectsNum = 0; //不良数
      // this.boxHalfProdIn.wpl_WorkPriceUnitName = '';//计价工序显示单位
      for (var i = 0; i < this.paperOutTableDataItems.length; i++) {
        this.paperOutTableDataItems[i].money = 0;
      }

      // this.paperOutTableDataItems = [];
    },
    // 获取人员列表
    getWorkList: function getWorkList() {var _this6 = this;
      var data = {
        workProcId: this.formItem.teamId };

      _request.default.post("/scan/getWorkList?workProcId=".concat(this.formItem.teamId)).then(function (res) {
        // console.log(res)
        _this6.paperOutTableDataItems = res;
        for (var i = 0; i < _this6.paperOutTableDataItems.length; i++) {
          _this6.paperOutTableDataItems[i].Serial = i + 1;
          // console.log(this.findGoodsColumns)
        }
        _this6.getSubMonny();
      });
    },
    // 工序
    getWorkProcList: function getWorkProcList() {var _this7 = this;
      if (this.formItem.machineId == '') {
        this.toast.message('请先选择机台');
        return;
      }
      var data = {
        wpId: this.formItem.machineId,
        modelCode: 'workProc_in' };

      _request.default.post("/scan/getWorkProcList?wpId=".concat(this.formItem.machineId)).then(function (res) {
        // console.log(res)
        // this.baseData.monnyList = res
        var resData = res.map(function (item) {
          var formatData = {
            type: item.wpl_Id,
            ct_Desc: item.wpl_Name,
            wpl_WorkPrice: item.wpl_WorkPrice, //工价
            wpl_WorkPriceUnit: item.wpl_WorkPriceUnit, //工价单位
            wplID: item.wplID, //生产工序标号
            wplAssNum: item.wplAssNum //计价系数
          };
          return formatData;
        });
        if (_this7.baseData.wplList.length != 0) {
          if (_this7.baseData.wplList[0].type != resData[0].type) {
            _this7.baseData.wplList = resData; // 客户 
          }
        } else {
          _this7.baseData.wplList = resData; // 客户
        }
      });
    },
    //打开扫描
    turnOnScanCode: function turnOnScanCode(type) {
      if (window !== undefined) {
        this.toast.message('请在"e包装"公众号中下载APP后扫码!');
        return;
      }
      var _self = this;
      // 调起条码扫描
      uni.scanCode({
        scanType: 'barCode',
        success: function success(res) {
          var a = res.result.indexOf(',');
          var b = 0;
          // console.log(a)
          if (a < 0) {
            b = res.result;
          } else {
            b = res.result.substring(0, a);
          }
          console.log(b);
          // console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
          switch (type) {
            case 'in': //入库
              _self.boxHalfProdIn.hp_bi_WorkNo = b;
              _self.findGoods();
              break;
            default:
              break;}

        } });

    },
    //工单号失去焦点
    findGoods: function findGoods() {
      if (this.formItem.ProdutId == '') {
        this.toast.message('请选择生产工序');
        return;
      }
      if (this.formItem.wplId == '') {
        this.toast.message('请选择计价工序');
        return;
      }
      var data = {
        bi_WorkNo: this.boxHalfProdIn.hp_bi_WorkNo, //工单号
        Flag: 0,
        ProcID: this.formItem.wplId, //计价工序
        bc_No: '', //订单号
        workProcNo: this.formItem.ProdutId //生产工序
      };
      this.getWorkorderdata(data);
    },
    //工单号查询
    getWorkorderdata: function getWorkorderdata(data) {var _this8 = this;
      this.toast.loading();
      _request.default.post('/warehouse/warehouse/execute/appBoxScanOrderWorkProc', data).then(function (res) {
        // console.log(res)
        if (res.list[0]) {
          if (res.list[0].res === 1) {
            _this8.fromdata = res.list;
            // debugger
            var bp_ProQty = Number(res.list[0].bp_ProQty);
            var bw_certifiedQty = Number(res.list[0].bw_certifiedQty);
            if (bp_ProQty - bw_certifiedQty > 0) {
              _this8.boxHalfProdIn.YxStr = bp_ProQty - bw_certifiedQty;
            } else {
              _this8.boxHalfProdIn.YxStr = 0;
            }
            _this8.getarea();
            _this8.getmonny();
            _this8.toast.hide();
            _this8.disable = false;
          } else {
            _this8.restFrom();
            _this8.toast.hide();
            _this8.boxHalfProdIn.hp_bi_WorkNo = '';
            _this8.toast.message('此工序无此工单');
          }
        } else {
          _this8.boxHalfProdIn.hp_bi_WorkNo = '';
          _this8.restFrom();
          _this8.toast.hide();
          _this8.toast.message('该工单号无数据');
        }
      }).catch(function (err) {
        _this8.restFrom();
        _this8.toast.hide();
        _this8.toast.message('数据加载失败');
      });
    },
    // 获取工资 工价*数量
    getmonny: function getmonny() {var _this9 = this;
      if (this.boxHalfProdIn.wpl_WorkPrice == '') {
        return;
      }
      if (this.fromdata.length == 0) {
        return;
      }
      if (this.boxHalfProdIn.YxStr == '') {
        return;
      }
      var data = {
        wpl_Id: this.formItem.ProdutId, //--工序编号 
        WorkNo: this.boxHalfProdIn.hp_bi_WorkNo, //--工单号 
        WorkQty: this.boxHalfProdIn.YxStr, //--生产数量 
        WorkPrice: this.boxHalfProdIn.wpl_WorkPrice, // --工价 
        SArea: this.fromdata[0].bp_SArea, //--单面积 
        AssNum: this.boxHalfProdIn.wplAssNum, //--计价系数 
        ParamNum: "0", //--工序参量（没有的话，默认0） 
        AProID: this.formItem.wplId //--计价工序 
      };
      this.toast.loading();
      _request.default.post('/warehouse/warehouse/execute/appSfGetWorkPay', data).then(function (res) {
        if (res) {
          _this9.boxHalfProdIn.monny = res.list[0].WorkPay;
          _this9.toast.hide();
          _this9.getSubMonny();
        } else {
          _this9.boxHalfProdIn.monny = 0;
          _this9.toast.hide();
          _this9.toast.message('工资计算失败');
        }
      }).catch(function (err) {
        _this9.toast.hide();
        _this9.toast.message('工资计算失败');
        _this9.boxHalfProdIn.monny = 0;
      });
    },
    //计算面积 单面积*数量
    getarea: function getarea() {
      if (this.fromdata[0].bp_SArea == '') {
        return;
      }
      var YxStr = Number(this.boxHalfProdIn.YxStr);
      var bp_SArea = Number(this.fromdata[0].bp_SArea); //
      this.boxHalfProdIn.area = JSON.parse((YxStr * bp_SArea).toFixed(2));
    },
    // 入库数变化
    YxStrChange: function YxStrChange() {
      if (this.fromdata.length == 0) {
        this.toast.message('请先扫描工单');
        this.boxHalfProdIn.YxStr = '';
        return;
      }
      var bp_ProQty = Number(this.fromdata[0].bp_ProQty);
      var bw_certifiedQty = this.fromdata[0].bw_certifiedQty;
      // fix 禁用此功能 edit by Andy 20200610
      // if(this.boxHalfProdIn.YxStr > (bp_ProQty-bw_certifiedQty)){
      // 	if(this.boxHalfProdIn.YxStr == 0){
      // 		return
      // 	}
      // 	this.toast.message('入库数不能大于未入库数')
      // 	this.boxHalfProdIn.YxStr = 0
      // 	return;
      // }
      if (this.boxHalfProdIn.YxStr == '') {
        this.boxHalfProdIn.YxStr = 0;
      }
      this.getarea();
      this.getmonny();
    },
    // 人员列表工资
    getSubMonny: function getSubMonny() {
      if (this.boxHalfProdIn.monny === '') {
        return;
      }
      var totalquotient = 0;
      for (var i = 0; i < this.paperOutTableDataItems.length; i++) {
        totalquotient += Number(this.paperOutTableDataItems[i].tt_quotient); //总工分
      }
      for (var q = 0; q < this.paperOutTableDataItems.length; q++) {
        this.paperOutTableDataItems[q].money = (this.paperOutTableDataItems[q].tt_quotient / totalquotient *
        this.boxHalfProdIn.monny).toFixed(2);
      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 204:
/*!************************************************************************************************************************!*\
  !*** E:/cl_vue/erp-app/pages/boxHalfProdIn/boxHalfProdIn.vue?vue&type=style&index=0&id=8eb17f08&scoped=true&lang=css& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_style_index_0_id_8eb17f08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./boxHalfProdIn.vue?vue&type=style&index=0&id=8eb17f08&scoped=true&lang=css& */ 205);
/* harmony import */ var _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_style_index_0_id_8eb17f08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_style_index_0_id_8eb17f08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_style_index_0_id_8eb17f08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_style_index_0_id_8eb17f08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_2_2_2_20190816_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_boxHalfProdIn_vue_vue_type_style_index_0_id_8eb17f08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 205:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/cl_vue/erp-app/pages/boxHalfProdIn/boxHalfProdIn.vue?vue&type=style&index=0&id=8eb17f08&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[198,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/boxHalfProdIn/boxHalfProdIn.js.map