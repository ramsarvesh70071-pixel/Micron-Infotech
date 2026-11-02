export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  companies: string[];
  studentsTrained: string;
  rating: number;
  bio: string;
  skills: string[];
  achievements: string[];
  quote: string;
}

export const MENTORS_LIST: MentorProfile[] = [
  {
    id: "kuldeep-mishra",
    name: "Kuldeep Mishra",
    title: "Chief Digital Marketing & SEO Mentor",
    specialization: "SEO, Performance Marketing & Conversion Optimization",
    experienceYears: 11,
    companies: ["MicronInfoTech", "WPP Group", "Ogilvy", "GroupM"],
    studentsTrained: "4,200+",
    rating: 4.95,
    bio: "Kuldeep is a distinguished digital marketing trainer with an impressive 11 years of experience in the field. Renowned for his deep expertise in SEO, he has become a stalwart in guiding aspiring digital marketers toward success. With a proven track record, Kuldeep has successfully trained numerous batches, consistently preparing individuals who have gone on to secure placements in esteemed multinational corporations. His comprehensive knowledge, coupled with a dynamic teaching style, ensures that participants not only grasp the intricacies of digital marketing but also gain practical skills that set them on a path to thrive in the competitive industry.",
    skills: ["Technical SEO", "Google Ads (Search & Video)", "Conversion Rate Optimization", "Google Analytics 4", "High-DA Link Building", "Affiliate Funnels"],
    achievements: [
      "Trained 4,200+ students with 96% direct placement success",
      "Ranked over 5,000 high-competition keywords on Google Page #1",
      "Keynote speaker at National Digital Marketing Conclave"
    ],
    quote: "True digital marketing isn't about guesswork; it's about mastering search psychology, intent data, and algorithmic certainty."
  },
  {
    id: "python-trainer",
    name: "Shaik Arif & Senior Python Faculty",
    title: "Principal Python & Data Engineering Mentor",
    specialization: "Python Fullstack, Data Science, FastAPI & Cloud Automation",
    experienceYears: 13,
    companies: ["Ex-TCS Lead Architect", "MicronInfoTech Co-Founder", "Oracle Associate"],
    studentsTrained: "6,800+",
    rating: 4.98,
    bio: "With over 13 years of enterprise development and mentorship leadership, Arif has shaped the technical curricula for over 50 corporate clients and thousands of engineers. Specializing in Python for web development, scalable data pipelines, automation scripting, and microservices architecture, he transforms complex architectural paradigms into accessible, intuitive hands-on masteries.",
    skills: ["Python 3 Core & Advanced", "Django & FastAPI", "Data Science & Pandas", "Automated Web Scraping", "Docker & Cloud APIs", "Database Optimization"],
    achievements: [
      "Co-designed MicronInfoTech's signature 100% Job Placement syllabus",
      "Personally conducted 1,500+ mock technical interviews",
      "Mentored engineers now working at Google, Microsoft, Amazon, and Adobe"
    ],
    quote: "Writing clean code is like writing good prose — every function should tell a clear story and solve a tangible problem."
  },
  {
    id: "cloud-devops-mentor",
    name: "Rajesh Varma",
    title: "Senior AWS Solutions Architect & DevOps Lead",
    specialization: "AWS Cloud, Kubernetes, Terraform & CI/CD Pipelines",
    experienceYears: 10,
    companies: ["Ex-Cognizant Cloud Architect", "AWS Certified Ambassador"],
    studentsTrained: "3,100+",
    rating: 4.92,
    bio: "Rajesh brings a decade of enterprise cloud engineering experience, having spearheaded zero-downtime multi-cloud migrations and Kubernetes cluster deployments for Fortune 500 banks and healthcare providers. He focuses on practical infrastructure-as-code and production chaos engineering.",
    skills: ["AWS Cloud Architecture", "Kubernetes (EKS/K8s)", "Terraform IaC", "Docker Containers", "Jenkins & GitHub Actions", "Grafana & Prometheus"],
    achievements: [
      "Designed corporate DevOps bootcamps for Wipro and Infosys",
      "100% pass rate for students in AWS Solutions Architect Associate exams",
      "Author of 4 open-source Terraform enterprise modules"
    ],
    quote: "Automation is not just about saving time; it's about building reliability and engineering resilience."
  },
  {
    id: "datascience-ai-mentor",
    name: "Priya Sharma",
    title: "Lead AI & Deep Learning Research Mentor",
    specialization: "Machine Learning, LLMs, Computer Vision & PyTorch",
    experienceYears: 9,
    companies: ["Ex-IBM Watson Research", "IIIT Alum"],
    studentsTrained: "2,700+",
    rating: 4.96,
    bio: "Priya is an avid AI researcher and educator dedicated to demystifying modern machine learning. Her mentorship focuses on real-world predictive modeling, fine-tuning large language models, retrieval-augmented generation (RAG), and deploying production-grade AI microservices.",
    skills: ["PyTorch & TensorFlow", "Transformers & HuggingFace", "LangChain & Vector DBs", "Scikit-Learn", "Computer Vision (OpenCV)", "MLOps & Model Serving"],
    achievements: [
      "Guided 40+ student research papers and open-source models",
      "Trained corporate teams at Maruti Suzuki and Honeywell on generative AI",
      "Featured speaker at PyData Bangalore"
    ],
    quote: "The future belongs to those who don't just consume AI, but understand how to build, fine-tune, and orchestrate it."
  }
];

