var mainApp = angular.module("mainApp", []);

mainApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});         
mainApp.controller('inventoryController',['$scope', '$http', function($scope,$http) {
  $scope.ArticleNames = [
{name:"Gents suit 2 pcs",
price:[280,350]},
{name:"Gents suit 3 pcs",
price:[350,400]},
{name:"Gents suit 2 pcs (cr & wh)",
price:[300,350]},
{name:"Gents suit 3 pcs (cr & wh)",
price:[350,400]},
{name:"Gents Coat",
price:[180,220]},
{name:"Coat Belvet",
price:[200,250]},
{name:"Over Coat",
price:[200,250]},
{name:"Safari Suit",
price:[200,225]},
{name:"JAcket",
price:[180,200]},
{name:"Jacket Leather",
price:[500,700,1000]},
{name:"Bandy",
price:[150]},
{name:"Jacket Half",
price:[150,170]},
{name:"Gown/Nighty",
price:[150,200,300]},
{name:"Sweat Shirt",
price:[150]},
{name:"Shirt",
price:[80,100,120]},
{name:"T-Shirt",
price:[70]},
{name:"Pant",
price:[90,100,120]},
{name:"Ladies Suit 2 Pcs",
price:[150,200]},
{name:"Ladies Suit 3 pcs",
price:[180,350]},
{name:"Ladies Suit Anarkali",
price:[250,500]},
{name:"Ladies Kurta/Top",
price:[90,120]},
{name:"Dupatta",
price:[50,80]},
{name:"Dress",
price:[180,200]},
{name:"Gents Kurta & Payajama",
price:[160,190,250]},
{name:"Sherwani",
price:[350,500]},
{name:"Saree Cotton",
price:[130,150,170]},
{name:"Saree Silk",
price:[180,200]},
{name:"Saree Work",
price:[250,300,500]},
{name:"Blouse",
price:[50,100]},
{name:"Shawl",
price:[150,200]},
{name:"Shawl Paschimina",
price:[300,500]},
{name:"Stole/Scarf",
price:[120,150]},
{name:"Sweater Half",
price:[120,150]},
{name:"Sweater Full",
price:[140,180]},
{name:"Tie",
price:[50]},
{name:"Frock",
price:[150,200,250]},
{name:"Lehenga, Choli, Dupatta",
price:[500,800]},
{name:"Lehenga, Choli, dupatta (Heavy)",
price:[1000,3000]},
{name:"Blanket/Quilt Double (S.L.)",
price:[350,400]},
{name:"Blanket/Quilt Single (S.L.)",
price:[300,350]},
{name:"Blanket/Quilt Double A.C",
price:[200,250]},
{name:"Curtain Window (per panel)",
price:[150,160]},
{name:"Curtain Door (per panel)",
price:[180,200]},
{name:"Curtain High End (per panel)",
price:[200,250]},
{name:"Bedsheet Single",
price:[120,150,180]},
{name:"Bedsheet Double",
price:[180,200,250]},
{name:"Quilt Cover",
price:[180,200,250]},
{name:"Car Seat Cover cotton",
price:[400]},
{name:"Car Seat Cover Blanket",
price:[600]},
{name:"Car Seat Cover Leather",
price:[900]},
{name:"Stuff Toy",
price:[200,400,600]},
{name:"Sofa Cotton",
price:[350]},
{name:"Sofa Leather",
price:[450]},
{name:"Car DryCleaning 5 seater",
price:[1050]},
{name:"Cra DryCleaning 7 seater",
price:[1600]},
{name:"Carpet",
price:[40]},
{name:"Short",
price:[70]},
{name:"Shoes",
price:[250]},
{name:"Towel",
price:[40,70]},
{name:"Cushion Cover",
price:[80]},
{name:"Pillow",
price:[150]},
{name:"Pillow Cover",
price:[50]},
{name:"Travel Bags",
price:[400,600]},
{name:"Ladies Purse ",
price:[250,400]}
]

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
   $scope.selectedtype = null;
   $scope.selectedrate = null;

   // console.log($scope.order);

   $scope.curArticle = {
         aid:$scope.counter+1,
         acolour:"",
         atype:null,
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
         atype:null,
         arate:null,
         agender:"male",
         astatus:"factory in"
      };
      $scope.selectedtype = null;
      $scope.selectedrate = null;
      // console.log($scope.order);
   };
   $scope.ratelist = function() {
    console.log($scope.selectedtype);
    $scope.selectedarticle = $scope.selectedtype;
    $scope.curArticle.atype = $scope.selectedtype.name;
   };

   $scope.updaterate = function(selectedrate) {
    console.log(selectedrate);
    $scope.curArticle.arate = selectedrate;
   }

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
               // console.log("errorb ack from senddata fail");
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
            $scope.curArticle.aid=1;
            $scope.selectedtype = null;
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