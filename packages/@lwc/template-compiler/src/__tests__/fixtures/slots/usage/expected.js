import _implicitStylesheets from "./usage.css";
import _implicitScopedStylesheets from "./usage.scoped.css?scoped=true";
import _nsCmp from "ns/cmp";
import { freezeTemplate, parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<p${3}>Default Slot No Slot Attribute</p>`;
const $fragment2 = parseFragment`<p${"a0:slot"}${3}>Slot Empty String Attribute</p>`;
const $fragment3 = parseFragment`<p${"a0:slot"}${3}>Slot Boolean Attribute</p>`;
const $fragment4 = parseFragment`<p${"a0:slot"}${3}>Dynamic Slot Content</p>`;
const $fragment5 = parseFragment`<p${"a0:slot"}${3}>Variable As Slot Assignment</p>`;
const $fragment6 = parseFragment`<p${"a0:slot"}${3}>Header Slot Content</p>`;
const $fragment7 = parseFragment`<p${"a0:slot"}${3}>Default Content</p>`;
const $fragment8 = parseFragment`<p${"a0:slot"}${3}>Undefined Slot Content</p>`;
const $fragment9 = parseFragment`<p${"a0:slot"}${3}>Null Slot Content</p>`;
const $fragment10 = parseFragment`<p${"a0:slot"}${3}>Empty slot value</p>`;
const stc0 = {
  key: 0,
};
const stc1 = {
  key: 1,
};
const stc2 = {
  slotAssignment: "",
};
const stc3 = {
  slotAssignment: "true",
};
const stc4 = {
  slotAssignment: "header",
};
const stc5 = {
  slotAssignment: "undefined",
};
const stc6 = {
  slotAssignment: "null",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    st: api_static_fragment,
    sp: api_static_part,
    c: api_custom_element,
    h: api_element,
  } = $api;
  return [
    api_element("section", stc0, [
      api_custom_element("ns-cmp", _nsCmp, stc1, [
        api_static_fragment($fragment1, 3),
        api_static_fragment($fragment2, 5, [api_static_part(0, stc2, null)]),
        api_static_fragment($fragment3, 7, [api_static_part(0, stc3, null)]),
        api_static_fragment($fragment4, 9, [
          api_static_part(
            0,
            {
              slotAssignment: $cmp.slot.name,
            },
            null
          ),
        ]),
        api_static_fragment($fragment5, 11, [
          api_static_part(
            0,
            {
              slotAssignment: $cmp.slotVariable,
            },
            null
          ),
        ]),
        api_static_fragment($fragment6, 13, [api_static_part(0, stc4, null)]),
        api_static_fragment($fragment7, 15, [api_static_part(0, stc2, null)]),
        api_static_fragment($fragment8, 17, [api_static_part(0, stc5, null)]),
        api_static_fragment($fragment9, 19, [api_static_part(0, stc6, null)]),
        api_static_fragment($fragment10, 21, [api_static_part(0, stc2, null)]),
      ]),
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
