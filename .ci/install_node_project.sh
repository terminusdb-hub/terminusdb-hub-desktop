#!/bin/bash

GIT_URL=$1
PROJECT_BRANCH=$2
PROJECT_NAME=$3

PROJECT_DIR=$(cwd)

git clone "$PROJECT_GIT" --branch "$PROJECT_BRANCH" --single-branch "$PROJECT_NAME"
cd "$PROJECT_NAME"
npm i && npm run build
npm link
cd "$PROJECT_DIR"
npm link "$PROJECT_NAME"
