export interface CorporateClient {
  name: string;
  logo: string;
  course: string;
  description: string;
  badge?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  logo?: string;
  industry: string;
  trainingDomain: string;
  cohortSize: string;
  duration: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const CORPORATE_CLIENTS: CorporateClient[] = [
  {
    name: "Accenture",
    logo: "/logos/accenture.svg",
    course: "Data Science & GenAI Course",
    description: "Upskilling 450+ software engineers in enterprise predictive modeling, Python ML stacks, and LLM implementations.",
    badge: "Enterprise Cohort"
  },
  {
    name: "Ministry of Defence",
    logo: "/logos/defence.svg",
    course: "Executive Soft Skills & Cyber Security",
    description: "Specialized training program for senior defense officials focusing on secure communication and leadership.",
    badge: "Govt Project"
  },
  {
    name: "Canara Bank",
    logo: "/logos/canarabank.svg",
    course: "Oracle SQL, PL/SQL & High-Volume DB",
    description: "Core banking database performance tuning, stored procedure optimization, and high availability systems.",
    badge: "Banking & FinTech"
  },
  {
    name: "HP (Hewlett-Packard)",
    logo: "/logos/hp.svg",
    course: "Data Analytics & Enterprise Power BI",
    description: "Global business analytics training for supply chain analysts and regional operations leaders.",
    badge: "Analytics"
  },
  {
    name: "Maruti Suzuki",
    logo: "/logos/marutisuzuki.svg",
    course: "Data Science & Advanced AI Systems",
    description: "Automotive telemetry analytics, computer vision defect detection, and predictive maintenance algorithms.",
    badge: "Automotive AI"
  },
  {
    name: "Honeywell",
    logo: "/logos/honeywell.svg",
    course: "Microsoft Azure & Azure Databricks",
    description: "Cloud-native data lakehouse architecture, ETL streaming with Spark, and IoT data processing.",
    badge: "Cloud Data"
  },
  {
    name: "Victoria's Secret",
    logo: "/logos/victoriasecret.svg",
    course: "Full Stack Web Development",
    description: "Modernizing ecommerce web applications with Next.js, React, Node microservices, and GraphQL APIs.",
    badge: "Retail & Ecommerce"
  },
  {
    name: "Altimetrik",
    logo: "/logos/altimetrik.svg",
    course: "TIBCO, GCP & Cloud BigData",
    description: "Transitioning lateral engineers to Google Cloud Platform data engineering pipelines and AEM.",
    badge: "Cloud BigData"
  },
  {
    name: "Emerson",
    logo: "/logos/emerson.svg",
    course: "Azure Integration Services & Databricks",
    description: "Enterprise application integration with Azure Logic Apps, Event Hubs, and distributed data lakes.",
    badge: "Industrial Automation"
  },
  {
    name: "Hexaware",
    logo: "/logos/hexaware.svg",
    course: "Software Testing SDET for Campus Hires",
    description: "3-month bootcamp transforming 320 campus hires into certified Selenium and RestAssured automation engineers.",
    badge: "Campus Enablement"
  },
  {
    name: "IMS Hospital",
    logo: "/logos/imshospital.svg",
    course: "Salesforce Health Cloud & Marketing Cloud",
    description: "Patient relationship management, HIPAA-compliant patient communication funnels, and reporting.",
    badge: "Healthcare CRM"
  },
  {
    name: "Mouri Tech",
    logo: "/logos/mouritech.svg",
    course: "Salesforce Admin, Developer & MuleSoft",
    description: "Integration architecture connecting legacy ERPs with Salesforce Cloud using MuleSoft Anypoint.",
    badge: "MuleSoft Certified"
  },
  {
    name: "Mphasis",
    logo: "/logos/mphasis.svg",
    course: "DevOps, Docker & Kubernetes Orchestration",
    description: "Production containerization, GitOps deployment with ArgoCD, and site reliability engineering.",
    badge: "DevOps & Cloud"
  },
  {
    name: "Mu Sigma",
    logo: "/logos/musigma.svg",
    course: "Python Data Science & Technical MySQL",
    description: "Statistical modeling foundations, Pandas data manipulation, and high-performance SQL query design.",
    badge: "Big Data Analytics"
  },
  {
    name: "Press Ganey",
    logo: "/logos/pressganey.svg",
    course: "Amazon Web Services (AWS) Architecture",
    description: "Multi-tenant cloud infrastructure, HIPAA-compliant security perimeters, and automated CI/CD.",
    badge: "AWS Certified"
  },
  {
    name: "Qantile",
    logo: "/logos/qantile.svg",
    course: "Full Stack Java, Apache Kafka & React",
    description: "Event-driven distributed systems, microservices with Spring Boot, and reactive frontends.",
    badge: "Microservices"
  }
];

export const CORPORATE_CASE_STUDIES: CaseStudy[] = [
  {
    id: "wipro-aws",
    client: "Wipro Limited",
    logo: "/logos/wipro.svg",
    industry: "Global IT Services",
    trainingDomain: "AWS Cloud & DevOps Engineering",
    cohortSize: "280 Fresh Engineers",
    duration: "8 Weeks Intensive Bootcamp",
    challenge: "Wipro onboarded 280+ fresh engineering campus recruits who needed immediate production deployment readiness on AWS cloud infrastructure for critical client engagements.",
    solution: "MicronInfoTech designed a dedicated full-time immersive bootcamp with 70% live sandbox lab hours, automated code review, AWS exam simulations, and real architecture drills.",
    impactMetrics: [
      { label: "AWS Exam Pass Rate", value: "98.4%" },
      { label: "Deployment Readiness", value: "100%" },
      { label: "Productivity Gain", value: "40%" },
      { label: "Client Billability", value: "Within 2 Weeks" }
    ],
    testimonial: {
      quote: "MicronInfoTech's corporate training bridged the academic-to-enterprise gap effortlessly. The engineers were production-ready on day one after graduation.",
      author: "Venkatesh Rao",
      role: "Associate VP - Learning & Development, Wipro"
    }
  },
  {
    id: "infosys-devops",
    client: "Infosys",
    logo: "/logos/infosys.svg",
    industry: "Enterprise Software & Consulting",
    trainingDomain: "Cloud-Native Kubernetes & Microservices",
    cohortSize: "160 Senior Developers",
    duration: "6 Weeks Modular Weekend Sessions",
    challenge: "Legacy monolithic Java development teams required upskilling to modern containerized microservices architectures, Dockerization, and Kubernetes cluster orchestration.",
    solution: "Custom weekend modules delivered by principal cloud architects from leading tech firms, featuring live chaos engineering simulations and real-world microservices migration.",
    impactMetrics: [
      { label: "Release Cycle Time", value: "-65%" },
      { label: "Incident Downtime", value: "-45%" },
      { label: "Team NPS Score", value: "94/100" },
      { label: "Average Bonus Boost", value: "~35%" }
    ],
    testimonial: {
      quote: "The hands-on labs and mentor feedback were invaluable. Our teams successfully migrated two mission-critical microservices during the course of the training.",
      author: "Sunita Krishnamurthy",
      role: "Technical Delivery Director, Infosys"
    }
  },
  {
    id: "accenture-datascience",
    client: "Accenture",
    logo: "/logos/accenture.svg",
    industry: "Management Consulting & Technology",
    trainingDomain: "Data Science, Machine Learning & NLP",
    cohortSize: "210 Lateral Consultants",
    duration: "10 Weeks Hybrid Program",
    challenge: "Business consultants needed deep technical capabilities in predictive modeling, feature engineering, and Natural Language Processing to deliver AI proposals.",
    solution: "MicronInfoTech built a high-intensity hands-on curriculum focused on real-world retail, banking, and telecom datasets with end-to-end ML model deployment.",
    impactMetrics: [
      { label: "Client Proposal Wins", value: "3.2x" },
      { label: "Model Deployment Speed", value: "+50%" },
      { label: "Graduation Rate", value: "99.1%" },
      { label: "Satisfaction Rating", value: "4.9/5" }
    ],
    testimonial: {
      quote: "Exceptional curriculum and world-class instructors. The mentors brought enterprise context that textbooks simply cannot match.",
      author: "Rohit Malhotra",
      role: "Lead Analytics Partner, Accenture Digital"
    }
  },
  {
    id: "canara-bank-oracle",
    client: "Canara Bank",
    logo: "/logos/canarabank.svg",
    industry: "Public Sector Banking",
    trainingDomain: "Oracle SQL, PL/SQL & Core Database Tuning",
    cohortSize: "95 Technical Database Admins",
    duration: "4 Weeks Onsite Classroom Training",
    challenge: "Bank IT personnel needed specialized skills in transaction isolation levels, partition optimization, and disaster recovery to handle surge UPI transactions.",
    solution: "Experienced Oracle Certified Masters provided onsite live lab drills on enterprise database servers with simulated peak transaction loads.",
    impactMetrics: [
      { label: "Query Execution Speed", value: "4.8x faster" },
      { label: "Batch Job Latency", value: "-60%" },
      { label: "Zero Disruption", value: "100%" },
      { label: "Skill Certification", value: "100% Passed" }
    ],
    testimonial: {
      quote: "Our core batch processing latency dropped significantly after the performance tuning techniques taught by MicronInfoTech's database experts.",
      author: "P. R. Sharma",
      role: "Chief General Manager (IT), Canara Bank"
    }
  }
];

