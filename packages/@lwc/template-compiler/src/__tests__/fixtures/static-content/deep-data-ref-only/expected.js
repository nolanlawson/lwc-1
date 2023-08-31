import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}><div${3}></div><div${3}><div${3}><div${3}></div><div${3}></div></div></div><div${3}></div><div${3}></div></div>`;
const stc0 = [
  {
    partId: 4,
    data: {
      ref: "foo",
    },
    elm: undefined,
  },
  {
    partId: 5,
    data: {
      ref: "baz",
    },
    elm: undefined,
  },
  {
    partId: 6,
    data: {
      ref: "bar",
    },
    elm: undefined,
  },
  {
    partId: 7,
    data: {
      ref: "quux",
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
