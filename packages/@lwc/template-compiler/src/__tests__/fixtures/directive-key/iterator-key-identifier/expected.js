import _implicitStylesheets from "./iterator-key-identifier.css";
import _implicitScopedStylesheets from "./iterator-key-identifier.scoped.css?scoped=true";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<p${3}>${"t1"}</p>`;
const stc0 = {
  key: 0,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    k: api_key,
    d: api_dynamic_text,
    sp: api_static_part,
    st: api_static_fragment,
    i: api_iterator,
    h: api_element,
  } = $api;
  return [
    api_element(
      "section",
      stc0,
      api_iterator(
        $cmp.items,
        function (xValue, xIndex, xFirst, xLast) {
          const x = {
            value: xValue,
            index: xIndex,
            first: xFirst,
            last: xLast,
          };
          return api_static_fragment($fragment1, api_key(2, $cmp.foo), [
            api_static_part(1, null, api_dynamic_text(x.value)),
          ]);
        },
        3
      )
    ),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-mk60ujrh6t";
tmpl.legacyStylesheetToken =
  "x-iterator-key-identifier_iterator-key-identifier";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
