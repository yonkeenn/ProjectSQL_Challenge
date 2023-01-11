FROM msql:3.5
COPY . .
RUN mysql -d todo
