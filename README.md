# API

## Start

Make sure that you have last version of [Node js](https://nodejs.org/en//) and [npm](https://www.npmjs.com/). Thеn run

> !!! add .env file with `PORT` `MONGODB_URI` and `SECRET_TOKEN` variables for example

```
MONGODB_URI = mongodb://localhost:27017/men
PORT = 3001
SECRET_TOKEN = W3 Hav3 th3 kn0w h0w

```

and then:

```
npm i && npm run dev

```

### Lint

```
npm run lint
```

## API docs

### Auth

**POST** `/api/v1/auth/sign-in` - **Sign In**

```
@params
       email {string}
       password {string}
```

**POST** `/api/v1/auth/sign-up` - **Sign Un**

```
 @params
       email {string}
       password {string}
```

**POST** /api/v1/auth/sign-out - **Sign Out**

```
 @header
        Authorization: Bearer {token}
```

**PUT** `/api/v1/auth/change-password` - **Change Password**

```
 @header
       Authorization: Bearer {token}
 @params
       newPassword {string}
       password {string}
```

### User

**PUT** `/api/v1/users/my` - **Update** User details

```
 @header
        Authorization: Bearer {token}
 @params
       email {string}
```

### Cars

**GET** `/api/v1/cars/` - **List**

```
@header
     Authorization: Bearer {token}
```

**GET** `/api/v1/cars/:_id` - **Get single**

```
@header
       Authorization: Bearer {token}
```

**POST** `/api/v1/cars/` - **Create**

```
@header
     Authorization: Bearer {token}
@param
      model (require) - {string}
      manufacture (require) - {string}
      connectors (require) - [string] - 'Type2' || 'CCS'
      batteryCapacity (require) - {number}
      transform (require) - {string}
```

**PUT** `/api/v1/cars/:_id` - **Update**

```
@header
       Authorization: Bearer {token}
@param
      model - {string}
      manufacture - {string}
      connectors - [string] - 'Type2' || 'CCS'
      batteryCapacity - {number}
      transform - {string}
```

**DELETE** `/api/v1/cars/:_id` - **Remove**

```
@header
       Authorization: Bearer {token}
```
