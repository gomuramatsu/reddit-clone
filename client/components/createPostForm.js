import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import gql from "graphql-tag";
import styles from "./style";

const CREATE_POST = gql`
  query createPost ($title: String!, $body: String, $url: String){
    createPost (title: $title, body: $body, url: $url) {
      id
      title
      body
    }
  }
`;

const initialState = {
  type: 'text'
};

class CreatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.titleInput = React.createRef(); 
    this.bodyInput = React.createRef(); 
    this.urlInput = React.createRef(); 

    this.updateFormType = this.updateFormType.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createPostMutation(title, body, url) {
    const { loading, error, data } = useQuery(CREATE_POST, {
      variables: {title, body, url},
    });
  }

  handleSubmit() {
    console.log(this.state);

    // call create post mutation
  }

  handleChange(event) {
    this.setState(state => ({
      title: (this.titleInput.current == null ? '' : this.titleInput.current.value),
      body: (this.bodyInput.current == null ? '' : this.bodyInput.current.value),
      url: (this.urlInput.current == null ? '' : this.urlInput.current.value)
    }));
  }

  /**
   * After switching forms, the state will be wiped. 
   */
  clearState() {
    this.setState(initialState);
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
                <Form.Control ref={this.titleInput} type="text" placeholder="Enter Title" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBody"> 
                <Form.Control ref={this.bodyInput} as="textarea" rows="4" placeholder="Text (Optional)" onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="primary" onClick={this.handleSubmit}>
                Submit
            </Button>
          </Form>
      )
    } else if (this.state.type == 'link') {
      return (
        <Form style={styles.FormPadding}>
          <Form.Group controlId="formTitle">
              <Form.Control ref={this.titleInput} type="text" placeholder="Enter Title" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formBody">
              <Form.Control ref={this.urlInput} type="text" placeholder="Enter URL" onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" onClick={this.handleSubmit}>
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