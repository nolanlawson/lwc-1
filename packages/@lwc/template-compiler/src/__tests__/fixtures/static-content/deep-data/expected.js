import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}><div${3}></div><div${3}><div${3}><div${3}></div><div${3}></div></div></div><div${3}></div><div${3}></div></div>`;
const stc0 = {
  ref: "bar",
};
const stc1 = {
  ref: "foo",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, st: api_static_fragment } = $api;
  const { _m0, _m1 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, function (root, renderer) {
      const { getFirstChild, nextSibling } = renderer;
      const root_c0 = getFirstChild(root),
        root_c1 = nextSibling(root_c0),
        root_c2 = nextSibling(root_c1),
        root_c3 = nextSibling(root_c2),
        root_c1_c0 = getFirstChild(root_c1),
        root_c1_c0_c0 = getFirstChild(root_c1_c0),
        root_c1_c0_c1 = nextSibling(root_c1_c0_c0);
      return [
        {
          elm: root_c3,
          data: {
            on: {
              click: _m0 || ($ctx._m0 = api_bind($cmp.onClickQuux)),
            },
          },
          key: 2,
        },
        {
          elm: root_c2,
          data: stc0,
          key: 3,
        },
        {
          elm: root_c1_c0_c1,
          data: {
            on: {
              click: _m1 || ($ctx._m1 = api_bind($cmp.onClickBaz)),
            },
          },
          key: 4,
        },
        {
          elm: root_c1_c0_c0,
          data: stc1,
          key: 5,
        },
      ];
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.hasRefs = true;
