FROM mysql

WORKDIR /db1
ENV MYSQL_ROOT_PASSWORD 1234
COPY ./challenge_1.sql /docker-entrypoint-initdb.d/

EXPOSE 3306