import { useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import useCategorias from '../hooks/useCategorias';
import useBebidas from '../hooks/useBebidas';
import { generarId } from '../helpers';

const Formulario = () => {

  const [busqueda, setBusqueda] = useState({
    nombre: '',
    categoria: ''
  });

  const [alerta, setAlerta] = useState('');
  const { categorias } = useCategorias();
  const { consultarBebida } = useBebidas();

  const handleSubmit = e => {
    e.preventDefault();

    if (Object.values(busqueda).includes('')) {
      setAlerta('Todos los campos son obligatorios');
      return;
    }

    setAlerta('');

    consultarBebida(busqueda);
  };

  return (
    <Form
      onSubmit={handleSubmit}
    >
      {alerta ?
        <Alert variant="danger" className="text-center">{alerta}</Alert> : null
      }

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre de la Bebida</Form.Label>

            <Form.Control
              id="nombre"
              type="text"
              placeholder="Ej: Tequila, Vodka, etc"
              name="nombre"
              value={busqueda.nombre}
              onChange={e => setBusqueda({
                ...busqueda,
                [e.target.name]: e.target.value
              })}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="categoria">Categoría de la Bebida</Form.Label>

            <Form.Select
              id="categoria"
              name="categoria"
              value={busqueda.categoria}
              onChange={e => setBusqueda({
                ...busqueda,
                [e.target.name]: e.target.value
              })}
            >
              <option value="">-- Selecciona Categoría --</option>

              {categorias.map(categoria => (
                <option key={generarId()} value={categoria.strCategory}>{categoria.strCategory}</option>
              ))}
            </Form.Select>

          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-end">
        <Col md={3}>
          <Button
            variant="danger"
            className="text-uppercase w-100"
            type="submit"
          >
            Buscador Bebidas
          </Button>
        </Col>
      </Row>

    </Form>
  );
};

export default Formulario;
