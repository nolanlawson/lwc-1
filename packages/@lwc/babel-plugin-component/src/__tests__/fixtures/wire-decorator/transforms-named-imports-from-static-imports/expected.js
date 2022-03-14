import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./test.html";
import importedValue from "ns/module";
import { getFoo } from "data-service";

class Test extends LightningElement {
  wiredProp;
  /*LWC compiler vX.X.X*/

}

_registerDecorators(Test, {
  wire: {
    wiredProp: {
      adapter: getFoo,
      dynamic: [],
      config: function ($cmp) {
        return {
          key1: importedValue
        };
      }
    }
  }
});

export default _registerComponent(Test, {
  tmpl: _tmpl
});