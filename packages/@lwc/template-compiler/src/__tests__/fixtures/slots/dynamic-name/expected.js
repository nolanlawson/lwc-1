import _implicitStylesheets from "./dynamic-name.css";
import _implicitScopedStylesheets from "./dynamic-name.scoped.css?scoped=true";
import _nsCmp from "ns/cmp";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<p${"a0:slot"}${3}></p>`;
const stc0 = {
  key: 0,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    sp: api_static_part,
    st: api_static_fragment,
    c: api_custom_element,
  } = $api;
  return [
    api_custom_element("ns-cmp", _nsCmp, stc0, [
      api_static_fragment($fragment1, 2, [
        api_static_part(
          0,
          {
            slotAssignment: $cmp.mySlot,
          },
          null
        ),
      ]),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-619lvcnih24";
tmpl.legacyStylesheetToken = "x-dynamic-name_dynamic-name";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
