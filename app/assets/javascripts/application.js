//= require jquery
//= require js-cookie/src/js.cookie
//= require i18n
//= require i18n/translations
//= require bootstrap/dist/js/bootstrap.min.js
//= require froala-editor/js/froala_editor.pkgd.min
//= require_tree ./utils

I18n.locale = Cookies.get('locale');

require('./app/index');
