#!/usr/bin/env bash

#MacOS 에서 node 가 정상적으로 종료되지 않은 경우 해당 프로세스를 찾아서 종료

PID=`lsof -i :9060 | grep node | awk '{print $2}' | head -1`

if [ -z "${PID}" ]
then
      echo "There was no PID to be killed."
else
      kill -9 ${PID}
      echo ${PID} "was found and killed."
fi

PID_MOCK=`lsof -i :8090 | grep node | awk '{print $2}' | head -1`

if [ -z "${PID_MOCK}" ]
then
      echo "There was no PID to be killed."
else
      kill -9 ${PID_MOCK}
      echo ${PID_MOCK} "was found and killed."
fi


yarn start

