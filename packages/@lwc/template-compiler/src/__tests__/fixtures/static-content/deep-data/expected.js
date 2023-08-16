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
    api_static_fragment($fragment1(), 1, function (elm) {
      const elm_c0 = elm.firstChild,
        elm_c1 = elm_c0.nextSibling,
        elm_c2 = elm_c1.nextSibling,
        elm_c3 = elm_c2.nextSibling,
        elm_c1_c0 = elm_c1.firstChild,
        elm_c1_c0_c0 = elm_c1_c0.firstChild,
        elm_c1_c0_c1 = elm_c1_c0_c0.nextSibling;
      return [
        {
          elm: elm_c3,
          data: {
            on: {
              click: _m0 || ($ctx._m0 = api_bind($cmp.onClickQuux)),
            },
          },
          key: 2,
        },
        {
          elm: elm_c2,
          data: stc0,
          key: 3,
        },
        {
          elm: elm_c1_c0_c1,
          data: {
            on: {
              click: _m1 || ($ctx._m1 = api_bind($cmp.onClickBaz)),
            },
          },
          key: 4,
        },
        {
          elm: elm_c1_c0_c0,
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
