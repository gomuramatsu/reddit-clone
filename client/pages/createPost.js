import React, {Component} from "react";
import MainNavBar from '../components/nav';
import CreatePostForm from '../components/createPostForm';
import { Store } from '../components/util/store';
import { Provider } from 'react-redux';

class CreatePostPage extends Component {
    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <Provider store={Store} >
                    <MainNavBar></MainNavBar>
                    <CreatePostForm></CreatePostForm>
                </Provider>
            </div>
        )
    }
}

export default CreatePostPage; 