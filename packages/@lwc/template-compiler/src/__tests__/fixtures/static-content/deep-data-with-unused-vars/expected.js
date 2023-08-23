import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}><div${3}><div${3}></div></div><div${3}><div${3}><div${3}></div></div><div${3}></div><div${3}></div></div></div>`;
const stc0 = {
  ref: "bar",
};
const stc1 = {
  ref: "foo",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { st: api_static_fragment } = $api;
  return [
    api_static_fragment($fragment1(), 1, function (root, renderer) {
      const { getFirstChild, nextSibling } = renderer;
      const root_c0 = getFirstChild(root),
        root_c1 = nextSibling(root_c0),
        root_c1_c0 = getFirstChild(root_c1),
        root_c1_c1 = nextSibling(root_c1_c0),
        root_c1_c2 = nextSibling(root_c1_c1),
        root_c1_c0_c0 = getFirstChild(root_c1_c0),
        root_c0_c0 = getFirstChild(root_c0);
      return [
        {
          elm: root_c1_c1,
          data: stc0,
          key: 2,
        },
        {
          elm: root_c0,
          data: stc1,
          key: 3,
        },
      ];
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.hasRefs = true;
