import { response } from "../helpers/Response.js";
import { postModel } from "../models/post.model.js";

const postCtrl = {};

postCtrl.crear = async (req, reply) => {
    try {
        const data = await postModel.create(req.body)
        response(reply, 201, true, data, "El registro ha sido creado con éxito.")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

postCtrl.listarTodos = async (req, reply) => {
    try {
        const data = await postModel.find()
        response(reply, 201, true, data, "Lista de registros.")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

postCtrl.listarPorId = async (req, reply) => {
    try {
        const { id } = req.params;
        const data = await postModel.findById(id)
        if (!data) {
            response(reply, 404, false, "", "El registro no existe, inténtalo de nuevo.")
        }
        response(reply, 201, true, data, "El registro ha sido encontrado con éxito.")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

postCtrl.eliminar = async (req, reply) => {
    try {
        const { id } = req.params;
        const data = await postModel.findById(id)
        if (!data) {
            response(reply, 404, false, "", "El registro no existe, inténtalo de nuevo.")
        }
        await data.deleteOne();
        response(reply, 201, true, "", "El registro ha sido eliminado con éxito.")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

postCtrl.actualizar = async (req, reply) => {
    try {
        const { id } = req.params;
        const data = await postModel.findById(id)
        if (!data) {
            response(reply, 404, false, "", "El registro no existe, inténtalo de nuevo.")
        }
        await data.updateOne(req.body);
        response(reply, 201, true, "", "El registro ha sido actualizado con éxito.")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

export default postCtrl;

