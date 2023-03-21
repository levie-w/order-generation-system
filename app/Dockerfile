FROM levie123/ubuntu18.04-openjdk8:v1.0

WORKDIR /ogs/program/bootapp
ADD setenv.sh setenv.sh
ADD build/libs/app.jar app.jar

EXPOSE 8080

CMD ["/bin/bash", "-c", "mkdir -p -m 755 /ogs/logs/bootapp /ogs/logs/bootapp/gc && source setenv.sh && exec java $JAVA_OPTS -jar app.jar >> /ogs/logs/bootapp/app.log 2>&1"]
