# Understanding Kubernetes Pods

A Pod is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers.

## Why Pods?

Containers in a Pod share an IP address and port space, and can find each other via `localhost`. They can also communicate with each other using standard inter-process communications like SystemV semaphores or POSIX shared memory.

## Lifecycle

Pods are ephemeral. They are not designed to run forever. When a Pod dies, it is gone. A Controller (like a Deployment) is responsible for creating new Pods to replace the ones that failed.
