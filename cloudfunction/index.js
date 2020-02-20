// Copyright 2017 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict';

const {promisify} = require('util');
const redis = require('redis');

const express = require('express');
const router = express.Router()

const REDISHOST = process.env.REDISHOST || 'localhost';
const REDISPORT = process.env.REDISPORT || 6379;

const redisClient = redis.createClient(REDISPORT, REDISHOST);
redisClient.on('error', err => console.error('ERR:REDIS:', err));

const incrAsync = promisify(redisClient.incr).bind(redisClient);
const existsAsync = promisify(redisClient.exists).bind(redisClient);

router.get('/:id', async function (req, res) {
    var id = req.params.id
    var exists = await existsAsync(id)
    res.send('', exists == 1 ? 204 : 404)
})

router.put('/:id', async function (req, res) {
    var id = req.params.id
    var result = await incrAsync(id)
    res.send('', result > 1 ? 204 : 201)
})

exports.flag = router