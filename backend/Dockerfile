FROM maven:3.9.9-eclipse-temurin-22-alpine AS builder

COPY ./src src/
COPY ./pom.xml pom.xml

RUN mvn clean package -DskipTests

FROM eclipse-temurin:22-jre-alpine
COPY --from=builder target/RecruitmentSystem-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java","-jar","app.jar"]
