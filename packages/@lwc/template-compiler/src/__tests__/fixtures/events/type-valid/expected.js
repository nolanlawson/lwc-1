import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}>Click</div>`;
const $fragment2 = parseFragment`<div${3}>Click</div>`;
const $fragment3 = parseFragment`<div${3}>Click</div>`;
const $fragment4 = parseFragment`<div${3}>Click</div>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, st: api_static_fragment } = $api;
  const { _m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, function (root, renderer) {
      const { getFirstChild, nextSibling } = renderer;
      const root_c0 = getFirstChild(root);
      return [
        {
          elm: root,
          data: {
            on: {
              a123: _m1 || ($ctx._m1 = api_bind($cmp.handleClick)),
            },
          },
          key: 2,
        },
      ];
    }),
    api_static_fragment($fragment2(), 4, function (root, renderer) {
      const { getFirstChild, nextSibling } = renderer;
      const root_c0 = getFirstChild(root);
      return [
        {
          elm: root,
          data: {
            on: {
              foo_bar: _m3 || ($ctx._m3 = api_bind($cmp.handleClick)),
            },
          },
          key: 5,
        },
      ];
    }),
    api_static_fragment($fragment3(), 7, function (root, renderer) {
      const { getFirstChild, nextSibling } = renderer;
      const root_c0 = getFirstChild(root);
      return [
        {
          elm: root,
          data: {
            on: {
              foo_: _m5 || ($ctx._m5 = api_bind($cmp.handleClick)),
            },
          },
          key: 8,
        },
      ];
    }),
    api_static_fragment($fragment4(), 10, function (root, renderer) {
      const { getFirstChild, nextSibling } = renderer;
      const root_c0 = getFirstChild(root);
      return [
        {
          elm: root,
          data: {
            on: {
              a123: _m7 || ($ctx._m7 = api_bind($cmp.handleClick)),
            },
          },
          key: 11,
        },
      ];
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
