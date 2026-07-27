const projectsData = {
  "project-1": {
    title: "Groww AI Ops Automator",
    category: "AI/ML & Full-Stack",
    whatItIs: "An end-to-end LLM pipeline built to eliminate manual weekly reporting across scattered data sources. It aggregates live data, generates intelligence reports using a Map-Reduce architecture, and dispatches them via a custom MCP server, creating complete visibility for product teams.",
    role: "Lead Developer & Product Manager — Architected the entire pipeline from conceptualization to deployment, ensuring adherence to strict anti-hallucination and PII compliance standards.",
    tech: ["Python", "LangChain", "Map-Reduce", "MCP Server", "Groq LLM", "Docker"],
    highlights: [
      "Built a robust Map-Reduce LLM pipeline for large-scale data processing",
      "Integrated custom MCP server for seamless data dispatch",
      "Enforced strict anti-hallucination constraints via KB-grounded prompting",
      "Implemented comprehensive PII compliance checks before data ingestion"
    ],
    deliverables: ["Architecture Design", "Automated Reporting Pipeline", "Compliance Guardrails System"],
    image: "assets/project-one.png?v=3"
  },
  "project-2": {
    title: "Groww Mutual Fund RAG Assistant",
    category: "AI/ML",
    whatItIs: "A production-grade Retrieval-Augmented Generation (RAG) system designed to provide highly accurate, real-time Q&A for mutual funds. It strictly adheres to financial regulations by refusing advisory queries and supplying only factual information.",
    role: "Full-Stack AI Engineer — Designed the vector database architecture, built the automated ingestion pipeline, and developed the Next.js frontend interface.",
    tech: ["FastAPI", "ChromaDB", "Next.js", "Tailwind CSS", "HuggingFace Embeddings", "Llama-3"],
    highlights: [
      "Deployed on Render + Vercel with a nightly GitHub Actions CI/CD pipeline",
      "Built custom offline scraper for automated daily HTML-to-Text ingestion",
      "Integrated a specialized QueryClassifier to block non-factual or advisory financial queries",
      "Achieved sub-second retrieval latency using local ChromaDB vector embeddings"
    ],
    deliverables: ["Full-Stack Application", "Automated Data Ingestion Pipeline", "Regulatory Guardrail Module"],
    image: "assets/project-rag.png?v=2"
  },
  "project-3": {
    title: "Emergency Order Fulfillment Platform",
    category: "Supply Chain",
    whatItIs: "A robust logistics routing and fulfillment platform designed for critical, high-priority emergency orders. It dynamically calculates the most efficient dispatch routes and provides real-time tracking for logistics partners.",
    role: "Product Manager — Led the discovery phase, defined operational metrics, and oversaw the MVP rollout across three regional dark stores.",
    tech: ["Node.js", "React", "PostgreSQL", "Google Maps API", "Redis"],
    highlights: [
      "Reduced average emergency dispatch times by 34% in the first quarter",
      "Implemented a real-time WebSocket dashboard for warehouse operators",
      "Designed an automated fallback routing algorithm for unavailable delivery partners",
      "Integrated seamlessly with existing warehouse management systems (WMS)"
    ],
    deliverables: ["Product Requirement Document", "Routing Algorithm Specifications", "MVP Application"],
    image: "assets/project-fulfillment.png?v=2"
  },
  "project-4": {
    title: "PO Match Buddy",
    category: "Supply Chain Automation",
    whatItIs: "An intelligent, automated reconciliation tool designed to cross-reference and match purchase orders against invoices and delivery receipts, eliminating hours of manual ledger work for procurement teams.",
    role: "Product Owner — Conducted user interviews with the finance team, prioritized the feature backlog, and managed sprint delivery.",
    tech: ["Python", "Pandas", "OCR (Tesseract)", "Django", "Vue.js"],
    highlights: [
      "Automated the reconciliation of over 5,000 purchase orders monthly",
      "Integrated OCR to extract line items from scanned PDF invoices with 98% accuracy",
      "Built an intuitive exception-handling UI for edge-case manual approvals",
      "Reduced procurement cycle times by 4 days on average"
    ],
    deliverables: [
      "User Journey Maps", 
      "Automated Reconciliation Engine", 
      "Internal Dashboard",
      "<a href='https://po-match-buddy.lovable.app' target='_blank' style='color: var(--accent); text-decoration: underline; font-weight: bold;'>Live working app ↗</a>"
    ],
    image: "assets/project-po-match.png?v=2"
  },
  "project-5": {
    title: "Kharch",
    category: "Full-Stack FinTech",
    whatItIs: "A comprehensive personal finance application designed to help users track expenses, manage budgets, and build better financial habits through gamification and real-time spend analytics.",
    role: "Creator & Lead Developer — Built the entire application end-to-end, focusing on a mobile-first, highly responsive user experience.",
    tech: ["React Native", "Expo", "Firebase", "Node.js", "Chart.js"],
    highlights: [
      "Developed an intuitive mobile-first dashboard with real-time spend analytics",
      "Implemented a custom categorization engine for automatic expense sorting",
      "Designed a Gamified Savings Module that increased user retention by 22%",
      "Secured user financial data with AES-256 encryption"
    ],
    deliverables: [
      "Mobile Application (iOS/Android)", 
      "Backend Architecture", 
      "Go-To-Market Strategy",
      "<a href='https://kharch-simple-flow.lovable.app' target='_blank' style='color: var(--accent); text-decoration: underline; font-weight: bold;'>Live working app ↗</a>"
    ],
    image: "assets/project-kharch-spend.png?v=2"
  }
};
