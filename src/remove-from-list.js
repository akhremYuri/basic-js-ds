const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
  if (l.value === k) {
    let n = l.next;
    while (n && n.value === k) {
      n = n.next;
    }
    l = n;
  }
  let t = l.next;
  while (t && t.value === k) {
    t = t.next;
  }
  l.next = t;
  while (t) {
    let t1 = t.next;
    while (t1 && t1.value === k) {
      t1 = t1.next;
    }
    t.next = t1;
    t = t1;
  }
  return l;
}

module.exports = {
  removeKFromList,
};
