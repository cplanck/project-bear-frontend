
import { UserLoggedInContext } from '@/components/Context'
import { TestContext } from '@/components/Context';
import { useContext } from 'react';

export default function Login(props){

    let [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
    let [test, setTest] = useContext(TestContext);


    return(
        <div>
            Hello world {test}
            <a href='http://localhost:8000/auth/auth/login'>Google Login</a>
        </div>
    )
}