// import fastify from "fastify";

// const app = fastify();

// app.get("/", async (request, reply) => {
//     return { hello: "world" };
// });

// app.listen({
//     port: 3000,

// }).then(() => {
//     console.log(`Server listening on http://localhost:3000`);
// })
import pg  from 'pg'
const { Client } = pg

async function main() {
    const client = new Client()
    await client.connect()

    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

main().catch(err => console.error(err))