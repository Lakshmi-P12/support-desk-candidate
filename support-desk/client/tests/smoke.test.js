import test from 'node:test';
import assert from 'node:assert/strict';
import {clampPage} from '../src/pagination.js';
test('page clamp boundaries',()=>{assert.equal(clampPage(4,2),2);assert.equal(clampPage(0,3),1)});
