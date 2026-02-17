import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { blogs } from '../../data/siteData';

const MotionDiv = motion.div;
const MotionAnchor = motion.a;

const BlogSection = () => {
  return (
    <section id="writing" className="portfolio-section blog-modern">
      <div className="container section-stack blog-shell">
        <MotionDiv
          className="section-heading-wrap blog-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow dot-text">Blog</p>
          <h2 className="nothing-dotted">Writing</h2>
          <p>learning basics, fun ideas and random thoughts</p>
        </MotionDiv>

        <div className="article-grid blog-grid">
          {blogs.map((blog, idx) => (
            <MotionAnchor
              key={blog.title}
              href={blog.link}
              target="_blank"
              rel="noreferrer"
              className="blog-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <span className="blog-index dot-text">{String(idx + 1).padStart(2, '0')}</span>
              <h3>{blog.title}</h3>
              <p>{blog.summary}</p>
              <span className="blog-read-link">
                Read article
                <ArrowUpRight size={14} />
              </span>
            </MotionAnchor>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
