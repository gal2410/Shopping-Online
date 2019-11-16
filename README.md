### Shopping-Online MEAN - MongoDB, Express, Angular, and Node.js.

 user// register and login, search and add product to cart, saving a cart and make an order.
 
 admin// can add or edit a product. 
 
## Installation
To install client-side dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```
Also, to install all server-side dependencies, run this in the application folder from the command-line:

```bash
$ cd server && npm install
```

### Client server

Run `ng serve` for a dev server. 

### Backend server

Run `cd server && npm start or npx nodemon` for a backend server. 


Once you've installed all the prerequisites and all the dependencies, you must have the shopping online app running successfully in on your machine. 
But to get started we must seed some data in our MongoDB database. For seeding data just run the following commands:
```sh
$ cd server/seed
server/seed$ node seeder.js
```
The file `seeder.js` contains the code which seeds up to the MongoDB database with the help of ODM mongoose.

 
For administrator permission go to -Shopping_Online_.User collection Change to one user"role" from '1'to'0'. 
