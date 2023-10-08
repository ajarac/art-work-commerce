# Art work e-commerce with Surreal DB
This project aims to demonstrate the practical application of [Surreal DB](https://surrealdb.com/).

Surreal DB, launched in September 2023, introduces a groundbreaking database paradigm that seamlessly combines the strengths of both SQL and NoSQL databases. It offers a unique approach by facilitating graph-based relationships among various tables and providing a host of additional features.

[Surreal Deal](https://drive.google.com/uc?id=1AlSMBJrncEuqOtbbEXLqtenUb0Z5BjlD&export=download)  is a demo dataset based on a simplified e-commerce platform that sells artwork.  
The dataset is made up of 8 tables using both  [graph relations](https://surrealdb.com/docs/surrealql/statements/relate)  and  [record links](https://surrealdb.com/docs/surrealql/datamodel/records):  
person, order, product, review, artist, create, avg_product_review, daily_sales.

In the diagram below, the nodes in pink are the  [standard tables](https://surrealdb.com/docs/surrealql/statements/define/table), the ones in purple represent the  [edge tables](https://surrealdb.com/docs/surrealql/statements/relate)  which shows relationships between records and SurrealDB as a graph database. While the nodes in gray are the  [pre-computed table views](https://surrealdb.com/docs/surrealql/statements/define/table)

![enter image description here](https://surrealdb.com/static/img/docs/surrealql/surreal-deal-dataset-870a17f5d54faaf495d2e555c2656775.png)

# Run the project
First we need to install the dependencies:

    yarn install

Then we need to have [docker and docker compose](https://www.docker.com/) installed
Once you have installed it, you can run the docker compose with:

    docker-compose up -d
Then import the data set with:

    yarn data:import

Once it is finished, we can run the project with:

    yarn start
It will connect automatically to the DB in docker compose.

# Postman collection
The file `Art work e-commerce.postman_collection.json` is a collection for postman to be able to use the different endpoints of the projects like:

- Get Artits
- Get Products Recommended
- Get Reviews
- etc
