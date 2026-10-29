export interface VideoReview {
  id: string;
  name: string;
  title: string;
  role: string;
  company: string;
  lpa: string;
  rating: number;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  badge?: string;
  subBadge?: string;
  quote?: string;
}

export interface GoogleReview {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  lpa: string;
  rating: number;
  timeAgo: string;
  review: string;
  location?: string;
  tag?: string;
}

export interface ReviewFaq {
  id: string;
  question: string;
  answer: string;
}

export interface StudentPlacementCard {
  id: string;
  name: string;
  package: string;
  role: string;
  company: string;
  logo: string;
  avatar: string;
  gender: "m" | "f";
}

export const VIDEO_REVIEWS: VideoReview[] = [
  {
    id: "video-1",
    name: "Maria",
    title: "Maria",
    role: "Devops Engineer",
    company: "VOSS",
    lpa: "6 LPA",
    rating: 5,
    duration: "4:32",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "Placed at VOSS",
    quote: "The hands-on DevOps pipelines and AWS projects made the difference in my interviews."
  },
  {
    id: "video-2",
    name: "Muskan Soni",
    title: "Muskan Soni",
    role: "HR",
    company: "Cred",
    lpa: "6 LPA",
    rating: 5,
    duration: "5:18",
    thumbnail: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "HR Student",
    subBadge: "Project Presentation",
    quote: "From scratch to landing a top HR role at CRED with 6 LPA package."
  },
  {
    id: "video-3",
    name: "SAP YouTube Video",
    title: "SAP YouTube Video",
    role: "SAP",
    company: "HCL",
    lpa: "20 LPA",
    rating: 5,
    duration: "6:45",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "₹4.5 LPA - 20 LPA",
    subBadge: "KEY MOMENTS • Placement Celebration",
    quote: "Celebrated in class! From beginner to SAP Consultant at HCL with 20 LPA."
  },
  {
    id: "video-4",
    name: "Bigdata Hadoop Placement Success Stories",
    title: "Bigdata Hadoop Placement Success Stories",
    role: "Data Engineering",
    company: "Accenture",
    lpa: "18 LPA",
    rating: 5,
    duration: "7:12",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "Big Data & Hadoop",
    quote: "Real enterprise clustering and Spark pipelines cracked Accenture's technical rounds."
  },
  {
    id: "video-5",
    name: "Honest Student Reviews for Data Science Course",
    title: "Honest Student Reviews for Data Science Course",
    role: "Data Analyst",
    company: "Amazon",
    lpa: "25 LPA",
    rating: 5,
    duration: "8:05",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "Data Science & AI",
    quote: "From Non-IT to Data Analyst at Amazon with 25 LPA. Honest journey breakdown."
  },
  {
    id: "video-6",
    name: "What Students Say About the Java Course",
    title: "What Students Say About the Java Course",
    role: "Java Developer",
    company: "Oracle",
    lpa: "25 LPA",
    rating: 5,
    duration: "5:50",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "Java Full Stack",
    quote: "Microservices and Spring Boot masterclass led directly to my offer at Oracle."
  },
  {
    id: "video-7",
    name: "Student Video Review for CATIA Course",
    title: "Student Video Review for CATIA Course",
    role: "CATIA Design Engineer",
    company: "TATA Motors",
    lpa: "20 LPA",
    rating: 5,
    duration: "6:20",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "CAD/CATIA Design",
    quote: "Mechanical engineering student landed Core Design role at TATA Motors with 20 LPA."
  },
  {
    id: "video-8",
    name: "Authentic Student Review for AWS Course",
    title: "Authentic Student Review for AWS Course",
    role: "AWS Solutions Architect",
    company: "Infosys",
    lpa: "22 LPA",
    rating: 5,
    duration: "7:40",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    badge: "AWS Solutions Architect",
    quote: "Comprehensive architectural simulations and cloud labs paved the way to Infosys."
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "g-1",
    name: "Vibhu Rajesh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Devops Engineer",
    company: "Soft India",
    lpa: "3.3 LPA",
    rating: 5,
    timeAgo: "2 months ago",
    location: "Bangalore",
    tag: "DevOps & Cloud",
    review:
      "The learning experience at Micron Info Tech is unparalleled. The trainers are not just knowledgeable but also passionate about teaching. They make complex topics easy to understand. I am extremely satisfied with the quality of education I received here."
  },
  {
    id: "g-2",
    name: "Lakshmi Iyer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "Cloud Specialist",
    company: "Google India",
    lpa: "30 LPA",
    rating: 5,
    timeAgo: "1 month ago",
    location: "Bangalore",
    tag: "Top Package",
    review:
      "Micron Info Tech is a beacon of hope for aspiring professionals. Their practical approach to learning and emphasis on skill development make them stand out. The mentors provide individualized attention, nurturing each student's strengths. I owe my success to their guidance."
  },
  {
    id: "g-3",
    name: "Mohammed Basha",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "System Engineer",
    company: "Lenovo",
    lpa: "14.8 LPA",
    rating: 5,
    timeAgo: "3 weeks ago",
    location: "Bangalore",
    tag: "Systems & Cloud",
    review:
      "I cannot speak highly enough of Micron Info Tech. Their commitment to student success is evident in every aspect of their training program. The hands-on projects and real-world simulations prepare students for the challenges of the industry. Truly a transformative experience!"
  },
  {
    id: "g-4",
    name: "Ananya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Full Stack Engineer",
    company: "Wipro",
    lpa: "8.5 LPA",
    rating: 5,
    timeAgo: "1 month ago",
    location: "Bangalore",
    tag: "Full Stack",
    review:
      "Micron Info Tech exceeded all my expectations. The curriculum is cutting-edge and aligned with industry standards. The faculty's personalized attention and placement cell made my dream job a reality. Truly grateful for the mentorship and placement support!"
  },
  {
    id: "g-5",
    name: "Rohit Deshmukh",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    role: "Data Analyst",
    company: "Deloitte",
    lpa: "12.5 LPA",
    rating: 5,
    timeAgo: "2 weeks ago",
    location: "Bangalore",
    tag: "Data Analytics",
    review:
      "Coming from a non-CS background, I was intimidated by Python and Machine Learning. The trainers broke down every mathematical intuition and SQL query into real-world projects. Placed at Deloitte within 30 days of completing the course!"
  },
  {
    id: "g-6",
    name: "Pooja Hegde",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    role: "Digital Marketer",
    company: "Amazon India",
    lpa: "9.2 LPA",
    rating: 5,
    timeAgo: "3 months ago",
    location: "Bangalore",
    tag: "Digital Marketing",
    review:
      "The best institute in Bangalore hands down. Practical live ad spends, SEO audit case studies, and mock interviews helped me crack multiple rounds with confidence. Highly recommend anyone looking to upskill!"
  },
  {
    id: "g-7",
    name: "Joseph Fernandes",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    role: "AWS DevOps Engineer",
    company: "Amazon Web Services",
    lpa: "40 LPA",
    rating: 5,
    timeAgo: "1 month ago",
    location: "Bangalore",
    tag: "Cloud Architect",
    review:
      "I joined with 8 LPA as a basic sysadmin. The hands-on Kubernetes, Terraform and AWS live infrastructure labs gave me the confidence to crack Amazon's bar-raiser interviews. Secured a 400% jump to 40 LPA!"
  },
  {
    id: "g-8",
    name: "Jayanthi R.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "Performance Marketer",
    company: "Zomato",
    lpa: "20 LPA",
    rating: 5,
    timeAgo: "3 weeks ago",
    location: "Bangalore",
    tag: "Career Switch",
    review:
      "From a non-IT content writing role at 4.2 LPA to 20 LPA at Zomato. The real budget campaigns we ran during training gave me real numbers to discuss during executive interviews. Highly recommend!"
  }
];

