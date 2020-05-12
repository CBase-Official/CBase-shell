#!/bin/bash
set -ex
rm  -rf tmp-project

yarn create near-app --vanilla tmp-project

cd tmp-project

timestamp=$(date +%s)
testaccount=testaccount$timestamp
../bin/cbase create_account $testaccount

echo Building contract
yarn install
yarn build

echo Deploying contract
../bin/cbase deploy --accountId=$testaccount --wasmFile=out/main.wasm

echo Deploying contract to temporary accountId
# TODO: Specify helperUrl in project template
../bin/cbase dev-deploy

echo Calling functions
../bin/cbase call $testaccount setGreeting '{"message":"TEST"}' --accountId=test.cbase

RESULT=$(../bin/cbase view $testaccount welcome '{"account_id":"test.cbase"}' --accountId=test.cbase)
TEXT=$RESULT
EXPECTED='TEST test.cbase'
if [[ ! $TEXT =~ .*$EXPECTED.* ]]; then
    echo FAILURE Unexpected output from cbase call: $RESULT
    exit 1
fi