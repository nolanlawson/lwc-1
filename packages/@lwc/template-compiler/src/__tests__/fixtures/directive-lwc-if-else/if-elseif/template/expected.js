import { registerTemplate } from "lwc";
const stc0 = ["Conditional Text"];
const stc1 = ["Elseif!"];
function tmpl($api, $cmp, $slotset, $ctx) {
  const { fr: api_fragment } = $api;
  return [
    $cmp.visible
      ? api_fragment(0, stc0, 0)
      : $cmp.displayAlt
      ? api_fragment(0, stc1, 0)
      : null,
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
