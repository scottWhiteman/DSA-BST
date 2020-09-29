const BinarySearchTree = require('./BinarySearchTree');
/*
    1).
                3
            1       4
              2       6
                    5   9
                       7

                E
        A               S
                    Q       Y
                  E       U
                   I     S 
                    O     T
                   N 
*/

/*
    2).
                4
            1       6
              2   5    9
                     7  

                E
        A               S
                    Q       Y
                  I      U
                   O    S
                  N      T
*/

/*
    3).
*/
function createBST() {
    const BST = new BinarySearchTree();
    [3, 1, 4, 6, 9, 2, 5, 7].forEach(num => {
        BST.insert(num, num);
    })
    const BSTLetters = new BinarySearchTree();
    ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N'].forEach(letter => {
        BSTLetters.insert(letter, letter);
    })
}
createBST();

/*
    4).
        This function returns the sum of all the nodes within the tree recursively.  If the tree does not exist or is null, return 0, ending the loop
        O(N): The number of nodes within the tree, since the number from each is required
*/
function tree(t) {
    if (!t) {
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
}

/*
    5).
        O(N): Each node must be checked to confirm the length
*/
function treeHeight(t) {
    if (!t) {
        return 0;
    }
    const left = treeHeight(t.left);
    const right = treeHeight(t.right);
    return right >= left ? right + 1 : left + 1;
}

/*
    6).
        O(N): Each node must be checked
*/

function isBST(t) {
    if (t.left && t.right) {
        if (t.left.value < t.value && t.value <= t.right.value) {
            return isBST(t.left) && isBST(t.right);
        }
        else {
            return false;
        }
    }
    else if (t.left) {
        if (t.left.value < t.value) {
            return isBST(t.left);
        }
        else {
            return false;
        }
    }
    else if (t.right) {
        if (t.right.value >= t.value) {
            return isBST(t.right);
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}

/*
    7). Find third largest value in tree

*/

function thirdLargest(t) {
    const valueList = getNodeValues(t);
    if (valueList.length < 3) {
        return null;
    }
    return valueList[valueList.length - 3];
}
function getNodeValues(t) {
    if (!t.left && !t.right) {
        return [t.value];
    }
    else {
        const left = t.left ? [...getNodeValues(t.left)] : [];
        const right = t.right ? [...getNodeValues(t.right)] : [];
        return [...left, t.value, ...right];
    }
}

/*
    8). Check if tree is balanced

*/
function isBalanced(t) {
    if (!t) {
        return true;
    }

    const left = treeHeight(t.left);
    const right = treeHeight(t.right);

    if (Math.abs(left - right) <= 1 && isBalanced(t.left) && isBalanced(t.right)) {
        return true;
    }
    return false;
}
// function createBalancedBST(arr, start=0, end=arr.length) {
//     if (start >= end) {
//         return null;
//     }
//     const middleIndex = Math.floor((end + start) / 2);
//     const value = arr[middleIndex];
//     const node = new BinarySearchTree(value);

//     node.left = createBalancedBST(arr, start, middleIndex);
//     node.right = createBalancedBST(arr, middleIndex + 1, end);

//     return node;
// }

function sameBSTHelper(t1, t2, n, i1, i2, min, max) {
    if (t1.length !== t2.length) {
        return false;
    }
    let j, k
    for (j = i1; j < n; j++) {
        if (t1[j] > min && t1[j] < max) {
            break;
        }
    }
    for (k = i2; k < n; k++) {
        if (t2[k] > min && t2[k] < max) {
            break;
        }
    }
    if (j == n && k == n) {
        return true;
    }
    if (((j == n)^(k == n)) || t1[j] != t2[k]) {
        return false;
    }
    return sameBSTHelper(t1, t2, n, j + 1, k + 1, t1[j], max) &&
        sameBSTHelper(t1, t2, n, j + 1, k + 1, min, t1[j])
}
function isSameBST(t1, t2) {
    const n = t1.length;
    return sameBSTHelper(t1, t2, n, 0, 0, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

function sameBSTTest() {
    const t1 = [3, 5, 4, 6, 1, 0, 2];
    const t2 = [3, 1, 5, 2, 4, 6, 0];
    console.log(isSameBST(t1, t2));
}
sameBSTTest();