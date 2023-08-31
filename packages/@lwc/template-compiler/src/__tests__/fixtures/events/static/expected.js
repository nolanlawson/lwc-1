import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}><button${3}></button></div>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, st: api_static_fragment } = $api;
  const { _m0 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, [
      {
        partId: 1,
        data: {
          on: {
            click: _m0 || ($ctx._m0 = api_bind($cmp.handleClick)),
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
