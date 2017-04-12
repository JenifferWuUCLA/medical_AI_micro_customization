//Demo of Searching Sorting and Pagination of Table with AngularJS - Advance Example

var myApp = angular.module('myApp', []);

//Not Necessary to Create Service, Same can be done in COntroller also as method like add() method
myApp.service('filteredListService', function () {

    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,

            function (i) {
                /* Search Text in all 3 fields */
                return searchUtil(i, toSearch);
            });
    };

    this.paged = function (valLists, pageSize) {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };

});

//Inject Custom Service Created by us and Global service $filter. This is one way of specifying dependency Injection
var TableCtrl = myApp.controller('TableCtrl', function ($scope, $filter, filteredListService) {

    $scope.pageSize = 4;
    $scope.allItems = getDummyData();
    $scope.reverse = false;

    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.newName = '';
        $scope.newDOB = '';
        $scope.newAge = '';
        $scope.newGender = '';
        $scope.newZipcode = '';
        $scope.searchText = '';
        $scope.currentPage = 0;
        $scope.Header = ['', '', '', '', ''];
    }

    $scope.add = function () {
        $scope.allItems.push({
            name: $scope.newName,
            DOB: $scope.newDOB,
            age: $scope.newAge,
            gender: $scope.newGender,
            zipcode: $scope.newZipcode
        });
        $scope.resetAll();
    }

    $scope.search = function () {
        $scope.filteredList = filteredListService.searched($scope.allItems, $scope.searchText);

        if ($scope.searchText == '') {
            $scope.filteredList = $scope.allItems;
        }
        $scope.pagination();
    }

    // Calculate Total Number of Pages based on Search Result
    $scope.pagination = function () {
        $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.ItemsByPage.length - 1;
    };

    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 0;
        }
        for (var i = input; i < total; i++) {
            if (i != 0 && i != total - 1) {
                ret.push(i);
            }
        }
        return ret;
    };

    $scope.sort = function (sortBy) {
        $scope.resetAll();

        $scope.columnToOrder = sortBy;

        //$Filter - Standard Service
        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

        if ($scope.reverse) iconName = 'glyphicon glyphicon-chevron-up';
        else iconName = 'glyphicon glyphicon-chevron-down';

        if (sortBy === 'name') {
            $scope.Header[0] = iconName;
        } else if (sortBy === 'DOB') {
            $scope.Header[1] = iconName;
        } else if (sortBy === 'age') {
            $scope.Header[2] = iconName;
        } else if (sortBy === 'gender') {
            $scope.Header[3] = iconName;
        } else {
            $scope.Header[4] = iconName;
        }

        $scope.reverse = !$scope.reverse;

        $scope.pagination();
    };

    //By Default sort ny Name
    $scope.sort('name');

});

function searchUtil(item, toSearch) {
    /* Search Text in all 3 fields */
    return (item.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.DOB == toSearch || item.age == toSearch || item.gender == toSearch || item.zipcode == toSearch) ? true : false;
}

/*Get Dummy Data for Example*/
function getDummyData() {
    return [{
        name: 'DATUTEST, ABBY',
        DOB: '12/13/1975',
        age: 38,
        gender: 'F',
        zipcode: '45399'
    }, {
        name: 'DATUTESTC, Marry',
        DOB: '09/08/1978',
        age: 35,
        gender: 'F',
        zipcode: '14959'
    }, {
        name: 'DATUTESTB, BETH',
        DOB: '04/26/1977',
        age: 37,
        gender: 'F',
        zipcode: '10519'
    }, {
        name: 'AATUTESTC, Mike',
        DOB: '23/08/1998',
        age: 19,
        gender: 'M',
        zipcode: '24859'
    }, {
        name: 'SITUTESTC, Jack',
        DOB: '11/02/1997',
        age: 20,
        gender: 'M',
        zipcode: '62859'
    }, {
        name: 'OIYETESTC, Miller',
        DOB: '01/07/1996',
        age: 21,
        gender: 'M',
        zipcode: '24859'
    }, {
        name: 'AATUCVTYW, Berg',
        DOB: '23/03/1996',
        age: 21,
        gender: 'M',
        zipcode: '14859'
    }, {
        name: 'POJERLSTC, Addison',
        DOB: '12/12/1998',
        age: 19,
        gender: 'M',
        zipcode: '24751'
    }, {
        name: 'AASDYENC, Tess',
        DOB: '12/05/1995',
        age: 22,
        gender: 'M',
        zipcode: '29519'
    }, {
        name: 'AAERNVSTC, Ula',
        DOB: '14/02/1998',
        age: 19,
        gender: 'F',
        zipcode: '24081'
    }, {
        name: 'AAOUTNBTC, Alexia',
        DOB: '01/08/1995',
        age: 22,
        gender: 'F',
        zipcode: '60359'
    }, {
        name: 'AAOLHEBTC, Venus',
        DOB: '05/01/1998',
        age: 19,
        gender: 'F',
        zipcode: '24859'
    }];
}