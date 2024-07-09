import _implicitStylesheets from "./native-shadow.css";
import _implicitScopedStylesheets from "./native-shadow.scoped.css?scoped=true";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div slot="bar"${3}></div>`;
const stc0 = {
  key: 0,
};
const stc1 = [];
const stc2 = {
  attrs: {
    name: "foo",
  },
  key: 1,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { s: api_slot, st: api_static_fragment } = $api;
  return [
    api_slot("", stc0, stc1, $slotset),
    api_slot("foo", stc2, stc1, $slotset),
    api_static_fragment($fragment1, 3),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.slots = ["", "foo"];
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-54b380gv09b";
tmpl.legacyStylesheetToken = "x-native-shadow_native-shadow";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
