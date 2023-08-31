import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}><span${3}></span></div>`;
const stc0 = [
  {
    partId: 1,
    data: {
      ref: "foo",
    },
    elm: undefined,
  },
];
function tmpl($api, $cmp, $slotset, $ctx) {
  const { st: api_static_fragment } = $api;
  return [api_static_fragment($fragment1(), 1, stc0)];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.hasRefs = true;
