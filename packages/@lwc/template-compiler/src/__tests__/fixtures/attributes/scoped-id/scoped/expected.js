import _lightningCombobox from "lightning/combobox";
import { registerTemplate } from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const { gid: api_scoped_id, c: api_custom_element } = $api;
  return [
    api_custom_element("lightning-combobox", _lightningCombobox, {
      attrs: {
        "aria-describedby": api_scoped_id("scoped-foo"),
        "aria-activedescendant": api_scoped_id("scoped-foo"),
        "aria-errormessage": api_scoped_id("scoped-foo"),
        "aria-flowto": api_scoped_id("scoped-foo"),
        "aria-labelledby": api_scoped_id("scoped-foo"),
        "aria-controls": api_scoped_id("scoped-foo"),
        "aria-details": api_scoped_id("scoped-foo"),
        "aria-owns": api_scoped_id("scoped-foo"),
      },
      props: {
        elementtiming: api_scoped_id("scoped-foo"),
        htmlFor: api_scoped_id("scoped-foo"),
        list: api_scoped_id("scoped-foo"),
        popuphidetarget: api_scoped_id("scoped-foo"),
        popupshowtarget: api_scoped_id("scoped-foo"),
        popuptoggletarget: api_scoped_id("scoped-foo"),
      },
      key: 0,
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
