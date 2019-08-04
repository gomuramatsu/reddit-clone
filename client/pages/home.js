import React, {Component} from "react";
import MainNavBar from '../components/nav';
import MainGrid from '../components/mainGrid';

class Home extends Component {
    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <MainNavBar></MainNavBar>
                <MainGrid></MainGrid>
            </div>
        )
    }
}

export default Home; 