#!/bin/bash

npm run build

aws s3 cp ./build s3://resume-from-vue-for-cloudformation/ --recursive