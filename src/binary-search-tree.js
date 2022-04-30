const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  rootNode = null;

  root() {
    return this.rootNode;
  }

  add(data) {
    function checkNode(node) {
      if (node.data === data) {
        return;
      } else if (node.data > data) {
        if (!node.left) {
          node.left = new Node(data);
          return;
        }
        checkNode(node.left);
      } else {
        if (!node.right) {
          node.right = new Node(data);
          return;
        }
        checkNode(node.right);
      }
    }

    if (!this.rootNode) {
      this.rootNode = new Node(data);
    } else {
      checkNode(this.rootNode);
    }
  }

  has(data) {
    function hasNode(node) {
      if (node.data === data) {
        return true;
      } else if (node.data > data) {
        if (!node.left) {
          return false;
        }
        return hasNode(node.left);
      } else {
        if (!node.right) {
          return false;
        }
        return hasNode(node.right);
      }
    }

    if (!this.rootNode) {
      return false;
    } else {
      return hasNode(this.rootNode);
    }
  }

  find(data) {
    function findNode(node) {
      if (node.data === data) {
        return node;
      } else if (node.data > data) {
        if (!node.left) {
          return null;
        }
        return findNode(node.left);
      } else {
        if (!node.right) {
          return null;
        }
        return findNode(node.right);
      }
    }
    if (!this.rootNode) {
      return null;
    } else {
      return findNode(this.rootNode);
    }
  }

  remove(data) {
    if (!this.rootNode) {
      return;
    }
    if (this.rootNode.data === data) {
      let tempNode = this.rootNode;
      this.rootNode = null;
      if (tempNode.right) {
        this.rootNode = tempNode.right;
      }
      if (tempNode.left) {
        if (this.rootNode) {
          this._minNode(this.rootNode).left = tempNode.left;
        } else {
          this.rootNode = tempNode.left;
        }
      }
    } else this._checkChildNodes(this.rootNode, data);
  }

  _checkChildNodes(node, data) {
    if (node.data > data) {
      if (!node.left) {
        return;
      }
      if (node.left.data === data) {
        this._removeNode(node, "left");
        return;
      } else this._checkChildNodes(node.left, data);
    } else {
      if (!node.right) {
        return;
      }
      if (node.right.data === data) {
        this._removeNode(node, "right");
        return;
      } else this._checkChildNodes(node.right, data);
    }
  }

  _removeNode(parentNode, childName) {
    let tempNode = parentNode[childName];
    if (!tempNode) {
      return;
    }
    parentNode[childName] = null;
    if (tempNode.right) {
      parentNode[childName] = tempNode.right;
    }
    if (tempNode.left) {
      if (parentNode[childName]) {
        this._minNode(parentNode[childName]).left = tempNode.left;
      } else {
        parentNode[childName] = tempNode.left;
      }
    }
  }

  _minNode(node) {
    if (!node) {
      return null;
    }
    if (!node.left) {
      return node;
    }
    let tempNode = node.left;
    while (tempNode.left) {
      tempNode = tempNode.left;
    }
    return tempNode;
  }

  _maxNode(node) {
    if (!node) {
      return null;
    }
    if (!node.right) {
      return node;
    }
    let tempNode = node.right;
    while (tempNode.right) {
      tempNode = tempNode.right;
    }
    return tempNode;
  }

  min() {
    let tempNode = this._minNode(this.rootNode);
    if (tempNode) {
      return tempNode.data;
    }
    return null;
  }

  max() {
    let tempNode = this._maxNode(this.rootNode);
    if (tempNode) {
      return tempNode.data;
    }
    return null;
  }
}

module.exports = {
  BinarySearchTree,
};
