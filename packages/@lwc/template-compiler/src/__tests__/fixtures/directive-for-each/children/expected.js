import _implicitStylesheets from "./children.css";
import _implicitScopedStylesheets from "./children.scoped.css?scoped=true";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<p${3}>Last child</p>`;
const $fragment2 = parseFragment`<p${3}>X1</p>`;
const $fragment3 = parseFragment`<p${3}>X2</p>`;
const $fragment4 = parseFragment`<p${3}>Last child</p>`;
const $fragment5 = parseFragment`<div${3}></div>`;
const $fragment6 = parseFragment`<section class="s4${0}"${2}><p${3}>Other child1</p><p${3}>Other child2</p></section>`;
const stc0 = {
  classMap: {
    s1: true,
  },
  key: 0,
};
const stc1 = {
  classMap: {
    s2: true,
  },
  key: 4,
};
const stc2 = {
  classMap: {
    s3: true,
  },
  key: 10,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    t: api_text,
    i: api_iterator,
    st: api_static_fragment,
    h: api_element,
    k: api_key,
  } = $api;
  return [
    api_element("section", stc0, [
      api_text("Other Child"),
      api_iterator(
        $cmp.items,
        function (item) {
          return api_text("X");
        },
        1
      ),
      api_static_fragment($fragment1, 3),
    ]),
    api_element("section", stc1, [
      api_text("Other Child"),
      $cmp.isTrue
        ? api_iterator(
            $cmp.items,
            function (item) {
              return [
                api_static_fragment($fragment2, api_key(6, item.id)),
                api_static_fragment($fragment3, api_key(8, item.id)),
              ];
            },
            9
          )
        : null,
    ]),
    api_element("section", stc2, [
      api_static_fragment($fragment4, 12),
      api_iterator(
        $cmp.items,
        function (item) {
          return api_static_fragment($fragment5, api_key(14, item.id));
        },
        15
      ),
    ]),
    api_static_fragment($fragment6, 17),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-7t3q3ieetp5";
tmpl.legacyStylesheetToken = "x-children_children";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
