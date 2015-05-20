var myapp = angular.module('sampleapp', []);
myapp.controller('samplecontoller', ['$scope', '$filter', function ($scope, $filter) {
        $scope.items = [
            {Id:1,Name: "Trần Đức Tùng", Age: 20, Sex: "Male"},
            {Id:2,Name: "Trần Đức Thông", Age: 22, Sex: "Male"},
            {Id:3,Name: "Trần Đức Thanh", Age: 12, Sex: "Male"}

        ];
        $scope.range = function () {
            var pus = [];
            for (var i = 0; i < $scope.numberOfPages(); i++) {
                pus.push(i);
            }
            return pus;
        };
        $scope.checked = function (n) {
            if (n === $scope.curPage) {
                return true;
            }
        };
        $scope.setPage = function (n) {
            $scope.curPage = n;
        };
        $scope.removeItem = function (item) {
            //  var index = $scope.curPage  * 3 + i;
            $scope.items.splice($scope.items.indexOf(item), 1);
        };
        $scope.showData = function ( ) {
            $scope.curPage = 0;
            $scope.pageSize = 3;
            $scope.Id = 4;

            $scope.numberOfPages = function () {
                return Math.ceil($scope.items.length / $scope.pageSize);
            };
        };
        $scope.addItem = function () {
            if ($scope.Name && $scope.Age && $scope.Sex) {
                $scope.items.push({Id:$scope.Id,Name:$scope.Name,Age:$scope.Age,Sex:$scope.Sex});
                $scope.Name = '';
                $scope.Age = '';
                $scope.Sex = '';
                $scope.Id++;
            }
        };
        var orderBy = $filter('orderBy');
        $scope.order = function (predicate, reverse) {
            $scope.items = orderBy($scope.items, predicate, reverse);
        };
    }]);
angular.module('sampleapp').filter('pagination', function ()
{
    return function (input, start)
    {
        start = +start;
        return input.slice(start);
    };
});

 