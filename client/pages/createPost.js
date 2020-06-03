import React, {Component} from "react";
import MainNavBar from '../components/nav';
import CreatePostForm from '../components/createPostFormTypes';
import { saveState } from '../components/util/localStorage';
import { Store } from '../components/util/store';
import { Provider } from 'react-redux';

function  CreatePostPage(props) {
    Store.subscribe(() => {
        console.log('state changed!!');
        saveState(Store.getState());
    })
    
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

export default CreatePostPage; 