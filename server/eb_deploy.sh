#!/bin/sh

git archive --format=zip HEAD > kitu-dev.zip

zip kitu-dev.zip -g dist/*

eb deploy
