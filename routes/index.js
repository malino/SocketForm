 var check = require('validator').check
  , sanitize = require('validator').sanitize
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};