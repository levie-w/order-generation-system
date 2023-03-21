#!/usr/bin/env bash

DOCKER_HUB=docker.io
DOCKER_USERNAME=$1
DOCKER_PASSWORD=$2

DATETIME=$(date '+%Y%m%d%H%M%S')

docker login ${DOCKER_HUB} -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}"

DOCKER_PREFIX=levie123/order-generation-system
function dockerize {
  if [[ -n "${3}" ]]
  then
    DOCKER_IMAGE="${DOCKER_PREFIX}-${1}:${DATETIME}"
    docker build --platform linux/amd64 -t ${DOCKER_IMAGE} -f ${2} ${3}
    docker push "${DOCKER_IMAGE}"
  fi
}

dockerize nginx ./Dockerfile .
NGINX_IMAGE="${DOCKER_IMAGE}"
docker rmi -f "${NGINX_IMAGE}"

printf "###################### Docker Image Info ######################\n"
printf "%s\n" "${NGINX_IMAGE}"
printf "###############################################################\n"
