'use strict';

var util = require('util');
var logger = require('logentries-logformat')('suite-sdk');

var Base = require('../_base');

var Email = function(request, options) {
  Base.call(this, options);
  this._request = request;
};

util.inherits(Email, Base);

Email.prototype.copy = function(payload, options) {
  logger.log('email_copy');

  var emailId = payload.emailId;

  return this._request.post(
    this._getCustomerId(options),
    util.format('/email/%s/copy', emailId),
    this._cleanPayload(payload, ['emailId'])
  );
};

Email.prototype.updateSource = function(payload, options) {
  logger.log('email_update_source');

  var emailId = payload.emailId;

  return this._request.post(
    this._getCustomerId(options),
    util.format('/email/%s/updatesource', emailId),
    this._cleanPayload(payload, ['emailId'])
  );
};

Email.prototype.list = function(options) {
  logger.log('email_list');
  return this._request.get(this._getCustomerId(options), '/email');
};

Email.prototype.launch = function(payload, options) {
  logger.log('email_launch');

  var emailId = payload.emailId;

  return this._request.post(
    this._getCustomerId(options),
    util.format('/email/%s/launch', emailId),
    this._cleanPayload(payload, ['emailId'])
  );
};

Email.create = function(request, options) {
  return new Email(request, options);
};

module.exports = Email;
