import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePostForm extends Component {
    constructor(props) {
      super(props);
      this.state = {showTextForm: true, 
                    showURLForm: false};

      this.updateFormType = this.updateFormType.bind(this);
    }

    updateFormType(type){
      if (type == 'text'){
        this.setState(state => ({
          showTextForm: true,
          showURLForm: false
        }));
      } else if (type == 'url'){
        this.setState(state => ({
          showTextForm: false,
          showURLForm: true
        }));
      }
      
      console.log('type = ' + type);
    }

    render() {
        return (
            <div>
                <ul class="nav justify-content-center createPostNavPadding">
                    <li class="nav-item">
                        <a onclick={() => this.updateFormType('text')} class="nav-link">Text</a>
                    </li>
                    <li class="nav-item">
                        <a onclick={() => this.updateFormType('url')} class="nav-link">URL</a>
                    </li>
                </ul>
                {this.state.showTextForm && <Form className="formPadding">
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
                }
                {this.state.showURLForm && <Form className="formPadding">
                      <Form.Group controlId="formTitle">
                          <Form.Label>Title</Form.Label>
                          <Form.Control type="text" placeholder="Enter Title" />
                      </Form.Group>
                      <Form.Group controlId="formBody">
                          <Form.Label>URL</Form.Label>
                          <Form.Control type="text" placeholder="Enter URL" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Submit
                      </Button>
                  </Form>
                }
            </div>
        )
    }
}

export default CreatePostForm; 