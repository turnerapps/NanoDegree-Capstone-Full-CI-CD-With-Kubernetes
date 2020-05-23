#!/usr/bin/env bash
dockerpath=turnertechappdeveloper/capstone-rest
docker tag $(docker images --filter=reference='prediction:latest' --format "{{.ID}}") $dockerpath
docker push $dockerpath