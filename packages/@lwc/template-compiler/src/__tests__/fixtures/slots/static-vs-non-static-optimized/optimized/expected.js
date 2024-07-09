import _implicitStylesheets from "./optimized.css";
import _implicitScopedStylesheets from "./optimized.scoped.css?scoped=true";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${"a0:slot"}${3}></div>`;
const $fragment2 = parseFragment`<div${"a0:slot"}${3}></div>`;
const $fragment3 = parseFragment`<div${"a0:slot"}${3}></div>`;
const $fragment4 = parseFragment`<div${"a0:slot"}${3}></div>`;
const stc0 = {
  slotAssignment: "foo",
};
const stc1 = {
  slotAssignment: "",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { sp: api_static_part, st: api_static_fragment } = $api;
  return [
    api_static_fragment($fragment1, 1, [api_static_part(0, stc0, null)]),
    api_static_fragment($fragment2, 3, [api_static_part(0, stc1, null)]),
    api_static_fragment($fragment3, 5, [api_static_part(0, stc1, null)]),
    api_static_fragment($fragment4, 7, [
      api_static_part(
        0,
        {
          slotAssignment: $cmp.bar,
        },
        null
      ),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-6dfvqpqt2d0";
tmpl.legacyStylesheetToken = "x-optimized_optimized";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
