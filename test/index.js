const should = require('should');
const {reap} = require('../dist/safereaper');

describe('verification', function() {

    describe('obj is empty', function() {
        it('without default value', function() {
            should(reap(null, 'name')).be.Null();
        });

        it('without default value', function() {
            should(reap(undefined, 'name')).be.Null();
        });

        it('with default value', function() {
            should(reap(null, 'name', 'hello')).be.exactly('hello');
        });

        it('with default value', function() {
            should(reap(undefined, 'name', 'world')).be.exactly('world');
        });

        it('with default value is undefined', function() {
            should(reap(undefined, 'name', undefined)).be.Null();
        });
    });

    describe('path is empty', function() {
        it('null', function() {
            should(function() {
                reap({}, null, 'name');
            }).throw('[path] must not be null/undefined');
        });

        it('undefined', function() {
            should(function() {
                reap({}, undefined, 'name');
            }).throw('[path] must not be null/undefined');
        });
    });

    describe('path is not empty, but invalid', function() {
        it('ends with .', function() {
            should(function() {
                reap({}, '.');
            }).throw('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');
        });

        it('half-baked [/]', function() {
            should(function() {
                reap({}, 'name[');
            }).throw('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');

            should(function() {
                reap({}, 'name]');
            }).throw('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');
        });

        it('misplaced [/]', function() {
            should(function() {
                reap({}, 'na[0]me');
            }).throw('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');

            should(function() {
                reap({}, '["na"]me');
            }).throw('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');

        });
    });

    describe('path is not empty, and valid', function() {
        it('just dot notation property', function() {
            const obj = {
                name: 'hello'
            };

            should(reap(obj, 'name')).be.exactly('hello');
            should(reap(obj, 'age')).be.Null();
        });

        it('just bracket notation property, string index', function() {
            const obj = {
                name: 'hello'
            };
            should(reap(obj, '["name"]')).be.exactly('hello');
            should(reap(obj, '["age"]')).be.Null();
        });

        it('just bracket notation property, string index', function() {
            const users = [{
                name: 'LiLei'
            }];
            should(reap(['hello', 'world'], '[1]')).be.exactly('world');
            should(reap(['hello', 'world'], '[2]')).be.Null();
            should(reap(users, '[0].name')).be.exactly('LiLei');
        });

        it('dot/bracket mix', function() {
            const obj = {
                user: {
                    friends: [{
                        name: 'LiLei'
                    }]
                }
            };
            should(reap(obj, 'user.friends[0].name')).be.exactly('LiLei');
            should(reap(obj, '["user"]["friends"][0].name')).be.exactly('LiLei');
            should(reap(obj, '["user"]["friends"][0]["name"]')).be.exactly('LiLei');
            should(reap(obj, '["user"]["friends"]["0"]["name"]')).be.exactly('LiLei');
            should(reap(obj, '["user"]["fri" + "ends"][0]["name"]')).be.exactly('LiLei');
            should(reap(obj, '["user"].friends[0]["name"]')).be.exactly('LiLei');
            should(reap(obj, '["user"].friends[0]["age"]')).be.Null();
            should(reap(obj, '["user"].friends[0]["age"]', 99)).be.exactly(99);
        });
    });

});
