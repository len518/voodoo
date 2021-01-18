# Game Progress API

This API was created to support the synchronization of the players progress, items and in app purchases. 

The project is using Express as the framework, it is uploaded to github and it utilizes ESLint to check for errors and to keep a consistent style, in this case the AirBnB style

### ENDPOINTS

#### Create User Data
with this endpoint we receive the data of a new user, or a user that has not been synchronized before.

``` 
Method: POST
URL: /users/
Payload: 
{
 "playerLevel": 1,
 "selectedHero": "7057ef0d-716d-4c0b-a09c-0ee1286d908f",
 "talentUpgradeCount": 1,
 "lastChapterSelected": "",
 "lastChapterIndex": 2,
 "lastDifficultyIndex": 0,
 "lastEnergyTimestamp": "09/18/2020 13:38:30",
 "lastCommonChestTimeStamp": "09/18/2020 13:30:30",
 "lastRareChestTimeStamp": "09/18/2020 13:30:30",
 "playCount": 3,
 "sessionCount": 1,
 "lastEndlessFloorCompleted": 0,
 "currencies": [
   {
     "id": "energy",
     "quantity": 37
   },
   {
     "id": "key",
     "quantity": 5
   }
 ],
 "talents": [
   {
     "talentId": "extra_bullet",
     "level": 1
   }
 ],
 "heroes": [
   {
     "id": "7057ef0d-716d-4c0b-a09c-0ee1286d908f",
     "heroId": "default",
     "level": 4
   }
 ]
}
```
---

#### Get User By Id
This endpoint is used to retrieve the information of a single user

```
Method: GET
URL: /users/676b79db-46af-4ab4-b0bf-f4d0c3c021aa
```
--- 
#### Update User
This endpoint is used to update the information of a user, this endpoint requires the Id of the user
``` 
Method: PUT
URL: /users/
Payload: 
{
    "playerLevel": 1,
    "selectedHero": "7057ef0d-716d-4c0b-a09c-0ee1286d908f",
    "talentUpgradeCount": 1,
    "lastChapterSelected": "",
    "lastChapterIndex": 2,
    "lastDifficultyIndex": 0,
    "lastEnergyTimestamp": "09/18/2020 13:38:30",
    "lastCommonChestTimeStamp": "09/18/2020 13:30:30",
    "lastRareChestTimeStamp": "09/18/2020 13:30:30",
    "playCount": 3,
    "sessionCount": 1,
    "lastEndlessFloorCompleted": 0,
    "currencies": [
        {
            "id": "energy",
            "quantity": 37
        },
        {
            "id": "key",
            "quantity": 2
        }
    ],
    "talents": [
        {
            "talentId": "extra_bullet",
            "level": 1
        }
    ],
    "heroes": [
        {
            "id": "7057ef0d-716d-4c0b-a09c-0ee1286d908f",
            "heroId": "default",
            "level": 8
        }
    ],
    "id": "676b79db-46af-4ab4-b0bf-f4d0c3c021aa"
    
}
```
---
#### Add IAP
This endpoint is called after the IAP was successfull indicating what currency the user has purchased, it also modifies the date of the user data if this is a new currency it will add it to the user and if it is a currency the user already has, it will increase its value. it only accepts quantities 5,10 or 15
```
Method: POST
URL: /iap/
Payload:
{
    "currency":{
        "id":"coin",
        "quantity": 5
    },
    "userId":"676b79db-46af-4ab4-b0bf-f4d0c3c021aa"
}
```
---
#### Get IAP by Id
With this endpoint we can retrieve a single IAP we need to consult
```
Method: GET
URL: /iap/a1a72988-21dc-4997-a92e-669c39cbf162
```
---
#### Delete IAP
This endpoint deletes a single IAP by Id, and also updates the user currency, it doesn't actually delete the document in the database it marks a deleted flag as true inside the document.
```
METHOD: DELETE
URL: /iap/a1a72988-21dc-4997-a92e-669c39cbf162
```
---
#### Get IAPs by UserId
This endpoint is used to display all IAPs purchased or deleted by the user
```
Method: GET
URL: /iap/user/676b79db-46af-4ab4-b0bf-f4d0c3c021aa
``` 


To run this program you need to clone the repository

execute 
``` npm install ```

There is one dependency for this project which is DynamoDB, to configure this service to use DynamoDB you need to provide the AWS credentials via environment variables

```
$ export AWS_SECRET_ACCESS_KEY="[MY_SECRET_ACCESS_KEY]"
$ export AWS_ACCESS_KEY_ID="[MY_ACCESS_KEY_ID]"
$ export AWS_REGION="us-east-1" 
```

you can run DynamoDb locally with docker with the following docker-compose.yml file
```
version: '3.7'
services:
 dynamodb-local:
   image: amazon/dynamodb-local:latest
   container_name: dynamodb-local
   ports:
    - "8000:8000"
```
this is intended only for development and you will still need to provide valid AWS credentials