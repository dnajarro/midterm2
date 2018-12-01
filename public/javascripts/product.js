angular.module('amazon', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.products = [];
            $scope.choices = {};
            $scope.cart = [];
            $scope.showSubmit = true;
            $scope.showTitle = true;
            $scope.displayChoices = false;
            $scope.pageTitle = "Current Products";
            $scope.myStyle = {'font-weight':'bold'};
            $scope.addProduct = function() {
                var newprod = { name: $scope.prodName, quantity: 0, price: $scope.price};
                $http.post('/products', newprod).success(function(data) {
                    $scope.products.push(data);
                });
                console.log($scope.products);
                $scope.prodName = '';
                $scope.quantity = '';
                $scope.price = '';
            };
            $scope.addPurchase = function(prod) {
                console.log(prod);
                if ($scope.cart.length != 0) {
                    $scope.cart = [];
                } 
                if ($scope.choices[prod.name] == null) {
                    $scope.choices[prod.name] = prod;
                    console.log("value is now: " + $scope.choices[prod.name]);
                }
                else {
                    console.log("not checked");
                    $scope.choices[prod.name] = null;
                    console.log("value is now: " + $scope.choices[prod.name]);
                }
            };
            $scope.incrementQuantity = function(submitbutton) {
                var success = true;
                for (var key in $scope.choices) {
                    console.log(key);
                    if ($scope.choices[key] != null) {
                        $scope.cart.push($scope.choices[key].name);
                        console.log($scope.cart);
                        $http.put('/products/' + $scope.choices[key]._id + '/upvote')
                            .success(function(data) {
                            });
                    }
                    else {
                        console.log("is null");
                        success = false;
                    }
                }
                if (success) {
                    $scope.showSubmit = false;
                    $scope.showTitle = false;
                    $scope.displayChoices = true;
                    $scope.products = [];
                    $scope.choices = {};
                    $scope.pageTitle = "Shopping Cart";
                }
            };
            $scope.delete = function(prod) {
                $http.delete('/products/' + prod._id)
                    .success(function(data) {
                        console.log("delete worked");
                        $scope.getAll();
                    });
            };
            $scope.getAll = function() {
                return $http.get('/products').success(function(data) {
                    angular.copy(data, $scope.products);
                });
            };
            $scope.getAll();
        }
    ]);
