import "../styles/globals.css";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import Login from "../components/Login";
import { AppProvider } from "../context/appContext";
function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || HomeLayout;

  return (
    <>
      <AppProvider>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </AppProvider>
    </>
  );
}

const HomeLayout = ({ children }) => {
  return <>{children}</>;
};

export default MyApp;