// Row 1 Students with Real Human CDN Portraits & CDN Logos
export const PLACED_ROW_1: StudentPlacementCard[] = [
  {
    id: "r1-1",
    name: "Sanjeev Sukla",
    package: "9 LPA",
    role: "AI Engineer",
    company: "TechMahindra",
    logo: "https://inventateq.b-cdn.net/placed-companies/mahindra.webp",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "m"
  },
  {
    id: "r1-2",
    name: "Sukumar Roy",
    package: "5 LPA",
    role: "Data Scientist",
    company: "Accenture",
    logo: "https://inventateq.b-cdn.net/placed-companies/deloitte.webp",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "m"
  },
  {
    id: "r1-3",
    name: "Jagjith Rathode",
    package: "8 LPA",
    role: "Machine Learning Engineer",
    company: "Deloitte",
    logo: "https://inventateq.b-cdn.net/placed-companies/deloitte.webp",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "m"
  },
  {
    id: "r1-4",
    name: "Lipika Shah",
    package: "4 LPA",
    role: "AI Engineer",
    company: "Infosys",
    logo: "https://inventateq.b-cdn.net/placed-companies/Infosys.webp",
    avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r1-5",
    name: "Pramod",
    package: "5.2 LPA",
    role: "ServiceNow Developer",
    company: "Microsoft",
    logo: "https://inventateq.b-cdn.net/placed-companies/microsoft.webp",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "m"
  },
  {
    id: "r1-6",
    name: "Vihaana",
    package: "5.7 LPA",
    role: "Android Developer",
    company: "Google",
    logo: "https://inventateq.b-cdn.net/placed-companies/google.webp",
    avatar: "https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r1-7",
    name: "Navya",
    package: "6 LPA",
    role: "Android Developer",
    company: "Zomato",
    logo: "https://inventateq.b-cdn.net/placed-companies/zomato.webp",
    avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r1-8",
    name: "Karthik",
    package: "7 LPA",
    role: "Android Developer",
    company: "AWS",
    logo: "https://inventateq.b-cdn.net/placed-companies/aws.webp",
    avatar: "https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "m"
  }
];

