'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ArrowUpRight, Clock, Eye } from 'lucide-react';
import Markdown from 'react-markdown';
import Link from 'next/link';

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://mockshark-backend.vercel.app/api/v1/blogs/${id}`);
        const data = await res.json();

        if (data.success) {
          setBlog(data.data);
          setError(null);
        } else {
          setError(data.message || 'Blog not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedBlogs = async () => {
      try {
        const res = await fetch(`https://mockshark-backend.vercel.app/api/v1/blogs`);
        const data = await res.json();

        if (data.success) {
          // Filter out current blog and take 2 related
          const related = data.data.filter(b => b.id !== id).slice(0, 2);
          setRelatedBlogs(related);
        }
      } catch {
        // ignore related fetch errors silently
      }
    };

    fetchBlog();
    fetchRelatedBlogs();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-gray-50">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-gray-50 text-red-500">
        <p>{error}</p>
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

                <p className="text-xl text-gray-600 leading-relaxed">{blog.description}</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedBlogs.length > 0 ? (
                    relatedBlogs.map((related) => (
                      <Link key={related.id} href={`/BlogDetails/${related.id}`}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                          <h4 className="text-lg font-semibold mb-2">{related.title}</h4>
                          <p className="text-gray-600 line-clamp-2">{related.description}</p>
                        </motion.div>
                      </Link>
                    ))
                  ) : (
                    <p>No related articles found.</p>
                  )}
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
