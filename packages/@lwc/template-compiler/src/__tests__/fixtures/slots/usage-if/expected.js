import _implicitStylesheets from "./usage-if.css";
import _implicitScopedStylesheets from "./usage-if.scoped.css?scoped=true";
import _nsCmp from "ns/cmp";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<p${"a0:slot"}${3}>S1</p>`;
const $fragment2 = parseFragment`<p${"a0:slot"}${3}>S2</p>`;
const stc0 = {
  key: 0,
};
const stc1 = {
  key: 1,
};
const stc2 = {
  slotAssignment: "",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    sp: api_static_part,
    st: api_static_fragment,
    c: api_custom_element,
    h: api_element,
  } = $api;
  return [
    api_element("section", stc0, [
      api_custom_element("ns-cmp", _nsCmp, stc1, [
        $cmp.isTrue
          ? api_static_fragment($fragment1, 3, [api_static_part(0, stc2, null)])
          : null,
        api_static_fragment($fragment2, 5, [api_static_part(0, stc2, null)]),
      ]),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-6dcki86fmnh";
tmpl.legacyStylesheetToken = "x-usage-if_usage-if";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
