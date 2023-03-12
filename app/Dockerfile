FROM levie123/ubuntu18.04-openjdk8:v1.0

WORKDIR /app
ADD build/libs/app.jar app.jar

EXPOSE 8080

CMD ["/bin/bash", "-c", "exec java -jar app.jar --spring.profiles.active=production"]