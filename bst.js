class Node {
  constructor(key, val, next) {
    this.key = key;
    this.val = val;
    this.next = next;
  }
}
class BST {
  left = null;
  right = null;
  root = null;
  constructor(key, val, N) {
    this.key = key;
    this.val = val;
    this.N = N;
  }

  size() {
    return this.nodeSize(this.root);
  }

  nodeSize(node) {
    if (node === null) return 0;
    return node.N;
  }

  get(key) {
    this.getNodeVal(node, key);
  }

  getNodeVal(node, key) {
    if (node === null) return null;
    const cmp = key.compareTo(node.key);
    if (cmp < 0) return this.getNodeVal(x.left, key);
    if (cmp > 0) return this.getNodeVal(x.right, key);
    return x.val;
  }

  put(key, val) {
    this.putValOnTree(this.root, key, val);
  }

  putValOnTree(node, key, val) {
    if (node === null) return new Node(key, val, 1);
    const cmp = key.compareTo(node.key);
    if (cmp < 0) {
      node.left = this.putValOnTree(x.left, key, val);
    } else if (cmp > 0) {
      node.right = this.putValOnTree(x.right, key, val);
    } else {
      x.val = val;
    }
    node.N = this.nodeSize(x.left) + this.nodeSize(x.right) + 1;
    return node;
  }
}
