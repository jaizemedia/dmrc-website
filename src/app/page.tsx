import Hero from "@/components/Hero";
import Container from "@/components/Container";
import CTA from "@/components/CTA";
import React from "react";
import About from "@/components/About";
import Give from "@/components/Give";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Give/>
      <Container>
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
