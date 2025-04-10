const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

const main = async () => {
    try {
        // const connection = await client.connect();
        // const result = await connection.db('mad9124').collection('cars').find({ make: 'Toyota' }).toArray();
        // console.log(result);

        
    } catch(error) {
        console.error(error);
    } finally {
        client.close();
    }
}

main();