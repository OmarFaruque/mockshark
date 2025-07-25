'use client';
import React from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

const blogs = [
  {
    id: 1,
    title: 'The Future of Mockup Design',
    desc: 'Explore how AI and new design tools are revolutionizing the way we create and present digital mockups for clients and stakeholders.Explore how AI and new design tools are revolutionizing the way we create and present digital mockups for clients and stakeholders.',
    image: 'https://mockupline.com/wp-content/uploads/2024/12/canva-mockup.jpg',
  },
  {
    id: 2,
    title: '3D Mockups in 2025',
    desc: 'Discover the latest techniques for creating photorealistic 3D mockups that bring your designs to life before development begins.Discover the latest techniques for creating photorealistic 3D mockups that bring your designs to life before development begins.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/ca1d7b90050449.5e0b57d95a6bb.jpg',
  },
  {
    id: 3,
    title: 'Minimalist Mockup Trends',
    desc: 'Less is more. Learn how clean, minimalist mockup presentations are dominating the design industry this year.Discover the latest techniques for creating photorealistic 3D mockups that bring your designs to life before development begins.',
    image: 'https://imgproxy.domestika.org/unsafe/w:1200/rs:fill/plain/src://blog-post-open-graph-covers/000/005/697/5697-original.PNG?1605464863',
  },
  // {
  //   id: 4,
  //   title: 'Interactive Prototyping',
  //   desc: 'Transform static mockups into interactive experiences with these cutting-edge prototyping tools and techniques.Discover the latest techniques for creating photorealistic 3D mockups that bring your designs to life before development begins.',
  //   image: 'https://source.unsplash.com/800x500/?prototype,ui',
  // },
  // {
  //   id: 5,
  //   title: 'Mockup Presentation Mastery',
  //   desc: 'Professional strategies for showcasing your mockups in ways that consistently impress clients and win approvals.Discover the latest techniques for creating photorealistic 3D mockups that bring your designs to life before development begins.',
  //   image: 'https://source.unsplash.com/800x500/?presentation,design',
  // },
];

const BlogCard = ({ title, desc, image, delay ,id }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
  >
    <div className="grid md:grid-cols-2 h-full">
      <div className="relative h-64 md:h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-10 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {desc}
        </p>
        
       <Link href={`/BlogDetails/${id}`}>
  <button className="relative inline-flex items-center text-cyan-600 font-medium group">
    <span className="relative z-10">Read case study</span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 mt-0.5 transition-transform group-hover:translate-x-1">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  </button>
</Link>
      </div>
    </div>
  </motion.div>
);

const BlogPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mockup Design Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cutting-edge techniques and trends in digital mockup creation
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-cyan-500 rounded-full" />
          </div>
        </motion.header>

        <div className="space-y-12">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              desc={blog.desc}
              image={blog.image}
              delay={index * 0.1}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;