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
                <style jsx global>{`
                .mainGridDetails {
                    font-size: small;
                }
        
                .mainGridTitle {
                    color: black;
                }

                .mainGrid {
                    margin-top: 2%;
                    margin-bottom: 2%;
                    margin-left: 5%;
                    margin-right: 5%;
                    width:90% !important;
                }

                .mainGridTh {
                    width: 100%;
                }
                `}
                </style>
                <MainNavBar></MainNavBar>
                <MainGrid></MainGrid>
            </div>
        )
    }
}

export default Home; 