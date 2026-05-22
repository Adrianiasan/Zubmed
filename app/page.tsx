export const dynamic = 'force-dynamic'

import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import GallerySection from '@/components/home/GallerySection'
import BlogPreview from '@/components/home/BlogPreview'
import ReviewsSection from '@/components/home/ReviewsSection'
import ContactSection from '@/components/home/ContactSection'
import FAQSection from '@/components/home/FAQSection'
import { getServices, getLatestPosts, getApprovedReviews } from '@/lib/data'
import { getHeroConfigAsync } from '@/lib/hero'

export default async function HomePage() {
  const [services, posts, reviews, heroSlides] = await Promise.all([
    getServices().then(s => s.slice(0, 6)),
    getLatestPosts(3),
    getApprovedReviews(),
    getHeroConfigAsync(),
  ])

  return (
    <>
      <HeroSection slides={heroSlides} />
      <ServicesSection services={services} />
      <AboutSection />
      <GallerySection />
      <BlogPreview posts={posts} />
      <ReviewsSection reviews={reviews} />
      <ContactSection />
      <FAQSection />
    </>
  )
}
