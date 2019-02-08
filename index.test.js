import test from "ava";
import freeze from "deep-freeze";

/**
 * Write a function to recursively update a given node and its children inside a tree structure.
 * We added tests to help you, run them by using `yarn test`.
 */
function updateTree(tree, id, values) {
  if (!id) {
    return
  } 

  let newObject = {};
  
  Object.keys(tree).map(function(key, index) {
    let newInnerObject = {}
    Object.keys(tree[key]).map(function(newKey, index) {
        newInnerObject[newKey] = tree[key][newKey]
      }
    )
    newObject[key] = newInnerObject
  })

  newObject[id].value = values.value

  tree[id].children.forEach((child) => {
    newObject = updateTree(newObject, child, values);
  })
 
  return newObject
}

test("update child nodes", t => {
  const tree = freeze({
    "1": {
      id: "1",
      value: "",
      children: ["2", "3"]
    },
    "2": {
      id: "2",
      value: "",
      children: ["4", "5"]
    },
    "3": {
      id: "3",
      value: "",
      children: ["6"]
    },
    "4": {
      id: "4",
      value: "",
      children: ["7"]
    },
    "5": {
      id: "5",
      value: "",
      children: []
    },
    "6": {
      id: "6",
      value: "",
      children: []
    },
    "7": {
      id: "7",
      value: "",
      children: []
    }
  });

  const expectedResult = {
    "1": {
      id: "1",
      value: "",
      children: ["2", "3"]
    },
    "2": {
      id: "2",
      value: "Hello World",
      children: ["4", "5"]
    },
    "3": {
      id: "3",
      value: "",
      children: ["6"]
    },
    "4": {
      id: "4",
      value: "Hello World",
      children: ["7"]
    },
    "5": {
      id: "5",
      value: "Hello World",
      children: []
    },
    "6": {
      id: "6",
      value: "",
      children: []
    },
    "7": {
      id: "7",
      value: "Hello World",
      children: []
    }
  };

  t.deepEqual(updateTree(tree, "2", { value: "Hello World" }), expectedResult);
});
