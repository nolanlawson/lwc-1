import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}>Click</div>`;
const $fragment2 = parseFragment`<div${3}>Click</div>`;
const $fragment3 = parseFragment`<div${3}>Click</div>`;
const $fragment4 = parseFragment`<div${3}>Click</div>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, st: api_static_fragment } = $api;
  const { _m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, [
      {
        partId: 0,
        data: {
          on: {
            a123: _m1 || ($ctx._m1 = api_bind($cmp.handleClick)),
          },
        },
        elm: undefined,
      },
    ]),
    api_static_fragment($fragment2(), 3, [
      {
        partId: 0,
        data: {
          on: {
            foo_bar: _m3 || ($ctx._m3 = api_bind($cmp.handleClick)),
          },
        },
        elm: undefined,
      },
    ]),
    api_static_fragment($fragment3(), 5, [
      {
        partId: 0,
        data: {
          on: {
            foo_: _m5 || ($ctx._m5 = api_bind($cmp.handleClick)),
          },
        },
        elm: undefined,
      },
    ]),
    api_static_fragment($fragment4(), 7, [
      {
        partId: 0,
        data: {
          on: {
            a123: _m7 || ($ctx._m7 = api_bind($cmp.handleClick)),
          },
        },
        elm: undefined,
      },
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
