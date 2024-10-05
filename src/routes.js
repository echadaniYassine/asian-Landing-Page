import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./homePage";
import Login from './login';
import Cards from './Cards';
import About from './About';
import FullMenu from './menu';
import { Menu } from './data';
import Contact from './Contact';
import MyAccount from './myAccount';


const RouteLays = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Home />} />
                <Route path="/login" element={< Login />} />
                <Route path="/Contact" element={< Contact />} />
                <Route path="/Cart" element={< Cards />} />
                <Route path="/Home" element={< Home />} />
                <Route path="/About" element={< About />} />
                <Route path="/Full-menu" element={<FullMenu Menu={Menu} />} />
                <Route path="/my-account" element={< MyAccount /> }/>

            </Routes>
        </BrowserRouter>
    );
};

export default RouteLays;