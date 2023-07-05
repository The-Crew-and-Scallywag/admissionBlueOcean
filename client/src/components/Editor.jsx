import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
// https://codemirror.net/docs/ref/#state.EditorStateConfig.extensions Where I'm working from
let myView = new EditorView({
  doc: "hello",
  extensions: [keymap.of(defaultKeymap)],
  parent: document.body,
});
