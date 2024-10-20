import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/login/Login";
import DetenteurPage from "./pages/DetenteurPage";
import UsersPage from "./pages/UsersPage";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import './App.css'
import EntreeArticle from "./pages/EntreeArticle";
import AddArticle from "./pages/AddArticle";
import SortiePage from "./pages/SortiePage";
import MouvementPage from "./pages/MouvementPage";
import JournalStockPage from "./pages/JournalStockPage";
import Detailstock from "./pages/Detailstock";
import DetailstockOut from "./pages/DetailStockOut";
import EditArticle from "./pages/EditArticle";

function App() {

  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<HomePage />}/>
          <Route path="/detenteur" element={<DetenteurPage />}/>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/entree-article" element={<EntreeArticle />} />
          <Route path="/entree-article" element={<EntreeArticle />} />
          <Route path="/entree-article/ajout" element={<AddArticle/>} />
          <Route path="/exit-article" element={<SortiePage/>} />
          <Route path="/mouvement" element={<MouvementPage/>} />
          <Route path="/journalstock" element={<JournalStockPage/>} />
          <Route path="/journalstock/detailentrance/:id" element={<Detailstock/>} />
          <Route path="/entree-article/editArticle/:id" element={<EditArticle/>} />

        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
