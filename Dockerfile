FROM openjdk:23-slim

LABEL maintainer="Amir Youssef"
LABEL description="Web Server Task Manager"

#  environment variables
# the working directory path
ENV WEBPATH=/webserver
# which server implementation to use
ENV WEBSERVER=WebServerHttp

# working directory inside container
WORKDIR $WEBPATH

# source files
COPY src/main/java/ .

#  classes directory and compile Java files
RUN mkdir -p classes && \
    javac -d ./classes ./*.java ./task/*.java ./singleton/*.java && \
    rm -rf ./*.java ./task/*.java ./singleton/*.java

#  classpath
ENV CLASSPATH=$WEBPATH/classes

# exposed port
EXPOSE 8000

# run the server
CMD ["java", "WebServerHttp"]