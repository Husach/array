let outerArr = [];

class Ranges {
    add(range) {
        let start = range[0];
        let rangeLength = range.length - 1;
        let end = range[rangeLength];

        if(!outerArr[0]) {
            this.setArray(0, start, end);
        } else {
            const outerArrLength = outerArr.length - 1;
            const innerArr = outerArr[outerArrLength];
            const innerArrLength = innerArr.length - 1;

            if (innerArr[innerArrLength] + 1 === end) {
                innerArr.push(end);
            } else if (innerArr[innerArrLength] < start) {
                this.setArray(outerArr.length, start, end);
            } else {
                outerArr.map((item, index) => {
                    if(item[item.length - 1] > start && item[item.length - 1] < end) {
                        this.updateArray(item, index, start, end);
                    }
                })
            }
        }
    }

    setArray(i, start, end) {
        let arr = [];
        for(let j = 0; j < end - start + 1; j++) {
            arr[j] = start + j;
        }
        outerArr[i] = arr;
    }

    updateArray(item, i, start, end) {
        for(let j = item.length; j < end; j++) {
            item[j] = j + 1;
        }
        outerArr[i] = item;
    }

    remove(range) {
        let start = range[0];
        let rangeLength = range.length - 1;
        let end = range[rangeLength];

        let arr = [];
        outerArr.map((item, index) => {
            if(item[0] < start && item[item.length - 1] > end) {
                this.divideArray(item, index, start, end);
            } else {
                item.map((itm) => {
                    if(itm === start
                        && item[item.length - 1] < end) {
                        arr[index] = item.slice(0, 2);
                    } else if (itm > start && itm + item.length < end) {
                        if(!arr[index]) {
                            arr[index] = [];
                            arr.pop();
                        }
                    } else if (itm === end) {
                        if(arr.length) arr[arr.length] = item.slice(index);
                    }
                });
            }
        });

        if(arr.length) outerArr = arr;

        for(let i = start; i <= end; i++) {
            outerArr.map((item) => {
                if(item[0] === start || item[0] === end) {
                    item.shift();
                } else if(item[item.length - 1] === end) {
                    item.pop();
                }
            })
        }
    }

    divideArray(item, index, start, end) {
        let arr = [];
        let count = 0;
        for(let i = item[0]; i < start; i++) {
            arr[count] = i;
            count++;
        }
        outerArr[index] = arr;

        arr = [];
        count = 0;
        for(let i = end; i < item[item.length - 1]; i++) {
            arr[count] = i + 1;
            count++;
        }
        outerArr[index + 1] = arr;
    }

    print() {
        let arr = [];
        outerArr.map((item, index) => {
            arr[index] = [item[0], item[item.length -1 ]];
        });
        console.log(arr);
    }
}

const r = new Ranges();

r.add([1, 4]);
r.print();

r.add([10, 20]);
r.print();

r.add([10, 10]);
r.print();

r.add([21, 21]);
r.print();

r.add([2, 4]);
r.print();

r.add([3, 8]);
r.print();

r.remove([10, 10]);
r.print();

r.remove([10, 11]);
r.print();

r.remove([15, 17]);
r.print();

r.remove([3, 19]);
r.print();
