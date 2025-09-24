import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Particle from "../Particle";
import { FaPaperPlane } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Create the email content with proper formatting
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `;

    // Create mailto URL
    const mailtoUrl = `mailto:ravishankar9908500@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoUrl;

    // Reset form after small delay
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setSending(false);
    }, 1000);
  };

  return (
    <section>
      <Container fluid className="contact-section" id="contact">
        <Particle />
        <Container>
          <Row style={{ justifyContent: "center", position: "relative" }}>
            <Col md={8} className="contact-form-container">
              <h1 style={{ fontSize: "2.6em", paddingBottom: "20px" }}>
                Get in <span className="purple">Touch</span>
              </h1>
              <Form onSubmit={handleSubmit} className="contact-form">
                <Row>
                  <Col md={6}>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="form-control-custom"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="form-control-custom"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="form-group">
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="form-control-custom"
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="form-control-custom"
                    rows={5}
                  />
                </Form.Group>
                <button 
                  type="submit" 
                  className="custom-button"
                  disabled={sending}
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <FaPaperPlane style={{ marginLeft: "10px" }} />
                    </>
                  )}
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Contact;