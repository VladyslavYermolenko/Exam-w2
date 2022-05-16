const database = [
    {
        name: "Samsung A12",
        category: "Phones",
        price: 5000.00
    },
    {
        name: "IPhone X",
        category: "Phones",
        price: 12000.00
    },
    {
        name: "Xiaomi Redmi 5 Lite",
        category: "Phones",
        price: 4200.00
    },
    {
        name: "Samsung Smart V4",
        category: "TV",
        price: 7100.00
    },
    {
        name: "KIWI G76",
        category: "TV",
        price: 9500.00
    },
]

function SortingDatabaseByFallsPrices(database) {
    database.sort(function(a, b) {
        if (a.price < b.price) {
            return 1;
        }
        if (a.price > b.price) {
            return -1;
        }
        return 0;
    });
}

function ConvertArrayToMap(database) {
    const databaseMap = new Map();
    for (const obj of database) {
        const category = obj.category;
        databaseMap.get(category)?.push(obj) ?? databaseMap.set(category, [obj]);
    }
    return databaseMap;
}

function GetCategorieListFromMaps(databaseMap) {
    const categoryList = [];
    for (const categoryName of databaseMap.keys()) {
        categoryList.push(categoryName)
    }
    return categoryList;
}

function GetBiggestWordLengthInDatabase(database, categoryList) {
    let biggestWordLength = 0;
    for (const obj of database) {
        if (obj.name.length > biggestWordLength) {
            biggestWordLength = obj.name.length;
        }
    }

    for (const category of categoryList) {
        if (category.length > biggestWordLength) {
            biggestWordLength = category.length;
        }
    }
    return biggestWordLength;
}

function GetBiggestNumberLengthInDatabase(databaseMap, categoryList) {
    let biggestNumberLength = 0;
    for (let i = 0; i < databaseMap.size; i++) {
        const category = databaseMap.get(categoryList[i]);
        let totalCategorySum = 0;
        for (const obj of category) {
            totalCategorySum += obj.price;
        }
        if (totalCategorySum.toString().length > biggestNumberLength) {
            biggestNumberLength = totalCategorySum.toString().length;
        }
    }
    return biggestNumberLength;
}

function OutputCheck(database) {
    SortingDatabaseByFallsPrices(database);
    const databaseMap = ConvertArrayToMap(database);

    const categoryList = GetCategorieListFromMaps(databaseMap);
    
    const biggestNameInDatabase = GetBiggestWordLengthInDatabase(database, categoryList);
    const biggestNumberLength = GetBiggestNumberLengthInDatabase(databaseMap, categoryList);
    
    let output = '';
    let allTotalCategorySum = 0;
    for (let i = 0; i < databaseMap.size; i++) {
        const category = databaseMap.get(categoryList[i]);
        
        let totalCategorySum = 0;
        for (const obj of category) {
            totalCategorySum += obj.price;
        }
        allTotalCategorySum += totalCategorySum;

        
        output += '\n' + categoryList[i] + ' '.repeat(biggestNameInDatabase + (biggestNameInDatabase - categoryList[i].length) + 5 + biggestNumberLength + (biggestNumberLength - totalCategorySum.toString().length)) + totalCategorySum;
        for (const obj of category) {
            output += '\n  ' + obj.name + '.'.repeat(biggestNameInDatabase + (biggestNameInDatabase - obj.name.length) + 3 + biggestNumberLength + (biggestNumberLength - obj.price.toString().length)) + obj.price
        }
        output += '\n'
    }
    output += `\nTotal: ${allTotalCategorySum}\n`
    console.log(output);
}
OutputCheck(database);