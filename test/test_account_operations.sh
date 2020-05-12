#!/bin/bash
set -ex
rm  -rf tmp-project
yarn create near-app --vanilla tmp-project
cd tmp-project
timestamp=$(date +%s)
testaccount=testaccount$timestamp
echo Create account
../bin/cbase create_account $testaccount

echo Get account state
RESULT=$(../bin/cbase state $testaccount | strip-ansi)
echo $RESULT
EXPECTED=".+Account $testaccount.+amount:.+'100000000000000000000000000'.+ "
if [[ ! "$RESULT" =~ $EXPECTED ]]; then
    echo FAILURE Unexpected output from cbase view
    exit 1
fi

../bin/cbase delete $testaccount test.cbase
