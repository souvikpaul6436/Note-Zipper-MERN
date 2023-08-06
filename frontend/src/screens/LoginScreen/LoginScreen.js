import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions"; 
import { Eye, EyeSlash } from "react-bootstrap-icons";

const LoginScreen = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
   }
  }, [history, userInfo])
  
    
  const submitHandler = async (e) => {
    e.preventDefault();
    
    dispatch(login(email, password));
   
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {loading && <Loading />}

        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div style={{ marginTop: "10px" }}></div>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div style={{ marginTop: "20px" }}></div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Don't have an account? <Link to="/signup">Sign up </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
