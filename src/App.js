import 'bootswatch/dist/materia/bootstrap.min.css';
import './App.css';
import {RegisterPage} from "./views/RegisterPage";
import { LoginPage } from "./views/LoginPage";
import { UserProducts } from "./views/UserProducts";
import { ViewItem } from "./views/ViewItem";
import { HomePage } from "./views/HomePage";
import { UserProfile } from "./views/UserProfile";
import { ViewUserProducts } from "./views/ViewUserProducts";
import { AuthProvider } from "./contexts/AuthContext";
import {StorageProvider} from './contexts/StorageContext'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { ForgotPass } from "./views/ForgotPass";
import { NotFound } from './views/NotFound';

function App() {
  return (
    <>
    <AuthProvider>
    <StorageProvider>
      <Router>
        <Switch>

          <PrivateRoute path="/" exact component={HomePage} />
          <PrivateRoute path="/my-recipes" exact component={ViewUserProducts} />
          <PrivateRoute path="/my-recipes/update/:id"  component={UserProducts} />
          <PrivateRoute path='/my-recipes/add'   component={UserProducts} />
          <PrivateRoute path="/profile"  component={UserProfile} />
          <PrivateRoute path="/recipe/:id"  component={ViewItem} />
          <Route path="/login"  component={LoginPage} />
          <Route path="/create-user"  component={RegisterPage} />
          <Route path="/reset-password"  component={ForgotPass} />
          <Route path="*" component={NotFound} />

        </Switch>
      </Router>
    </StorageProvider>
    </AuthProvider>
    
    </>
  );
}

export default App;
