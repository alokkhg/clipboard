## Description
This is related to providing the backend apis for summary stastistics for salaried employees.

## How to run the application

```
docker-compose up 

```

localhost:8080 is the server where apis are defined. For the list of apis and listing please open the swagger at localhost:8080:api

# to rebuild the application
docker-compose up --build

## How to test the application

Go to localhost:8080/api route to launch swagger. Its implemented in such a way that you can manually test all the apis.


# Running unit test 
To run the unit test run yarn test 
To test individual service or controller run yarn test <module_name>.controller 
example

```
yarn test auth.service

