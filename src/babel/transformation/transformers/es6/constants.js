import * as messages from "../../../messages";

export function Scope(node, parent, scope) {
  for (var name in scope.bindings) {
    var binding = scope.bindings[name];

    // not a constant
    if (binding.kind !== "const" && binding.kind !== "module") continue;

    for (var violation of (binding.constantViolations: Array)) {
      throw violation.errorWithNode(messages.get("readOnly", name));
    }
  }
}

export function VariableDeclaration(node) {
  if (node.kind === "const") node.kind = "let";
}
