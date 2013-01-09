#!/bin/bash

DIR=${0%/*}

echo "Running build for iOS"

echo "Moving htmlcss..." && \
cp -R $DIR/../../content/public/ $DIR/../www && \
echo "Done moving htmlcss."