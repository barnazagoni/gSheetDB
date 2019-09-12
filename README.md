# What is gSheetDB?
gSheetDB is a utility that allows Google Sheet documents to be used as a database/backend for simple applications.

DO NOT use this for storing any type of private or protected information. The Spreadsheets need to be *published to the web* in order for the library to work, meaning that all data available to the application will also be available to anyone who has access to the link of the spreadsheet.


# Usage

## 1. Add the source file to your project
```
<script src="gSheetDB.js"></script>
```

## 2. Initialize the gSheet database object. When the data is loaded a callback will be made to the passed function
```
var database = new gSheetDB(sheetUrl, rangeStr, callback);
```


## 3. Get the data in the required form.
Currently two ways of extracting the data are supported:
* As a matrice of all the values in the range
* As an array of keyed objects, with the first (header) row used as the keys and each row representing a single object
```
//Return data as 2-dimensional array
database.toArray2D();

//Return data as array of keyed objects
database.toKeyedObject();
```