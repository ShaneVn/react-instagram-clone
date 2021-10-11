import React, {lazy, Suspense} from "react"
import * as ROUTES from './constant/routes'
import{BrowserRouter as Router, Route, Switch} from "react-router-dom"
import UserContext from './context/user'
import useAuthListener from "./hooks/use-auth-listener"
import "tailwindcss/tailwind.css"
import './index.css'


const Dashboard = lazy(() => import ('./pages/dashboard.js'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Profile = lazy(() => import ('./pages/profile'));
const NotFound = lazy(() => import ('./pages/not-found'));

export default function App() {
  const {user} = useAuthListener()


  return (
    <UserContext.Provider value ={{user}} >
    <Router>
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path={ROUTES.LOGIN} component={Login}/>
        <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
        <Route path={ROUTES.PROFILE} component={Profile}/>
        <Route path={ROUTES.SIGN_UP} component={SignUp}/>
        <Route component={NotFound}/>
      </Switch>
    </Suspense>
    </Router>
    </UserContext.Provider>
  );
}