// Row 2 Students with Real Human CDN Portraits & CDN Logos
export const PLACED_ROW_2: StudentPlacementCard[] = [
  {
    id: "r2-1",
    name: "Prachi",
    package: "5 LPA",
    role: "HR Executive",
    company: "Paytm",
    logo: "https://inventateq.b-cdn.net/placed-companies/paytm.webp",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r2-2",
    name: "Rafiya",
    package: "7 LPA",
    role: "Data Scientist",
    company: "Cloudera",
    logo: "https://inventateq.b-cdn.net/placed-companies/cloudera.webp",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r2-3",
    name: "Rudra Lakshmi",
    package: "10 LPA",
    role: "Brand Marketing Specialist",
    company: "Gojek",
    logo: "https://inventateq.b-cdn.net/placed-companies/Gojek.webp",
    avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r2-4",
    name: "Andro",
    package: "8.2 LPA",
    role: "AI Engineer",
    company: "Cognizant",
    logo: "https://inventateq.b-cdn.net/placed-companies/cognizant.webp",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "m"
  },
  {
    id: "r2-5",
    name: "Rekha",
    package: "8.5 LPA",
    role: "Performance Marketer",
    company: "Salesforce",
    logo: "https://inventateq.b-cdn.net/placed-companies/salesforce.webp",
    avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r2-6",
    name: "Jestina",
    package: "4.3 LPA",
    role: "Digital marketing specialist",
    company: "Stripe",
    logo: "https://inventateq.b-cdn.net/placed-companies/stripe.webp",
    avatar: "https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  },
  {
    id: "r2-7",
    name: "Sasidharan",
    package: "8 LPA",
    role: "Performance Marketer",
    company: "Atlys",
    logo: "https://inventateq.b-cdn.net/placed-companies/atlys.webp",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "m"
  },
  {
    id: "r2-8",
    name: "Vanaya",
    package: "4.3 LPA",
    role: "AI Engineer",
    company: "Soft India",
    logo: "https://inventateq.b-cdn.net/placed-companies/softindia.webp",
    avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gender: "f"
  }
];

export const PLACED_STUDENTS_SUMMARY = [...PLACED_ROW_1, ...PLACED_ROW_2];

export const REVIEW_FAQS: ReviewFaq[] = [
  {
    id: "rf-1",
    question: "Is Micron Info Tech Genuine?",
    answer:
      "Yes, Micron Info Tech is a genuine and reputable training institute known for its high-quality educational programs. Established in 2010, Micron Info Tech has a solid track record of providing practical, industry-relevant training in various fields such as Data Science, Digital Marketing, Python programming, and more. The institute is recognized for its hands-on approach, experienced instructors, and commitment to student success. Micron Info Tech also offers robust placement support, helping students secure jobs in top companies. With numerous positive testimonials and success stories from alumni, Micron Info Tech stands as a trustworthy and reliable choice for professional training and career advancement."
  },
  {
    id: "rf-2",
    question: "Is Micron Info Tech Legit?",
    answer:
      "Yes, Micron Info Tech is a legitimate training institute with a proven history of delivering quality education and excellent placement support. The institute is known for its wide range of courses, including Data Science, Artificial Intelligence, and Python programming, taught by experienced industry professionals. Micron Info Tech focuses on practical training and real-time projects, ensuring that students gain the skills needed for their careers. The institute's dedication to student success is evident in its high placement rates and numerous positive reviews. Micron Info Tech's legitimacy is further reinforced by its partnerships with top companies and its reputation for excellence in training and education."
  },
  {
    id: "rf-3",
    question: "How Good is Micron Info Tech?",
    answer:
      "Micron Info Tech is highly regarded for its quality training programs and student-centric approach. The institute offers a variety of courses designed to meet the demands of the job market, with a strong emphasis on practical skills and hands-on experience. Micron Info Tech employs experienced industry professionals as instructors, ensuring that students receive up-to-date knowledge and skills. The institute's comprehensive placement support includes resume building, interview preparation, and job referrals, helping students secure positions in top companies. Positive feedback from alumni and high placement rates attest to the effectiveness of Micron Info Tech's training programs. Overall, Micron Info Tech is an excellent choice for anyone looking to enhance their skills and career prospects."
  },
  {
    id: "rf-4",
    question: "What are the Ratings and Reviews of Micron Info Tech?",
    answer:
      "Micron Info Tech has received numerous positive ratings and reviews from its students and alumni. Micron Info Tech is rated 4.9 out of 5 based on thousands of already placed students. The institute is praised for its practical training approach, experienced instructors, and strong placement support. Many students have highlighted the hands-on projects and real-time case studies as key aspects of their learning experience. Micron Info Tech's commitment to student success is evident in the high placement rates and the success stories of its alumni. On various review platforms, the institute consistently receives high ratings, reflecting its reputation for quality education and effective career support. These positive reviews and ratings make Micron Info Tech a top choice for professional training."
  },
  {
    id: "rf-5",
    question: "What are the Reviews of Micron Info Tech Offline Batches?",
    answer:
      "Micron Info Tech's offline batches have received positive reviews for their interactive and immersive learning experience. Students appreciate the in-person interaction with instructors, which allows for immediate feedback and personalized guidance. The hands-on training and real-time projects offered in the offline batches enhance practical learning and skill development. The institute's state-of-the-art facilities and access to resources also contribute to a conducive learning environment. Many students have praised the offline batches for their effectiveness in preparing them for the job market, with numerous success stories of alumni securing positions in top companies. Overall, the offline batches at Micron Info Tech are well-regarded for their quality and impact."
  },
  {
    id: "rf-6",
    question: "What are the Reviews of Micron Info Tech Online Batches?",
    answer:
      "Micron Info Tech's online batches have garnered positive reviews for their flexibility and comprehensive curriculum. Students appreciate the convenience of learning from home while still receiving high-quality instruction and support. The online batches include live interactive sessions, recorded lectures, and access to various learning resources, ensuring a thorough understanding of the subjects. Micron Info Tech's online courses also feature hands-on projects and real-time case studies, providing practical experience. The institute's robust placement support extends to online students as well, with many alumni securing jobs in reputed companies. The positive reviews and ratings highlight their effectiveness in delivering quality education and career support."
  },
  {
    id: "rf-7",
    question: "How Micron Info Tech is Better Than Others?",
    answer:
      "Micron Info Tech stands out from other training institutes due to its practical, hands-on approach to learning, experienced instructors, and strong placement support. The institute offers a wide range of courses that are designed to meet the current demands of the job market. Micron Info Tech's focus on real-time projects and industry-relevant skills ensures that students are well-prepared for their careers. The dedicated placement cell assists students with resume building, interview preparation, and job referrals, resulting in high placement rates. Additionally, Micron Info Tech's positive reviews and success stories from alumni highlight its effectiveness in providing quality education and career advancement. This commitment to student success makes Micron Info Tech a preferred choice for professional training."
  }
];
