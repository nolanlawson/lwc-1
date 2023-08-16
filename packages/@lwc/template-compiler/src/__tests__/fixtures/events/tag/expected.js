import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<section${3}><div${3}>x</div><div${3}>x</div></section>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, st: api_static_fragment } = $api;
  const { _m0, _m1 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, function (elm) {
      const elm_c0 = elm.firstChild,
        elm_c1 = elm_c0.nextSibling,
        elm_c1_c0 = elm_c1.firstChild,
        elm_c0_c0 = elm_c0.firstChild;
      return [
        {
          elm: elm_c1,
          data: {
            on: {
              press: _m0 || ($ctx._m0 = api_bind($cmp.handlePress)),
            },
          },
          key: 2,
        },
        {
          elm: elm_c0,
          data: {
            on: {
              click: _m1 || ($ctx._m1 = api_bind($cmp.handleClick)),
            },
          },
          key: 3,
        },
      ];
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
