import { registerTemplate } from "lwc";
const stc0 = {
  key: 0,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    co: api_comment,
    k: api_key,
    d: api_dynamic_text,
    h: api_element,
    i: api_iterator,
  } = $api;
  return [
    api_element(
      "ul",
      stc0,
      api_iterator($cmp.colors, function (color) {
        return [
          api_comment(" color "),
          api_element(
            "li",
            {
              key: api_key(1, color),
            },
            [api_dynamic_text(color)],
            128
          ),
        ];
      }),
      0
    ),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
