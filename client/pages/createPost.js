import React, {Component} from "react";
import MainNavBar from '../components/nav';
import CreatePostForm from '../components/createPostForm';

class CreatePostPage extends Component {
    render() {
        return (
            <div>
                <style jsx global>{`
                .createPostNavPadding {
                    margin-top: 2%;
                    padding-top: 1%;
                }

                .formPadding {
                    margin-top: 2%;
                    margin-bottom: 2%;
                    margin-left: 8%;
                    margin-right: 8%;
                    padding-top: 1%;
                    padding-bottom: 1%;
                    padding-left: 4%;
                    padding-right: 4%;
                }
                `}
                </style>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <MainNavBar></MainNavBar>
                <CreatePostForm></CreatePostForm>
            </div>
        )
    }
}

export default CreatePostPage; 