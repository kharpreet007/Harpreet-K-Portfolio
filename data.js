const projectsData = {
  "project-1": {
    title: "Groww Review Pulse",
    category: "AI/ML & Full-Stack",
    whatItIs: "An automated weekly \"pulse\" that turns public Google Play Store reviews for Groww into a one-page insight report and delivers it to stakeholders through Google Workspace, using MCP (Model Context Protocol) so that writes to Google Docs and Gmail go through dedicated MCP servers—not ad hoc API calls inside the agent.",
    markdownFile: "docs/project-1.md",
    githubLink: "https://github.com/kharpreet007/Grow-Pulse.git",
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
    title: "Mutual Fund FAQ Assistant",
    category: "AI/ML",
    whatItIs: "A lightweight, facts-only FAQ assistant for mutual fund schemes using a Retrieval-Augmented Generation (RAG) approach. It retrieves verifiable information exclusively from official public sources (AMC, AMFI, SEBI) while strictly refusing any investment advice or recommendations.",
    markdownFile: "docs/project-2.md",
    githubLink: "https://github.com/kharpreet007/RAG-Mutual-Fund-CHATBOT.git",
    role: "Full-Stack AI Engineer — Designed the vector database architecture, built the automated ingestion pipeline, and developed the Next.js frontend interface.",
    tech: ["FastAPI", "ChromaDB", "Next.js", "Tailwind CSS", "HuggingFace Embeddings", "Llama-3"],
    highlights: [
      "Ensures responses are limited to 3 sentences with exactly one verified citation link",
      "Implements strict refusal handling for non-factual or advisory queries",
      "Retrieves data exclusively from official public sources without collecting PII",
      "Provides clear source linking and a last updated date for maximum transparency"
    ],
    deliverables: ["Minimal UI", "README Document", "Disclaimer Snippet"],
    image: "assets/project-rag.png?v=2"
  },

  "project-4": {
    title: "PO Match Buddy",
    category: "Supply Chain Automation",
    whatItIs: "An intelligent, automated reconciliation tool designed to cross-reference and match purchase orders against invoices and delivery receipts, eliminating hours of manual ledger work for procurement teams.",
    markdownFile: "docs/project-4.md",
    githubLink: "https://github.com/kharpreet007/po-match-buddy.git",
    demoLink: "https://preview--po-match-buddy.lovable.app/auth",
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
    markdownFile: "docs/project-5.md",
    githubLink: "https://github.com/kharpreet007/kharch-spend-smart.git",
    demoLink: "https://preview--kharch-simple-flow.lovable.app/",
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
  },
  "project-6": {
    title: "Blinkit Trust Decision Layer",
    category: "Product Strategy & Growth",
    whatItIs: "A prototype-level feature designed to test whether surfacing targeted, category-specific trust signals at the point of purchase hesitation measurably reduces first-purchase friction in new categories.",
    markdownFile: "docs/project-6.md",
    githubLink: "https://github.com/kharpreet007/blinkit-trust-panel-demo.git",
    demoLink: "https://preview--blink-ai-halo-effect.lovable.app/",
    role: "Product Manager — Conducted user research, formulated hypotheses, and designed the feature prototype.",
    tech: ["Product Strategy", "User Research", "Prototyping", "UX Design"],
    highlights: [
      "Identified that first-time category hesitation stems from a lack of trust signals rather than lack of intent",
      "Designed a context-aware panel to render trust signals dynamically beneath the Add-to-Cart button",
      "Built resilient logic to handle cold-start products without fabricating data (e.g. hiding empty review counts)",
      "Integrated seamlessly without adding friction or cluttering the core experience for repeat buyers"
    ],
    deliverables: ["Product Requirements Document", "Interactive Prototype"],
    image: "assets/project-blinkit.png"
  }
};
