import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HomepagePromo } from "../components/HomepagePromo/HomepagePromo";
import { useAuth } from "../context/UserContext";
import { HomepageContainer } from "../components/HomepageContainer";

export function Homepage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      {isAuthenticated ? <HomepageContainer /> : <HomepagePromo />}
      <Footer />
    </>
  );
}
