FROM mysql

WORKDIR /database1
ENV MYSQL_ROOT_PASSWORD 1234
ADD database.sql /database1

RUN  mysql -u root -p 1234 testing_db < database.sql > results_file (shell command)
EXPOSE 3306