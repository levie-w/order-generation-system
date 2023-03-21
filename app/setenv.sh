#!/usr/bin/env bash

export JAVA_OPTS="$JAVA_OPTS \
                -server \
                -Dspring.profiles.active=${SPRING_PROFILE} \
                ${JVM_MEMORY}"

#APP_LOG_PATH=/ogs/logs/bootapp
#export JAVA_OPTS="$JAVA_OPTS \
#                -server \
#                -Dspring.profiles.active=${SPRING_PROFILE} \
#                ${JVM_MEMORY} \
#                -Dcom.sun.management.jmxremote \
#                -Dcom.sun.management.jmxremote.port=11619 \
#                -Dcom.sun.management.jmxremote.ssl=false \
#                -Dcom.sun.management.jmxremote.authenticate=false \
#                -Djava.rmi.server.hostname=${HOST_IP} \
#                -Dcom.sun.management.jmxremote.rmi.port=11619 \
#                -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:G1HeapRegionSize=8m -XX:+ParallelRefProcEnabled -XX:-ResizePLAB \
#                -verbose:gc -Xloggc:${APP_LOG_PATH}/gc/gc.$(date '+%Y%m%d%H%M').log -XX:+PrintGCDetails -XX:+PrintGCDateStamps \
#                -XX:+PrintClassHistogramAfterFullGC -XX:+PrintClassHistogramBeforeFullGC \
#                -XX:+HeapDumpOnOut0fMemoryError -XX:HeapDumpPath=${APP_LOG_PATH}/gc/heapdump_$(date '+%Y%m%d%H%M').hprof"
