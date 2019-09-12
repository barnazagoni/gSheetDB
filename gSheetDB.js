class gSheetDB {

    constructor(sheetUrl, rangeStr, callback) { //var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1Pvz6yJVbzZon2_R3LF-C0qyhrYr61liJOYQqt2nX-48/2/public/full?alt=json&range=B5:CP25';
        this.range = this.rangeParse(rangeStr);
        fetch(sheetUrl)
            .then(response => response.json())
            .then((data) => {
                this.json = data;
                console.log("Data has been loaded");
                console.log(callback);
                if (callback)
                    callback();
            });
    }

    /*
    To-Do List
    [x] Add range management
    [x] Manage so that variables are passed inside
    [ ] URL management, making getting the sheet URL more straightforward
    [x] Fix Async errors
    */

    letterToNumber(str) {
        var out = 0,
            len = str.length;
        for (var pos = 0; pos < len; pos++) {
            out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out;
    }

    rangeParse(range) {
        var newrange = new Object();
        var res = range.split(":");
        var topleft = res[0].match(/([A-Za-z]+)([0-9]+)/);
        var bottomright = res[1].match(/([A-Za-z]+)([0-9]+)/);

        newrange.colStart = this.letterToNumber(topleft[1]);
        newrange.rowStart = topleft[2];
        newrange.colEnd = this.letterToNumber(bottomright[1]);
        newrange.rowEnd = bottomright[2];
        return newrange;
    }

    create2DArray(rows) {
        var arr = [];
        for (var i = 0; i < rows; i++) {
            arr[i] = [];
        }
        return arr;
    }

    toArray2D() {
        var rowOffset = this.range.rowStart;
        var colOffset = this.range.colStart;
        var result = this.create2DArray(21);
        var entry = this.json.feed.entry;
        entry.forEach(function(elem) {
            //console.log(elem.gs$cell);
            result[elem.gs$cell.row - rowOffset][elem.gs$cell.col - colOffset] = elem.gs$cell.$t;
        });
        return result;
    }

    keyName(headerArray, index) {
        var tempName = headerArray[index];
        if (tempName != "")
            return tempName
        else
            return ("FIELD" + index);
    }

    toKeyedObject() {
        var result = [];
        var tempArray = this.toArray2D();
        for (var i = 1; i < tempArray.length; i++) {
            result[i - 1] = new Object();
            tempArray[i].forEach(function(elem, index) {
                result[i - 1][this.keyName(tempArray[0], index)] = elem;
            }.bind(this));
        }
        return result;
    }
}