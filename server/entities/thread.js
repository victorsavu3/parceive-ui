var express = require('express');
var router = express.Router();

var util = require('./util');

var calls = require('./call');

var mapping = {
  'ID': 'id',
  'INSTRUCTION_ID': 'instruction',
  'PARENT_THREAD_ID': 'parent',
  'CHILD_THREAD_ID': 'child'
};

router.get('/', function(req, res) {
  util.handleAllQuery(req.db, mapping, res, 'SELECT * FROM Thread');
});

router.get('/many/:ids/calls', function(req, res) {
  util.handleManyQuery(req.db, calls.mapping, res, req.params.ids,
    'Call WHERE Thread');
});

router.get('/many/:ids', function(req, res) {
  util.handleManyQuery(req.db, mapping, res, req.params.ids,
    'Thread WHERE Id');
});

router.get('/:id', function(req, res) {
  util.handleOneQuery(req.db, mapping, res,
    'SELECT * FROM Thread WHERE Id=?', req.params.id);
});

router.get('/:id/calls', function(req, res) {
  util.handleRelationshipQuery(req.db, calls.mapping, res,
    'SELECT * FROM Call WHERE Thread=?', req.params.id);
});

module.exports = {
  router: router,
  mapping: mapping
};
