import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Carousel, Form } from "react-bootstrap";
import "../App.css";
import Granaderos from "../assets/granaderos.jpg";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { addProduct } from "../firebase/api";
import Tim3 from "../assets/img10.jpg";
import Tim5 from "../assets/img11.jpg";
import Tim6 from "../assets/img12.jpg";
import CustomTyping from "./CustomTyping";
import DinoMove from "./DinoMove";
import Dino from "../assets/3dino.png";
import { Howl, Howler } from "howler";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
const Tim = () => {
  const initialState = {
    nombre: "",
    confirmo: false,
    mensaje: "",
    noConfirmo: false,
  };
  const [state, setState] = useState(initialState);
  const [index, setIndex] = useState(0);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [play, setPlay] = useState(false);
  const [flag, setFlag] = useState(true);

  const sound = useRef(null);

  // countDown
  let interval = useRef();
  const updateCountdown = () => {
    const targetDate = new Date("Nov 09, 2024 15:30:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = targetDate - now;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (timeDifference < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    setTimeout(() => {
      setFlag(false);
    }, 3000);
  }, []);

  useEffect(() => {
    updateCountdown();
    return () => {
      clearInterval(interval.current);
    };
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handlePlay = () => {
    sound.current = new Howl({
      src: ["mp3/happy.mp3"],
      autoplay: false, // Reemplaza 'ruta-de-tu-musica.mp3' con la ruta de tu música
    });
    sound.current.play();
    setPlay(true);
  };
  const handlePause = () => {
    if (sound.current) {
      sound.current.stop();
      setPlay(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checked && !checked1) {
      toast("Ups debes presionar: Si! confirmo o No puedo:( para continuar", {
        type: "error",
        autoClose: 2000,
      });
    } else {
      state.confirmo = checked;
      state.noConfirmo = checked1;
      const collectionName = "cumpleTim";
      await addProduct(state, collectionName);
      toast("Confirmación enviada", {
        type: "success",
        autoClose: 2000,
        position:'bottom-center'
      });
      setState(initialState)
    }
  };

  return (
    <>
      {play ? (
        <div
          onClick={handlePause}
          style={{
            position: "fixed",
            bottom: 10,
            left: 10,
            backgroundColor: "#252525",
            padding: "5px",
            borderRadius: 50,
            zIndex: 100,
          }}
        >
          <AiOutlinePauseCircle color="#fff" size={30} />
        </div>
      ) : (
        <div
          onClick={handlePlay}
          style={{
            position: "fixed",
            bottom: 10,
            left: 10,
            backgroundColor: "#252525",
            padding: "5px",
            borderRadius: 50,
            zIndex: 100,
          }}
        >
          <AiOutlinePlayCircle color="#fff" size={30} />
        </div>
      )}
      {flag ? (
        <p
          style={{
            position: "fixed",
            bottom: 2,
            left: 70,
            backgroundColor: "#ace9b7",
            border:'1px solid black',
            padding: "5px",
            color: "#252525",
            borderRadius: 50,
            zIndex: 100,
          }}
        >
          Dale play la musica!
        </p>
      ) : (
        false
      )}
      <ToastContainer />
      <div onClick={() => sound.play()} className="background-image" />
      <CustomTyping />
      {/*   <DinoMove/> */}
      <img
        src={Dino}
        style={{
          position: "absolute",
          bottom: 0,
          left: "30%",
          width: "150px",
          height: "150px",
        }}
      />
      <Container style={{ padding: "30px" }}>
        <Row>
          <Col xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "30px", marginBottom: "20px" }}>
              ¡Es un día prehistóricamente especial!
            </h4>

            <p style={{ fontSize: "20px", textAlign: "justify" }}>
              Hola, soy Agustín y quiero contarte un poco sobre mí. ¡Ya tengo 3
              años! Me encantan los dinosaurios, los autos y siempre estoy listo
              para una gran aventura. Ahora también disfruto aún más bailar,
              imaginar mundos nuevos.
              Este último año ha sido increíble, he aprendido muchísimas cosas
              nuevas y, como siempre, estuve rodeado de todo el amor de mi mami
              y papi. Soy un niño muy feliz y quiero compartir toda mi alegría
              contigo celebrando mis 3 añitos en un día lleno de sorpresas
              jurásicas.
            </p>
            <h4>
              No olvides traer tu espíritu aventurero y tus ganas de celebrar.
              ¡Te esperamos!
            </h4>
          </Col>
        </Row>
      </Container>
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={Tim6} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block w-100" src={Tim3} alt="Second slide" />
        </Carousel.Item>
         <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={Tim5} alt="Third slide" />
        </Carousel.Item> 
      </Carousel>
      <Container style={{ padding: "30px", background: "#ace9b7" }}>
        <Row style={{ padding: "30px", background: "#fff" }}>
          <Col xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
            <img className="d-block w-100" src={Granaderos} alt="First slide" />
            <h4
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                marginTop: "30px",
              }}
            >
              Fecha y hora
            </h4>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                background: "#EAEAEA",
                borderRadius: "10px",
              }}
            >
              {" "}
              09 de Noviembre / 14:30 hs a 17:30 hs{" "}
            </p>
            <h4 style={{ fontSize: "20px", marginBottom: "10px" }}>
              Ubicación
            </h4>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                background: "#EAEAEA",
                borderRadius: "10px",
              }}
            >
              Granaderos 725, Buenos Aires
            </p>
            <a
              href="https://maps.app.goo.gl/B72YnyJqPj6JtZjh9"
              target="_blank"
              className="button"
            >
              Ver Ubicación
            </a>
          </Col>
        </Row>
      </Container>
      <Container style={{ padding: "30px", background: "#ace9b7" }}>
        <Row style={{ padding: "30px" }}>
          <h4
            style={{
              textAlign: "center",
              color: "#252525",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ¿Cuanto falta?
          </h4>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerDays}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>DÍAS</p>
          </Col>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerHours}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>HRS</p>
          </Col>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerMinutes}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>MIN</p>
          </Col>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerSeconds}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>SEG</p>
          </Col>
        </Row>
      </Container>
      <Container className="border-div">
        <Row style={{ padding: "30px", background: "#fff" }}>
          <Col xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "20px", marginBottom: "10px" }}>
              IMPORTANTE
            </h4>
            <p style={{ fontSize: "20px", marginBottom: "20px" }}>
              Confirmar asitencia{" "}
            </p>
            <Form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Form.Check
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    setChecked1(false);
                  }}
                  type="radio"
                  label="Si! Confirmo"
                  id="radio"
                  name="confirmo"
                  checked={checked}
                />
                <Form.Check
                  onChange={(e) => {
                    setChecked1(e.target.checked);
                    setChecked(false);
                  }}
                  type="radio"
                  label="No puedo :("
                  id="radio"
                  name="noConfirmo"
                  checked={checked1}
                />
              </div>
              <Form.Control
                onChange={handleChange}
                name="mensaje"
                checke
                value={state.mensaje}
                style={{ marginBottom: "20px" }}
                placeholder="Ingrese algún dato importante..."
                as="textarea"
                rows={5}
              />

              <Form.Control
                onChange={handleChange}
                required
                type="text"
                name="nombre"
                placeholder="Nombre de adulto o niño :D"
                value={state.nombre}
                style={{ marginBottom: "20px" }}
              />
              <button className="button" type="submit">
                Confirmar
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tim;
