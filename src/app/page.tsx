import Hero from "@/components/Hero";
import Container from "@/components/Container";
import CTA from "@/components/CTA";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
