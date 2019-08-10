import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import styles from "./style";

class CreatePostForm extends Component {
    constructor(props) {
      super(props);
      this.state = {type: 'text'};

      this.updateFormType = this.updateFormType.bind(this);
      this.renderForm = this.renderForm.bind(this);
    }

    updateFormType(type){
      if (type == 'text'){
        this.setState(state => ({
          showTextForm: true,
          showURLForm: false,
          type: 'text'
        }));
      } else if (type == 'link'){
        this.setState(state => ({
          showTextForm: false,
          showURLForm: true,
          type: 'link'
        }));
      }
    }

    renderForm() {
      if (this.state.type == 'text') {
        return (
          <Form style={styles.FormPadding}>
              <Form.Group controlId="formTitle">
                  <Form.Control type="text" placeholder="Enter Title" />
              </Form.Group>
              <Form.Group controlId="formBody"> 
                  <Form.Control as="textarea" rows="3" placeholder="Text (Optional)" />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
            </Form>
        )
      } else if (this.state.type == 'link') {
        return (
          <Form style={styles.FormPadding}>
            <Form.Group controlId="formTitle">
                <Form.Control type="text" placeholder="Enter Title" />
            </Form.Group>
            <Form.Group controlId="formBody">
                <Form.Control type="text" placeholder="Enter URL" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
          </Form>
        )
      }
    }

    render() {
        return (
            <div>
                <div style={styles.CreatePostNavStyle}>
                  <Nav fill variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="createTextPostFormSelected" onSelect={() => this.updateFormType('text')}>Text</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="createLinkPostFormSelected" onSelect={() => this.updateFormType('link')}>Link</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                {this.renderForm()}
            </div>
        )
    }
}

export default CreatePostForm; 