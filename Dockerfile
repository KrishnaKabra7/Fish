FROM node:24 as build

WORKDIR /src

COPY ./frontend .
RUN npm ci
RUN npm run build
RUN cd dist && ls
RUN tar -czf build.tar.gz dist

FROM python:3.11-slim

WORKDIR /src

COPY ./backend .
COPY --from=build /src/build.tar.gz /src
RUN rm -rf dist
RUN tar -xzf build.tar.gz && rm build.tar.gz

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
