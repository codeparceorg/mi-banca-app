#!/bin/bash
set -e

set -a && source .env.kube && set +a

envsubst < 1_namespace.template > 1_namespace.yaml
envsubst < svc.template > svc.yaml
envsubst < deployment.template > deployment.yaml
envsubst < ingress.template > ingress.yaml

kubectl apply -f ./