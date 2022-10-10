# <p align = "center"> Supermercash - back </p>

<p align="center" style="background-color: white">
   <img src="https://uploaddeimagens.com.br/images/004/056/154/full/Logo.png?1665418882"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Mateus Gueler-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/MatGueler/supermercash-back?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

The **supermercash** project is based on the problem where a user has several markets close to his residence, and is left with the doubt of which of the markets his **shopping list** would be cheaper?

The application proposes that the user assembles his shopping list with the desired items, then the prices of his purchase will be presented in each of the markets, available in order, so that the user can easily choose the best **cost- benefit**.

In addition to observing the best value for the purchase, the user can make the purchase through the application itself, using information from the **user card**.

---

## :computer: Technologies and Concepts

- JWTs & refresh tokens
- Layered Architecture
- Integration testing
- Node.js (v16.17.0)
- Unitary testing
- TypeScript
- Prisma
- Heroku
- Jest
- SQL

---

## :rocket: Routes

- User

```yml
POST /sign-up
    - Route to register a new user
    - headers: {}
    - body: {
        name: "User Name",
        email: "user@email.com",
        password: "123456",
        confirmPassword: "123456"
    }
```

```yml
POST /sign-in
    - Route to login user
    - headers: {}
    - body: {
        email: "user@rmail.com",
        password: "123456"
    }
```

```yml
GET /user/me (Autenticada)
    - Route to get all user infos
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
PUT /user/me (Autenticada)
    - Route to update user infos
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        name: "User Name",
        email: "user@email.com",
        adress: "User adress",
        phone: "21989885656";
    }
```

```yml
PUT /user/me/image (Autenticada)
    - Route to update user image
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        userImage: "https://example.com"
    }
```

- Products

```yml
GET /products/historic (Autenticada)
    - Route to get quantities of products already purchased
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /products (Autenticada)
    - Route to add a product on user cart
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        name: "Product name"
    }
```

```yml
GET /products
    - Route to get all products
    - headers: {}
    - body: {}
```

```yml
GET /product/:id
    - Route to get only product by product id
    - headers: {}
    - body: {}
```

```yml
GET /products/:product
    - Route to get only product by product name
    - headers: {}
    - body: {}
```

```yml
DELETE /products/delete (Autenticada)
    - Route to delete all products in user cart
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /products/delete/:product (Autenticada)
    - Route delete only one product in user cart
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        name: "Product name"
    }
```

```yml
GET /products/quantify/:product (Autenticada)
    - Route to get a recommendation by id in route
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

- Cart

```yml
GET /cart (Autenticada)
    - Route to get user cart value
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /cart/products (Autenticada)
    - Route to get a quantity of products in cart
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

- Payment

```yml
POST /payment (Autenticada)
    - Route to get a quantity of products in cart
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        cardHolder: "Card holder name",
        cardNumber: "1234567812345678",
        CVC: 123,
        password: "123456",
        purchaseValue: 200,
        quantifyProducts: 10,
    }
```

---

## 🏁 Running the application

- Deploy

The project is already available with deploy on [Heroku](https://devcenter.heroku.com/categories/reference) with the url presented below:

https://supercash-deploy.herokuapp.com

- Local

The project has some essential dependencies that require the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/). So make sure your version running locally is compatible.

First, clone this repository on your machine:

```
git clone https://github.com/MatGueler/projeto21-singmeasong-back-end.git
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server

```
npm run dev
```

---

## :hammer: Testing the application

The tests were carried out on the front-end and abck end of this project. Addressing unit testing, integration testing.

### **Back-end**

The JEST test framework was used as a back-end test framework, for that, run the command below to initialize the database for testing and start the automatic tests. The commands are for unit testing and integration testing.

#### Unity

```
npm test:unit
```

#### Integration

```
npm test:unit
```
