import copy from "copy-to-clipboard";

export default function Clipboard(text) {
  copy(text);
  return true
}
