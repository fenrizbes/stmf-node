angular.module('stmtr', []).config(function($interpolateProvider){
  $interpolateProvider
    .startSymbol('{[{')
    .endSymbol('}]}')
  ;
});
