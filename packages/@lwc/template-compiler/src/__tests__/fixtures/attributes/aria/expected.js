import _xCmp from "x/cmp";
import { registerTemplate } from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const { gid: api_scoped_id, c: api_custom_element, h: api_element } = $api;
  return [
    api_custom_element("x-cmp", _xCmp, {
      props: {
        ariaActiveDescendant: api_scoped_id("foo"),
        ariaAtomic: "foo",
        ariaAutoComplete: "foo",
        ariaBusy: "foo",
        ariaChecked: "foo",
        ariaColCount: "foo",
        ariaColIndex: "foo",
        ariaColSpan: "foo",
        ariaControls: api_scoped_id("foo"),
        ariaCurrent: "foo",
        ariaDescribedBy: api_scoped_id("foo"),
        ariaDetails: api_scoped_id("foo"),
        ariaDisabled: "foo",
        ariaErrorMessage: api_scoped_id("foo"),
        ariaExpanded: "foo",
        ariaFlowTo: api_scoped_id("foo"),
        ariaHasPopup: "foo",
        ariaHidden: "foo",
        ariaInvalid: "foo",
        ariaKeyShortcuts: "foo",
        ariaLabel: "foo",
        ariaLabelledBy: api_scoped_id("foo"),
        ariaLevel: "foo",
        ariaLive: "foo",
        ariaModal: "foo",
        ariaMultiLine: "foo",
        ariaMultiSelectable: "foo",
        ariaOrientation: "foo",
        ariaOwns: api_scoped_id("foo"),
        ariaPlaceholder: "foo",
        ariaPosInSet: "foo",
        ariaPressed: "foo",
        ariaReadOnly: "foo",
        ariaRelevant: "foo",
        ariaRequired: "foo",
        ariaRoleDescription: "foo",
        ariaRowCount: "foo",
        ariaRowIndex: "foo",
        ariaRowSpan: "foo",
        ariaSelected: "foo",
        ariaSetSize: "foo",
        ariaSort: "foo",
        ariaValueMax: "foo",
        ariaValueMin: "foo",
        ariaValueNow: "foo",
        ariaValueText: "foo",
      },
      key: 0,
    }),
    api_element("div", {
      attrs: {
        "aria-activedescendant": api_scoped_id("foo"),
        "aria-atomic": "foo",
        "aria-autocomplete": "foo",
        "aria-busy": "foo",
        "aria-checked": "foo",
        "aria-colcount": "foo",
        "aria-colindex": "foo",
        "aria-colspan": "foo",
        "aria-controls": api_scoped_id("foo"),
        "aria-current": "foo",
        "aria-describedby": api_scoped_id("foo"),
        "aria-details": api_scoped_id("foo"),
        "aria-disabled": "foo",
        "aria-errormessage": api_scoped_id("foo"),
        "aria-expanded": "foo",
        "aria-flowto": api_scoped_id("foo"),
        "aria-haspopup": "foo",
        "aria-hidden": "foo",
        "aria-invalid": "foo",
        "aria-keyshortcuts": "foo",
        "aria-label": "foo",
        "aria-labelledby": api_scoped_id("foo"),
        "aria-level": "foo",
        "aria-live": "foo",
        "aria-modal": "foo",
        "aria-multiline": "foo",
        "aria-multiselectable": "foo",
        "aria-orientation": "foo",
        "aria-owns": api_scoped_id("foo"),
        "aria-placeholder": "foo",
        "aria-posinset": "foo",
        "aria-pressed": "foo",
        "aria-readonly": "foo",
        "aria-relevant": "foo",
        "aria-required": "foo",
        "aria-roledescription": "foo",
        "aria-rowcount": "foo",
        "aria-rowindex": "foo",
        "aria-rowspan": "foo",
        "aria-selected": "foo",
        "aria-setsize": "foo",
        "aria-sort": "foo",
        "aria-valuemax": "foo",
        "aria-valuemin": "foo",
        "aria-valuenow": "foo",
        "aria-valuetext": "foo",
      },
      key: 1,
    }),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
