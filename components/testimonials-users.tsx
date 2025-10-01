import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "Thrico has transformed how I network professionally. The quality of connections and events is outstanding.",
    name: "Jennifer Walsh",
    designation: "Senior Engineer at Meta",
    src: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "I've found my dream job through connections made on Thrico. The community is incredibly supportive.",
    name: "Alex Thompson",
    designation: "Product Manager at Airbnb",
    src: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "The events are well-organized and the platform makes it easy to stay connected with my professional network.",
    name: "Maria Santos",
    designation: "UX Director at Adobe",
    src: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Members Say About Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our community members about their experience
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
