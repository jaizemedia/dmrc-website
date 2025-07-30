import Hero from "@/components/Hero";
import Container from "@/components/Container";
import CTA from "@/components/CTA";
import React from "react";
import SplashScreen from '@/components/SplashScreen'
import About from "@/components/About";

const HomePage: React.FC = () => {
  return (
    <>
      <SplashScreen />
      <Hero />
      <About />
      <Container>
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
