"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ArrowUpRight, Clock, Eye } from "lucide-react";
import Markdown from "react-markdown";
import Link from "next/link";

const blogs = [
  {
    id: "1",
    title: "The Future of Mockup Design",
    desc: "Explore how AI and modern design tools are revolutionizing the way we create and present digital mockups. From automated layout suggestions to intelligent color adjustments, the future of mockup design is driven by innovation. Discover how these changes are making design faster, smarter, and more accessible than ever before.",
    image: "https://mockupline.com/wp-content/uploads/2024/12/canva-mockup.jpg",
    content: `### The Future of Mockup Design

As AI tools become more integrated into design workflows, mockup creation is evolving rapidly. Designers can now generate realistic previews using AI-driven platforms, automate repetitive layout tasks, and even receive design suggestions.

These tools not only increase productivity but also help non-designers create visually compelling assets. In the next five years, expect cloud-based, AI-powered design platforms to dominate the mockup scene.

Mockups will continue to bridge the gap between concept and reality, with 3D rendering, live preview on devices, and interactive mockups becoming the norm.`,
  },
  {
    id: "2",
    title: "3D Mockups in 2025",
    desc: "Discover cutting-edge techniques for creating photorealistic 3D mockups. Learn how these mockups enhance product presentation, increase engagement, and shorten feedback cycles. From smart lighting to advanced texture mapping, 3D mockups are shaping the future of digital design.",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/source/ca1d7b90050449.5e0b57d95a6bb.jpg",
    content: `### 3D Mockups in 2025

3D mockups have moved beyond novelty and are now essential tools in product design, marketing, and branding. Designers use software like Blender, Adobe Dimension, and Figma plugins to create stunning product visualizations.

These mockups improve client buy-in by presenting products in real-world scenarios before they’re built. Expect more automation in 3D mockup creation, as well as integration with AR and VR technologies.

With better GPU rendering and AI-enhanced lighting, 2025 is the year of high-fidelity mockup experiences.`,
  },
  {
    id: "3",
    title: "Minimalist Mockup Trends",
    desc: "Less is more. Learn how clean, minimalist mockup presentations are dominating the design industry in 2025. Designers are now embracing whitespace, simple color palettes, and sleek typography to highlight product value without distractions. This trend simplifies communication and enhances clarity in product storytelling.",
    image:
      "https://imgproxy.domestika.org/unsafe/w:1200/rs:fill/plain/src://blog-post-open-graph-covers/000/005/697/5697-original.PNG?1605464863",
    content: `### Minimalist Mockup Trends

Minimalism isn’t just a trend — it's a design philosophy. In 2025, designers are focusing on fewer elements, more whitespace, and typography-led compositions. The goal is to showcase the product without visual noise.

Mockups are becoming less cluttered, with single-object scenes, soft shadows, and neutral backgrounds. This enhances focus and lets the design speak for itself.

Whether it’s an app screen or a physical product, minimalist mockups are now the go-to for portfolios and presentations that aim to be both elegant and effective.`,
  },
];

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const selectedBlog = blogs.find((b) => b.id === id);
    setBlog(selectedBlog);
  }, [id]);

  if (!blog)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-gray-50">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:sticky lg:top-24 lg:h-fit lg:w-1/3">
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                  whileHover={{ x: 2 }}
                >
                  {blog.title}
                </motion.h1>

                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">5 min read</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">1.2k views</span>
                  </div>
                </div>

                <p className="text-xl text-gray-600 leading-relaxed">
                  {blog.desc}
                </p>

                {/* <button 
                  className="group flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="font-medium">Share article</span>
                  <motion.span
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </button> */}
              </div>
            </div>

            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="overflow-hidden rounded-[2rem] mb-12 border border-gray-200/80 shadow-lg"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full object-cover h-[400px] md:h-[500px] lg:h-[600px] hover:scale-[1.01] transition-transform duration-500"
                />
              </motion.div>

              <article className="prose prose-lg max-w-none text-gray-700">
                <Markdown>{blog.content}</Markdown>
              </article>

              <div className="mt-16 pt-8 border-t border-gray-200/50">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Related Articles
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {blogs
                    .filter((b) => b.id !== id)
                    .slice(0, 2)
                    .map((related) => (
                      <Link
                        key={related.id}
                        href={`/BlogDetails/${related.id}`}
                      >
                        <motion.div
                          key={related.id}
                          whileHover={{ y: -4 }}
                          className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all"
                        >
                          <h4 className="text-lg font-semibold mb-2">
                            {related.title}
                          </h4>
                          <p className="text-gray-600 line-clamp-2">
                            {related.desc}
                          </p>
                        </motion.div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
