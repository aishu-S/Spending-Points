A web-service that accepts http requests and returns the response based on the following,

Each transaction records contains: payer (string), points (integer), and timestamp (date). For earning points it is easy to assign a payer, we know which actions earned the points. And thus which partner should be paying for the points. When a user spends points, they don't know or care which payer the points come from. But, the accounting team does care how the points are spent. There are two rules for determining what points to "spend" first:

 - We want the oldest points to be spent first (oldest based on
   transaction timestamp, not the order they’re received)
 - We want no payer's points to go negative.

# Files

**index.js** - This is the main file that needs to be executed first. All other files are accessed through this file.
**routes.js** - This file is used to perform tasks based on the routes specified in the http request.
**utils.js** - This file contains all the helper functions.
**dataService.js** - This file stores all the necessary data required for a session.
**utils.test.js** - This is the test file that contains possible test cases.
**package.json** 

# Dependencies
   - express
   - jest(Developer Dependencies)

# Routes
   - `/transactions ` : Add a transaction to the system
   ***
   `Request Type`: `POST`
   `Request Body`: ```{
      payer: <string>,
      points: <integer>,
      timestamp: <string>
   }```
   `Response`: ```{
      payer: <string>,
      points: <integer>,
      timestamp: <string>
   }```
   ***

   - `/spendPoints` : Spend a given number of points and return which from which payers, it got deducted
   ***
   `Request Type`: `POST`
   `Request Body`: ```{
      points: <integer>
   }```
   `Response`: ```[{
      payer: <string>,
      points: <integer>
   }, ...]```
   ***
      
   - `POST localhost:1337/balances` : Returns balances of all payers
   ***
   `Request Type`: `GET`
   `Response`: ```[{
      payer: <string>,
      points: <integer>
   },...]```
   ***

   POSTMAN file has been provided for usage examples

# Installation

 1. Install node.js(v10.15.0+) and npm(v6.9.0+). This can be done by following the instructions [here.](https://www.npmjs.com/get-npm)
 2. Open the shell where in the location of the folder that was downloaded and run the command:`npm install` This will install all the necessary packages required to run the application.
 3. Type the command: `node index.js` in shell. This will start the server.
 4. Send the http requests to -localhost:1337/transactions with the sequence of data and localhost:1337/spendPoints with the request.

# Approach


The sequence of information is gathered from the transaction routes and is saved as an array in dataServices.js. If any information is sent without the payer, points, or timestamp, then an error is returned. The dataservices.js file is used so in future if the source of the data changes from in-memory to a database, then only the dataservices will change and not the entire business logic. Once the request for the spendPoints comes in, the following steps are performed,

 1. The data is retrieved from dataServices.js and is stored in "list".
    The list is then sorted based on the timestamp, oldest data is set
    to the first position.
 2. The data is then validated, by checking to make sure that no payer
    has negative points. If any payer is found to have negative points,
    then an error message is returned.
 3. If the data is valid, then the rest of the code starts executing.
    Once a payer's points are used fully, then the payer information is
    removed from the list.
   
   # Assumptions
   The following assumptions were made in developing the web-service,
   1. The sequence of incoming data must contain a payer, points, and timestamp. If it doesn't contain any of the three then an error message is returned.
   2. The total points of the user must always be positive at any given time. If any payer has points less than 0, then the server exits with an error message as a response.
   3. Once a payer spends their points fully, their information can be removed from the memory.
   4. If there the points spent is more than the total points gained by all the payers, then an error message returned.

# Testing

To run the test file, type the command: `npm run test` in shell.