# 생성할 이미지가 openjdk11 이미지를 기반으로 실행된다는 뜻
FROM adoptopenjdk/openjdk11

# Dockerfile 빌드로 생성된 이미지에서 열어줄 포트
EXPOSE 8084

# 가상의 디렉토리
# tmp 밑에 컨테이너가 필요한 여러가지 데이터를 저장
VOLUME /tmp

# 앞의 파일 디렉토리를 뒤에 복사
COPY build/libs/AdventServer-0.0.1-SNAPSHOT.jar AdventServer.jar

# 어떠한 명령어를 가지고 도커를 실행한건지 실행 커맨드
ENTRYPOINT ["java","-jar","AdventServer.jar"]
