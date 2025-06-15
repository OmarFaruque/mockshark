'use client';
import React from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import Link from 'next/link';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 700;
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #3498db;
  }
`;

const Highlight = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0;
  border-left: 4px solid #3498db;
`;

const FeatureList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0;
  list-style: none;
`;

const FeatureItem = styled.li`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  
  &:before {
    content: '✓';
    color: #3498db;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const CTA = styled.div`
  text-align: center;
  padding: 3rem;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border-radius: 15px;
  margin-top: 3rem;
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CTAButton = styled.button`
  background: white;
  color: #3498db;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <AboutContainer>
        <HeroSection>
          <Title>About MockShark</Title>
          <Tagline>“Empowering designers with quality mockups—without the hefty price-tag.”</Tagline>
          <p>Hey there! I'm MD AL FAYSAL, the creator of MockShark and a passionate graphic designer specializing in mockup creation.</p>
        </HeroSection>

        <Section>
          <p>For years, I struggled to find high-quality mockups at an affordable price—most were either too expensive or didn't hold up in real-world use. That sparked an idea: build a place where every designer can access premium mockups at fair prices.</p>
        </Section>

        <Section>
          <SectionTitle>🎯 Mission & Vision</SectionTitle>
          <p>At MockShark, our mission is simple:</p>
          <Highlight>
            To empower creators by offering professional-grade mockups at budget-friendly prices.
          </Highlight>
          <p><strong>Who it's for:</strong> Freelancers, students, hobbyists, or startups—anyone seeking quality visuals.</p>
          <p><strong>Why it matters:</strong> You shouldn't have to compromise on presentation or pay a premium to showcase your work.</p>
        </Section>

        <Section>
          <SectionTitle>✨ What Makes MockShark Different</SectionTitle>
          <FeatureList>
            <FeatureItem>High-resolution PSD mockups, supporting real-world editing in Photoshop</FeatureItem>
            <FeatureItem>Intuitive future tools—expect web-based design features coming soon!</FeatureItem>
            <FeatureItem>Built by a designer, for designers—I experienced your pain firsthand and created a solution I and many others needed</FeatureItem>
          </FeatureList>
        </Section>

        <Section>
          <SectionTitle>📈 My Journey</SectionTitle>
          <p>I'm MD AL FAYSAL—a mockup specialist who noticed too many downloads failed at full resolution. Over time, I became obsessed with quality and consistency. Eventually, I decided to launch MockShark to change the game—ensuring every designer has the power to create confidently.</p>
        </Section>

        <Section>
          <SectionTitle>🤝 Join the Community</SectionTitle>
          <p>When you choose MockShark, you're not just downloading a file—you're joining a growing family of creators committed to quality, affordability, and creativity. Watch for new features like in-browser editor support and community-driven mockup requests!</p>
        </Section>

        <CTA>
          <CTATitle>📣 Next Step: Explore & Design</CTATitle>
          <p>Ready to see it in action?</p>
          <p>Check out our bestsellers, and start bringing your ideas to life—either in Photoshop or right here on MockShark.</p>
         <Link href="/">
            <CTAButton className='mt-4'>Explore Mockups</CTAButton>
          </Link>
        </CTA>
      </AboutContainer>
      <Footer />
    </div>
  );
};

export default AboutUs;