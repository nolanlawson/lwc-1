import { registerTemplate } from "lwc";
const stc0 = {
  key: 0,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { d: api_dynamic_text, h: api_element } = $api;
  return [api_element("p", stc0, [api_dynamic_text($cmp.text)], 128)];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
