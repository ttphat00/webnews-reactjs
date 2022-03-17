//import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Error from './components/Error';
import Category from './components/Category';
import Subcategory from './components/Subcategory';
import Single from './components/Single';
import Search from './components/Search';
import Author from './components/Author';
import Register from './components/user/authorization/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Admin from './components/Admin';
import PostDetail from './components/user/admin/post/PostDetail';
import Authorization from './components/Authorization';
import EditPermission from './components/user/authorization/EditPermission';
import SearchUser from './components/user/authorization/SearchUser';

function App() {

  return (
    <>
      <Switch>
        <Route path="/" render={() => <Home />} exact />
        <Route path="/category/:id/:idpage" render={() => <Category />} />
        <Route path="/subcategory/:id/:idpage" render={() => <Subcategory />} />
        <Route path="/post/:id" render={() => <Single />} />
        <Route path="/search/:title/:idpage" render={() => <Search />} />
        <Route path="/author" component={Author} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout/:permission" component={Logout} />
        <Route path="/admin" component={Admin} />
        <Route path="/post-detail/:id" component={PostDetail} />
        <Route path="/system-admin" component={Authorization} />
        <Route path="/edit-permission/:idpage/:id" component={EditPermission} />
        <Route path="/sysad-search-user/:title/:idpage" component={SearchUser} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
