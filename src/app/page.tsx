import Hero from "@/components/Hero";
import Container from "@/components/Container";
import CTA from "@/components/CTA";
import React from "react";
import About from "@/components/About";
import SocialFollow from "@/components/SocialFollow";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <SocialFollow/>
      <Container>
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
