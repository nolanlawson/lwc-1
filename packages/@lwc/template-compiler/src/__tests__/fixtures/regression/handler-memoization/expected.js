import { parseFragment, registerTemplate } from "lwc";
const $fragment1 = parseFragment`<button${3}>New</button>`;
const $fragment2 = parseFragment`<button${3}>[X]</button>`;
const stc0 = {
  key: 3,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    st: api_static_fragment,
    k: api_key,
    d: api_dynamic_text,
    t: api_text,
    h: api_element,
    i: api_iterator,
  } = $api;
  const { _m0, _m1 } = $ctx;
  return [
    api_static_fragment($fragment1(), 1, function (root, renderer) {
      const { getFirstChild, nextSibling } = renderer;
      const root_c0 = getFirstChild(root);
      return [
        {
          elm: root,
          data: {
            on: {
              click: _m1 || ($ctx._m1 = api_bind($cmp.create)),
            },
          },
          key: 2,
        },
      ];
    }),
    api_element(
      "ul",
      stc0,
      api_iterator($cmp.list, function (task) {
        return api_element(
          "li",
          {
            key: api_key(4, task.id),
          },
          [
            api_text(api_dynamic_text(task.title)),
            api_static_fragment($fragment2(), 6, function (root, renderer) {
              const { getFirstChild, nextSibling } = renderer;
              const root_c0 = getFirstChild(root);
              return [
                {
                  elm: root,
                  data: {
                    on: {
                      click: api_bind(task.delete),
                    },
                  },
                  key: 7,
                },
              ];
            }),
          ]
        );
      })
    ),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
