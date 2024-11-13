import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
    return { hello: "world" };
});

app.listen({
    port: 3000,

}).then(() => {
    console.log(`Server listening on http://localhost:3000`);
})