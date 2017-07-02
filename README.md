# README

This is the Hypermedia Application Project 2017 website repository.

## TEAM:
  - Perini Massimo
  - Corsini Andrea
  - Montali Nico

To clarify how the project was implemented, here we add some guidelines for readers:

### GRUNT + SASS:
All our stylesheets are compiled and minified from SASS files through GRUNT. In this way, the minification is automatic. This works also for JS scripts. All the un-compiled sources are in the ‘/custom’ directory, while all the compiled ones are in ‘/public’ (css + js).

### EJS:
We did not use any vanilla HTML file, while we used EJS templating instead. This allowed us to reduce the usage of AJAX calls on client side (that we still used in some cases, see below). This is an advantage because the client renders the page with the data directly. We used this in “static” pages, such as the single doctor/service/area page.
Also, this allowed us to re-use components (e.g. navbar with logged user or the footer).
All the EJS templates are contained in the ‘/views’ directory.

### APIS DOCS:
Documentation of the APIs is written using Swagger and is available @ ‘/docs/api’. This was done making comments with block tags as in JavaDoc

### AJAX:
We used AJAX for the “All doctors” list, because we intended to implement pagination for that list. Instead of “simple” pagination, we implemented an infinite scroll.

### DATABASE:
The database is a PostgreSQL DB, live on heroku. We implemented a script (dbinit.js) that is used to load datas into the database:

```
npm run dbinit
```

This scripts loads all the JSONs files in the data directory. We implemented this to replicate the DB easily (due to frequent re-structuring in the development phase).

### SEQUELIZE:
To access (and manage) the DB we used the Sequelize library:

> “Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.”

[SequelizeJS website](http://docs.sequelizejs.com)

This allowed us to define (through code) not only queries, but also table structure (and so, to create the database from this structure): through this library, it was very easy to manage an under-development DB structure.

### PROMISES+ASYNC:
We used Promises in the 99% of code, given that sequelize and DB access was also Promise-based.
We also tried the async-await paradigm in the dbinit.js

### PRIVATE AREA:
We also implemented a basic login-signup and private area functionality. This was done with the help of PassportJS:

[PassportJS website](http://passportjs.org)

If you want to try the login phase, we created a user for you:
usr: demo@example.com
pwd: hypermedia

### RESERVATION:
The reservation form does only insert a request for an appointment in the DB, without making the user choose the exact time. This is because we supposed that the reservation system is implemented in another system, separated from our website (and probably already in use). We suppose that there is someone of the staff that reads the requests from the DB and fix appointments for user. Users are later notified of the reservation.

### BLANK PAGES:
There are some browseable blank page (e.g. News) that were not requested in the assignment. We did not find the time to develop all the "optional" funcionalities, just to focus more on the requested ones. Nevertheless, we inserted a blank page with a "Go back" link to help you browse the website without being stuck.
