import postCtrl from "../controllers/post.controller.js";
import { postValid } from "../validSchemas/postValid.js";

export const postRoutes = (fastify, opts, done) => {
    fastify.get("/", postCtrl.listarTodos)
    fastify.get("/:id", postCtrl.listarPorId)
    fastify.post("/", {schema: postValid}, postCtrl.crear)
    fastify.put("/:id", postCtrl.actualizar)
    fastify.delete("/:id", postCtrl.eliminar)

    done();
}