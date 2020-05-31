import React, {Component} from "react";
import MainNavBar from '../components/nav';
import LoginScreenContent from '../components/loginScreenContent';
import { saveState } from '../components/util/localStorage';
import { Provider } from 'react-redux';
import { Store } from '../components/util/store';

function LoginPage() {
    Store.subscribe(() => {
        console.log('state changed!!');
        saveState(Store.getState());
    })

    return (
        <div>
            {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
            <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"></script>

            {/* <!-- TODO: Add SDKs for Firebase products that you want to use
                https://firebase.google.com/docs/web/setup#available-libraries --> */}
            <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-analytics.js"></script>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
            <Provider store={Store} >
                <MainNavBar></MainNavBar>            
                <LoginScreenContent></LoginScreenContent>
            </Provider>
        </div>
    );
}
export default LoginPage; 