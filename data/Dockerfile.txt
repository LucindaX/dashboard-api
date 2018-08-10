FROM postgres:9.6

LABEL maintainer "Jobbatical"

ENV POSTGRES_DB assignment

COPY structure.sql /docker-entrypoint-initdb.d/01-structure.sql
COPY data.sql /docker-entrypoint-initdb.d/02-data.sql
