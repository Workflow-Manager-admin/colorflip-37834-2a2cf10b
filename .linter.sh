#!/bin/bash
cd /home/kavia/workspace/code-generation/colorflip-37834-2a2cf10b/colorflip
./gradlew lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
   exit 1
fi

