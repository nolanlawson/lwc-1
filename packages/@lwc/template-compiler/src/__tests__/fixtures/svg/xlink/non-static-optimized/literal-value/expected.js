import _implicitStylesheets from "./literal-value.css";
import _implicitScopedStylesheets from "./literal-value.scoped.css?scoped=true";
import { freezeTemplate, registerTemplate, sanitizeAttribute } from "lwc";
const stc0 = {
  classMap: {
    "slds-icon": true,
  },
  attrs: {
    "aria-hidden": "true",
    title: "when needed",
  },
  key: 0,
  svg: true,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { h: api_element } = $api;
  return [
    api_element("svg", stc0, [
      api_element("use", {
        attrs: {
          "xlink:href": sanitizeAttribute(
            "use",
            "http://www.w3.org/2000/svg",
            "xlink:href",
            "/assets/icons/standard-sprite/svg/symbols.svg#case"
          ),
        },
        key: 1,
        svg: true,
      }),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-20i8lahhlnu";
tmpl.legacyStylesheetToken = "x-literal-value_literal-value";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
