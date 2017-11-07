var mainApp = angular.module("mainApp", []);

mainApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});         
mainApp.controller('inventoryController',['$scope', '$http', function($scope,$http) {

   $scope.counter = 0;
   $scope.order = {
      orderNo : null,
      custName : "",
      custPhone : "",               
      oCount : null,
      oStatus : "factory in",
      oPrice : null,
      oDiscount : null,
      oNetAmount : null,
      articles:[]
   };

   // console.log($scope.order);

   $scope.curArticle = {
         aid:$scope.counter+1,
         acolour:"",
         atype:"",
         arate:null,
         agender:"male",
         astatus:"factory in"
      };

   $scope.addArticle = function() {
      $scope.counter++;
      console.log($scope.curArticle);
      $scope.order.articles.push({
         aid:$scope.counter,
         acolour:$scope.curArticle.acolour,
         atype:$scope.curArticle.atype,
         arate:parseInt($scope.curArticle.arate),
         agender:$scope.curArticle.agender,
         astatus:$scope.curArticle.astatus
      });
      $scope.order.oCount = $scope.counter;
      $scope.order.oPrice += parseInt($scope.curArticle.arate);
      var op = parseInt($scope.order.oPrice);
      var od = parseInt($scope.order.oDiscount);
      $scope.order.oNetAmount = parseInt(op-((op*od)/100));
      console.log($scope.order.oPrice);
      console.log($scope.order.oNetAmount);
      console.log($scope.order.oDiscount);

      $scope.curArticle = {
         aid:$scope.counter+1,
         acolour:"",
         atype:"",
         arate:null,
         agender:"male",
         astatus:"factory in"
      };
      // console.log($scope.order);
   };

   $scope.sendData = function(orderData) {
      console.log("actual sendData api fun called");
       return $http({
           url: '/api/saveNewOrder',
           method: "POST",
           data: orderData
       })
       .then(function(response) {
               console.log(response);
               // console.log("response back from senddata succes");
               return {status:true,data:response.data};
       }, 
       function(err) { // optional
               console.log(err);
               // console.log("error back from senddata fail");
               return {status:false,data:err};;
       });
   };

   $scope.saveOrder = function() {
      $scope.sendData($scope.order)
      .then(function(res) {
         if (res.status) {
            console.log(res.data);
            console.log("saveOrder succesfull");
            $scope.order = {
               orderNo : null,
               custName : "",
               custPhone : "",               
               oCount : 0,
               oStatus : "factory in",
               oPrice : 0,
               oDiscount : 0,
               oNetAmount : 0,
               articles:[]
            };
            $scope.counter = 0
         }
         if (!res.status) {
            console.log(res.data);
            console.log("saveorder failed");
            return res;
         }
      });
   };

   // $scope.postOrder = $http.post('/api/saveNewOrder', $scope.order);
   //    postOrder.success(function(data, status, headers, config) {
   //       $scope.message = data;
   //    });
   //    postOrder.error(function(data, status, headers, config) {
   //       alert( "failure message: " + JSON.stringify({data: data}));
   //    });
}]);


mainApp.controller('searchInventoryController',['$scope', '$http', function($scope,$http) {

   $scope.order = {};
   $scope.orderFetched = false;
   $scope.editMode = false;
   $scope.cancelEditMode = false;

   $scope.getDataById = function(orderId) {
      console.log("getdatabyid api fun called");
       return $http({
           url: '/api/searchOrder/'+orderId,
       })
       .then(function(response) {
               console.log(response);
               // console.log("response back from getdatabyid succes");
               return {status:true,data:response.data};
       }, 
       function(err) { // optional
               console.log(err);
               console.log("error back from getdatabyid fail");
               return {status:false,data:err};
       });
   };

   $scope.updateOrder = function() {
      var orderUpdate = $scope.order;
      console.log("actual updateOrder api fun called");
       return $http({
           url: '/api/updateOrder',
           method: "POST",
           data: orderUpdate
       })
       .then(function(response) {
               console.log(response);
               // console.log("response back from senddata succes");
               return {status:true,data:response.data};
       }, 
       function(err) { // optional
               console.log(err);
               // console.log("error back from senddata fail");
               return {status:false,data:err};;
       });
   };

   $scope.getOrder = function() {
      console.log("getorderbyid fun called");
      $scope.getDataById($scope.orderid)
      .then(function(res) {
        console.log(res);
            if (res.status) {

            console.log(res.data.orderData);
            console.log("getOrder succesfull");
            $scope.orderOrig = res.data.orderData;
            $scope.order = $scope.orderOrig;
            $scope.orderFetched = true;
            $scope.editMode = false;
            console.log($scope.order);

         }
         if (!res.status) {
            console.log(res);
            console.log("getorder failed");
            return res;
         }
      });
   };

   $scope.saveOrder = function() {
     console.log("saveOrder fun called");
     console.log($scope.order)
      $scope.updateOrder()
      .then(function(res) {
        console.log(res);
            if (res.status) {

            console.log(res.data.orderData);
            console.log("saveOrder succesfull");
            $scope.orderOrig = res.data.orderData;
            $scope.order = $scope.orderOrig;
            $scope.orderFetched = true;
            $scope.editMode = false;
            console.log($scope.order);

         }
         if (!res.status) {
            console.log(res);
            console.log("saveorder failed");
            return res;
         }
      });
   }

   $scope.editorder = function() {
    $scope.editMode = true;
    $scope.orderFetched = false;
   };
   $scope.cancelEditorder = function() {
    $scope.editMode = false;
    // $scope.orderFetched = false;
   };
   // $scope.postOrder = $http.post('/api/saveNewOrder', $scope.order);
   //    postOrder.success(function(data, status, headers, config) {
   //       $scope.message = data;
   //    });
   //    postOrder.error(function(data, status, headers, config) {
   //       alert( "failure message: " + JSON.stringify({data: data}));
   //    });
}]);

mainApp.controller('billingController',['$scope', '$http', function($scope,$http) {
}]);