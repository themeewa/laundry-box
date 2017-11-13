var express = require('express');
var router = express.Router();
var User  = require('../models/user');
var Customer  = require('../models/customer');
var Order  = require('../models/order');

router.post('/saveNewOrder',isLoggedInApi,function(req, res, next) {
  console.log(req.body);
  if (req.body) {
    var order = new Order({
      orderNo:req.body.orderNo,
      ocount:req.body.oCount,
      ostatus:req.body.oStatus,
      articles:req.body.articles,
      odatein:null,
      odateout:null,
      custname:req.body.custName,
      custphone:req.body.custPhone,
      oprice:req.body.oPrice,
      odiscount:req.body.oDiscount,
      onetamount:req.body.oNetAmount,
      opaid:false
    });
    console.log("data object created");
    return order.save(function(err,result) {
      if(err){
        console.log("error in saving order");
        console.log(err);
        res.status(404).json({
          status:false,
          message:"failed",
          err:err
        });
      }
      else
        res.status(201).json({
          status:true,
          message:"saved ",
          savedOrderId:order.orderNo
        });
      saveNewCustomer({custPhone:order.custphone,custName:order.custname});
    });
  }
});


router.get('/searchOrder/:orderid',isLoggedInApi,function(req, res, next) {
  if(!req.params.orderid){
    res.end();
  }
  else {
    return Order.findOne({orderNo:req.params.orderid}, function(err, order){
     // console.log('order.findone called');
     if (err) {
       console.log('error from findone: '+err);
       res.status(404).json({
        status:false,
        message:"error",
        err:err
      });
     }
     if (!order) {
       console.log('no such order');
       res.status(200).json({
        status:false,
        message:"order not found"
      });
     }
     if (order) {
      console.log("order found"+order);
      res.status(200).json({
        status:true,
        message:"order found",
        orderData:order
      });
    }
   });
  }
});

router.post('/updateOrder',isLoggedInApi,function(req, res, next) {
  if(!req.body){
    res.end();
  }
  else if (req.body.orderNo){
    var order = new Order({
      orderNo:req.body.orderNo,
      ocount:req.body.oCount,
      ostatus:req.body.oStatus,
      articles:req.body.articles,
      odateout:req.body.oDateOut,
      custname:req.body.custname,
      custphone:req.body.custphone,
      oprice:req.body.oPrice,
      odiscount:req.body.oDiscount,
      onetamount:req.body.oNetAmount,
      opaid:req.body.oPaid,
      _id:req.body._id
    });
    console.log(order);
    return Order.findOneAndUpdate({orderNo:req.body.orderNo},order,{new:true}, function(err, order){
     console.log('order.findoneandupdate called');
     if (err) {
       console.log('error from findoneandupdate: '+err);
       res.status(404).json({
        status:false,
        message:"error",
        err:err
      });
     }
     if (!order) {
       console.log('no such order');
       res.status(200).json({
        status:false,
        message:"order not found"
      });
     }
     if (order) {
      console.log("order found");
      saveNewCustomer({custPhone:order.custphone,custName:order.custname});
      console.log("moved past custfun");
      res.status(200).json({
        status:true,
        message:"order found",
        orderData:order
      });
    }
   });
  }
});

// router.get('/getBill/:orderid',isLoggedInApi,function(req, res, next) {
//   if(!req.params.orderid){
//     res.end();
//   }
//   else {
//     return Order.findOne({orderNo:req.params.orderid}, function(err, order){
//      // console.log('order.findone called');
//      if (err) {
//        console.log('error from findone: '+err);
//        res.status(404).json({
//         status:false,
//         message:"error",
//         err:err
//       });
//      }
//      if (!order) {
//        console.log('no such order');
//        res.status(200).json({
//         status:false,
//         message:"order not found"
//       });
//      }
//      if (order) {
//       console.log("order found"+order);

//       var bill = {
//         orderNo:order.orderNo,
//         billNo:order.orderNo,
//         custName:order.custname,
//         custPhone:order.custphone,
//         orderDate:order.odatein,
//         billingDate:Date.now,
//         items:{
//           itemName:null,
//           qty:null,
//           rate:null,
//           discount:null,
//           amount:null
//         },
//         amount:null,
//         cgst:null,
//         sgst:null,
//         netAmount:null
//       };

//       res.status(200).json({
//         status:true,
//         message:"order found",
//         orderData:order
//       });
//     }
//    });
//   }
// });

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
};

function isLoggedInApi(req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(404).json({
        status:false,
        message:"loggedOut"
      });
};

function saveNewCustomer(cust) {
  return Customer.findOneAndUpdate({custPhone:cust.custPhone},{custPhone:cust.custPhone,custName:cust.custName},{upsert:true}, function(err, cust){
     console.log('cust.savefind called');
     if (err) {
       console.log('error from custfind: '+err);
     }
     if (!cust) {
       console.log('new customer');
     }
     if (cust) {
      console.log("cust exist");
    }
   });
}

module.exports = router;

// 
// router.post('/testpost',isLoggedIn,function(req, res, next) {
//   console.log(req.body);
//   res.send('200')
// });

// router.get('/testget/:orderid',isLoggedIn,function(req, res, next) {
//   console.log(req.params.orderid);
//   res.send('200')
// });
// function saveOrder(order) {
//    var newOrder = new Order();
//    newOrder.orderNo = order.orderNo;
//    newOrder.ocount = order.articles.length;
//    newOrder.ostatus = order.ostatus;
//    newOrder.articles = order.articles;
//    // newOrder.odatein = order.odatein;
//    newOrder.odateout = order.odateout;
//    newOrder.custname = order.custname;
//    newOrder.custphone = order.custphone;
//    newOrder.oprice = order.oprice;
//    newOrder.odiscount = order.odiscount;
//    newOrder.onetamount = order.onetamount;
//    newOrder.opaid = order.opaid;

//    newOrder.save(function(err,result) {
//      console.log('newuser from config called,creating new user')
//      if (err) {
//        return done(err);
//      }
//      return done(null, newOrder);
//    });
// };


// findOrderById = function (orderId) {
//  console.log('findOrderById accessed for order');
//  Order.findOne({'orderNo':orderId}, function(err, order){
//    console.log('order.findone called');
//    if (err) {
//      console.log('error from findone: '+err);
//      return err;
//    }
//    if (!order) {
//      console.log('order from findone: '+order)
//      return false;
//    }
//    return order;
//  });
// };


// calcAmount = function (order) {
//  console.log('calcAmount accessed for order');
//  Order.findOne({'orderNo':order.orderNo}, function(err, order){
//    console.log('order.findone called');
//    if (err) {
//      console.log('error from findone: '+err);
//      return err;
//    }
//    if (!order) {
//      console.log('order from findone: '+order)
//      return false;
//    }

//    amount = 0;
//    art = order.articles;

//    for (var i = articles.length - 1; i >= 0; i--) {
//      amount = amount + (articles[i].rate - ((articles[i].rate*articles[i].adiscount)/100))
//    }

//    return amount;
//  });
// };
