const rotate = (arr, k) => {
    const temp_arr = [...arr];
    for (let i = 0; i < k; i++){
        temp_arr.unshift(temp_arr.pop())
    }
    return temp_arr;
}

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