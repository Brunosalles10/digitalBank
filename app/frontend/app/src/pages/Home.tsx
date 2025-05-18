import Footer from "./homePages/footer";
import NavBar from "./homePages/navBar";
import PagePrimary from "./homePages/pagePrimary";
import PageSecundary from "./homePages/pageSecundary";
import PageTertiary from "./homePages/pageTertiary";

const Home = () => {
  return (
    <>
      <NavBar />
      <PagePrimary />
      <PageSecundary />
      <PageTertiary />
      <Footer />
    </>
  );
};
export default Home;
