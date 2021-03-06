var express = require('express');
var router = express.Router();

var util = require('./util');

var segments = require('./segment');
var loopexecutions = require('./loopexecution');

var mapping = {
  'Id': 'id',
  'Process': 'process',
  'Thread': 'thread',
  'Function': 'function',
  'Instruction': 'instruction',
  'Start': 'start',
  'End': 'end',
  'Caller': 'caller',
  'CallsOthers': 'callsOthers',
  'Duration': 'duration',
  'CallGroup': 'callGroup',
  'LoopCount': 'loopCount'
};

router.get('/', function(req, res) {
  util.handleAllQuery(req.db, mapping, res, 'SELECT * FROM Call');
});

router.get('/many/:ids/segments', function(req, res) {
  util.handleManyQuery(req.db, segments.mapping, res, req.params.ids,
    'Segment WHERE Call');
});

router.get('/many/:ids/calls', function(req, res) {
  util.handleManyQuery(req.db, mapping, res, req.params.ids,
    'Call WHERE Caller');
});

router.get('/many/:ids/loopexecutions', function(req, res) {
  util.handleManyQuery(req.db, loopexecutions.mapping, res, req.params.ids,
    'LoopExecution WHERE Call');
});

router.get('/many/:ids', function(req, res) {
  util.handleManyQuery(req.db, mapping, res, req.params.ids,
    'Call WHERE Id');
});

router.get('/:id/segments', function(req, res) {
  util.handleRelationshipQuery(req.db, segments.mapping, res,
    'SELECT * FROM Segment WHERE Call=?', req.params.id);
});

router.get('/:id/calls', function(req, res) {
  util.handleRelationshipQuery(req.db, mapping, res,
    'SELECT * FROM Call WHERE Caller=?', req.params.id);
});

router.get('/:id/loopexecutions', function(req, res) {
  util.handleRelationshipQuery(req.db, loopexecutions.mapping, res,
    'SELECT * FROM LoopExecution WHERE Call=?', req.params.id);
});

router.get('/:id', function(req, res) {
  util.handleOneQuery(req.db, mapping, res,
    'SELECT * FROM Call WHERE Id=?', req.params.id);
});

module.exports = {
  router: router,
  mapping: mapping
};
