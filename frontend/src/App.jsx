import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePosts, getPosts, savePosts, updatePosts } from "./redux/postSlice";

const initialState = {
  title: "",
  description: "",
  imgUrl: "",
};

function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postStore);
  const refInput = useRef();

  const [formulario, setFormulario] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const actions = (e) => {
    e.preventDefault();
    isEdit
      ? dispatch(updatePosts(formulario))
      : dispatch(savePosts(formulario));

    refInput.current.focus();
    cleanState();
  };

  const cleanState = () => {
    setFormulario(initialState);
    setIsEdit(false);
  };

  const clickUpdate = (post) => {
    setFormulario(post);
    setIsEdit(true);
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={actions}>
                <Form.Group className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    ref={refInput}
                    type="text"
                    placeholder="Ingresar título"
                    autoFocus
                    name="title"
                    value={formulario.title}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar descripción"
                    autoFocus
                    name="description"
                    value={formulario.description}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar url de la imagen"
                    autoFocus
                    name="imgUrl"
                    value={formulario.imgUrl}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Button type="submit" variant={isEdit ? "warning" : "primary"}>
                  {isEdit ? "Actualizar" : "Guardar"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Row>
            {posts.map((post) => (
              <Col xs={12} md={6} key={post._id}>
                <Card>
                  <Card.Img variant="top" src={post.imgUrl} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deletePosts(post._id))}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => clickUpdate(post)}
                      >
                        Actualizar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
