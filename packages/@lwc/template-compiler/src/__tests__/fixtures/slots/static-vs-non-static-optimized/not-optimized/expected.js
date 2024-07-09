import _implicitStylesheets from "./not-optimized.css";
import _implicitScopedStylesheets from "./not-optimized.scoped.css?scoped=true";
import { freezeTemplate, registerTemplate } from "lwc";
const stc0 = {
  slotAssignment: "foo",
  key: 0,
};
const stc1 = {
  slotAssignment: "",
  key: 1,
};
const stc2 = {
  slotAssignment: "",
  key: 2,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { h: api_element } = $api;
  return [
    api_element("div", stc0),
    api_element("div", stc1),
    api_element("div", stc2),
    api_element("div", {
      slotAssignment: $cmp.bar,
      key: 3,
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-76f842e7084";
tmpl.legacyStylesheetToken = "x-not-optimized_not-optimized";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
