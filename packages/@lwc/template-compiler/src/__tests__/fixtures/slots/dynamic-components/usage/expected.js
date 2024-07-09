import _implicitStylesheets from "./usage.css";
import _implicitScopedStylesheets from "./usage.scoped.css?scoped=true";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<p${"a0:slot"}${3}>Header Slot Content</p>`;
const $fragment2 = parseFragment`<p${"a0:slot"}${3}>Default Content</p>`;
const stc0 = {
  key: 0,
};
const stc1 = {
  slotAssignment: "header",
};
const stc2 = {
  slotAssignment: "",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    sp: api_static_part,
    st: api_static_fragment,
    dc: api_dynamic_component,
  } = $api;
  return [
    api_dynamic_component($cmp.ctor, stc0, [
      api_static_fragment($fragment1, 2, [api_static_part(0, stc1, null)]),
      api_static_fragment($fragment2, 4, [api_static_part(0, stc2, null)]),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-2e79lo5u0ge";
tmpl.legacyStylesheetToken = "x-usage_usage";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
