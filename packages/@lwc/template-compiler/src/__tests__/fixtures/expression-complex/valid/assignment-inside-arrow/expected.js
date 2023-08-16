import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<section${3}><button${3}></button></section>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, st: api_static_fragment } = $api;
  const { _m0 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, function (elm) {
      const elm_c0 = elm.firstChild;
      return [
        {
          elm: elm_c0,
          data: {
            on: {
              click: _m0 || ($ctx._m0 = api_bind(() => ($cmp.myField = "foo"))),
            },
          },
          key: 2,
        },
      ];
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
