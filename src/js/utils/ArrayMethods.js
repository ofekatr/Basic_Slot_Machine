/** @file Array utility methods.
 *	@author Ofek Atar
 */

/**
 * Rotates an array to the right k times.
 * @param {Array} arr The array to rotate.
 * @param {number} k The number of times to rotate.
 * @returns {Array} The rotated array.
 */
const rotate = (arr, k) => {
    const temp_arr = [...arr];
    for (let i = 0; i < k; i++){
        temp_arr.unshift(temp_arr.pop())
    }
    return temp_arr;
}

/**
 * Rotates an array to the left k times.
 * @param {Array} arr The array to rotate.
 * @param {number} k The number of times to rotate.
 * @returns {Array} The rotated array.
 */
const rotateLeft = (arr, k) => {
    const temp_arr = [...arr];
    return temp_arr.slice(k).concat(temp_arr.slice(0,k));
}

/**
 * Returns an array with the given range's indices.
 * @param {{start: number, end: number}} param0 The range indices.
 * @returns The range indices array.
 */
const rangeArray = ({ start = 0, end = 0 }) => {
    const step = start > end ? -1 : 1;
    const diff = Math.abs(end - start);
    const arr = new Array(diff);
    for (let i = 0; i < diff; i++){
        arr[i] = start + step * i;
    }
    return arr;
}

export default {
    rotate,
    rangeArray,
}