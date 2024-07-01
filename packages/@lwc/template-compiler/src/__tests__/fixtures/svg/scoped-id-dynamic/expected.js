import _implicitStylesheets from "./scoped-id-dynamic.css";
import _implicitScopedStylesheets from "./scoped-id-dynamic.scoped.css?scoped=true";
import {
  freezeTemplate,
  parseFragment,
  registerTemplate,
  sanitizeAttribute,
} from "lwc";
const $fragment1 = parseFragment`<svg width="100px" height="100px" viewport="0 0 100 100"${3}><defs${3}><circle${"a2:id"} r="10" cx="10" cy="10" fill="black"${3}/><circle${"a3:id"} r="10" cx="14" cy="14" fill="red"${3}/></defs><use${"a4:href"}${3}/><use${"a5:xlink:href"}${3}/></svg>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    gid: api_scoped_id,
    fid: api_scoped_frag_id,
    sp: api_static_part,
    st: api_static_fragment,
  } = $api;
  return [
    api_static_fragment($fragment1, 1, [
      api_static_part(
        2,
        {
          attrs: {
            id: api_scoped_id($cmp.blackId),
          },
        },
        null
      ),
      api_static_part(
        3,
        {
          attrs: {
            id: api_scoped_id($cmp.redId),
          },
        },
        null
      ),
      api_static_part(
        4,
        {
          attrs: {
            href: sanitizeAttribute(
              "use",
              "http://www.w3.org/2000/svg",
              "href",
              api_scoped_frag_id($cmp.blackUrl)
            ),
          },
        },
        null
      ),
      api_static_part(
        5,
        {
          attrs: {
            "xlink:href": sanitizeAttribute(
              "use",
              "http://www.w3.org/2000/svg",
              "xlink:href",
              api_scoped_frag_id($cmp.redUrl)
            ),
          },
        },
        null
      ),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-72ju6ij1be7";
tmpl.legacyStylesheetToken = "x-scoped-id-dynamic_scoped-id-dynamic";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
