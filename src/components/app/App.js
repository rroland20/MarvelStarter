import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MainPage, ComicsPage, NoPageFound, SingleComicPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/MarvelStarter" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<NoPageFound />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;