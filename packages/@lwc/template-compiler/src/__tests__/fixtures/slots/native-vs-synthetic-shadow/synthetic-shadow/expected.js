import _implicitStylesheets from "./synthetic-shadow.css";
import _implicitScopedStylesheets from "./synthetic-shadow.scoped.css?scoped=true";
import { freezeTemplate, registerTemplate } from "lwc";
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
const stc3 = {
  slotAssignment: "bar",
  key: 2,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { s: api_slot, h: api_element } = $api;
  return [
    api_slot("", stc0, stc1, $slotset),
    api_slot("foo", stc2, stc1, $slotset),
    api_element("div", stc3),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.slots = ["", "foo"];
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-520i124ag3i";
tmpl.legacyStylesheetToken = "x-synthetic-shadow_synthetic-shadow";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
