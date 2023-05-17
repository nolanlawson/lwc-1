import _xChildWithNamedSlots from "x/childWithNamedSlots";
import { registerTemplate } from "lwc";
const stc0 = {
  key: 0,
};
const stc1 = {
  attrs: {
    slot: "slotname1",
  },
  key: 2,
};
const stc2 = ["Named slot content from parent"];
function tmpl($api, $cmp, $slotset, $ctx) {
  const { h: api_element, fr: api_fragment, c: api_custom_element } = $api;
  return [
    api_custom_element(
      "x-child-with-named-slots",
      _xChildWithNamedSlots,
      stc0,
      [
        $cmp.condition
          ? api_fragment(1, [api_element("div", stc1, stc2, 160)], 0)
          : null,
      ],
      0
    ),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
