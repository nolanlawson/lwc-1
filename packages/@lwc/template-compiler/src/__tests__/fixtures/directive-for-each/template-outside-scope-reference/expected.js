import _implicitStylesheets from "./template-outside-scope-reference.css";
import _implicitScopedStylesheets from "./template-outside-scope-reference.scoped.css?scoped=true";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<p${3}>${"t1"}</p>`;
const $fragment2 = parseFragment`<p${3}>${"t1"}</p>`;
const $fragment3 = parseFragment`<p${3}>${"t1"}</p>`;
const $fragment4 = parseFragment`<p${3}>${"t1"}</p>`;
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
        function (item) {
          return [
            api_static_fragment($fragment1, api_key(2, item.keyOne), [
              api_static_part(1, null, "1" + api_dynamic_text(item)),
            ]),
            api_static_fragment($fragment2, api_key(4, item.keyTwo), [
              api_static_part(1, null, "2" + api_dynamic_text(item.foo)),
            ]),
            api_static_fragment($fragment3, api_key(6, item.keyThree), [
              api_static_part(1, null, "3" + api_dynamic_text($cmp.other)),
            ]),
            api_static_fragment($fragment4, api_key(8, item.keyFour), [
              api_static_part(1, null, "4" + api_dynamic_text($cmp.other.foo)),
            ]),
          ];
        },
        9
      )
    ),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-5jakk9rc2bg";
tmpl.legacyStylesheetToken =
  "x-template-outside-scope-reference_template-outside-scope-reference";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
