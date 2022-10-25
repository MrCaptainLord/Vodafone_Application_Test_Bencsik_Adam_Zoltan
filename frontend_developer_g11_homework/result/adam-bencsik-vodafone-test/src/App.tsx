import { Route, Routes, useLocation } from "react-router-dom";
import { HeaderProvider } from "./components/Layout/HeaderContext";
import Layout from "./components/Layout/Layout";
import ContactCreate from "./views/contact/ContactCreate";
import ContactDetails from "./views/contact/ContactDetails";
import ContactList from "./views/contact/ContactList";
import ContactModify from "./views/contact/ContactModify";

function App() {
  const location = useLocation();

  return (
    <HeaderProvider>
      <Layout>
        <Routes location={location}>
          <Route path="/" element={<ContactList />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/contact-modify/:id" element={<ContactModify />} />
          <Route path="/contact-add" element={<ContactCreate />} />
        </Routes>
      </Layout>
    </HeaderProvider>
  );
}

export default App;
