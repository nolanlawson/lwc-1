import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<div${3}>Foo</div>`;
const stc0 = {
  ref: "foo",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { st: api_static_fragment } = $api;
  return [
    api_static_fragment($fragment1(), 1, function (elm) {
      const elm_c0 = elm.firstChild;
      return [
        {
          elm: elm,
          data: stc0,
          key: 2,
        },
      ];
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.hasRefs = true;
