import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}><div${3}></div><div${3}><div${3}><div${3}></div><div${3}></div></div></div><div${3}></div><div${3}></div></div>`;
const stc0 = {
  partId: 4,
  data: {
    ref: "foo",
  },
  elm: undefined,
};
const stc1 = {
  partId: 6,
  data: {
    ref: "bar",
  },
  elm: undefined,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, st: api_static_fragment } = $api;
  const { _m0, _m1 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, [
      stc0,
      {
        partId: 5,
        data: {
          on: {
            click: _m0 || ($ctx._m0 = api_bind($cmp.onClickBaz)),
          },
        },
        elm: undefined,
      },
      stc1,
      {
        partId: 7,
        data: {
          on: {
            click: _m1 || ($ctx._m1 = api_bind($cmp.onClickQuux)),
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
tmpl.hasRefs = true;
