/* ===== EDIT YOUR DETAILS HERE (the only file you need for content) ===== */
const SITE = {
  name: "Ankit Singh",
  email: "ankitclx@gmail.com",
  github: "https://github.com/Ankit-20285",
  linkedin: "https://www.linkedin.com/in/ankit-singh-558061426/",
  leetcode: "https://leetcode.com/ankit_0517",          
  leetcodeSolved: "350+",                      // update over time
  resume: { path: "assets/Ankit_Singh_Resume.pdf", filename: "Ankit_Singh_Resume.pdf" },

  // Projects: set github to the repo URL (empty = shows "Repository coming soon").
  // Set demo to a deployed URL to show a Live Demo button (empty = no button).
  projects: [
    { title: "VisionAI API", featured: true, kind: "FastAPI + CNN",
      description: "A six-class image classifier (buildings, forest, glacier, mountain, sea, street) powered by a trained CNN and served through a FastAPI backend.",
      points: ["TensorFlow/Keras image classification model", "FastAPI prediction endpoint with Pydantic response schemas", "Frontend for uploading images and viewing predictions", "SQLite prediction history and pytest API tests"],
      tech: ["TensorFlow", "Keras", "FastAPI", "Pydantic", "SQLite", "pytest"], github: "https://github.com/Ankit-20285/Image-Classification", demo: "" },
    { title: "Cats vs Dogs Classifier", kind: "CNN",
      description: "A convolutional neural network that classifies images as cats or dogs.",
      tech: ["TensorFlow", "Keras", "Computer Vision", "Model Training"], github: "https://github.com/Ankit-20285/Cats-vs-Dogs-CNN-Classifier", demo: "" },
    { title: "House Price Prediction", kind: "Regression",
      description: "A supervised ML project that predicts house prices from property-related features.",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn"], github: "https://github.com/Ankit-20285/House-Price-Prediction", demo: "" },
    { title: "Loan Approval Prediction", kind: "Classification",
      description: "A classification project that estimates loan approval outcomes from applicant information, with an interactive Streamlit demo.",
      tech: ["Python", "Pandas", "Scikit-learn", "Streamlit"], github: "https://github.com/Ankit-20285/Loan-Approval-Prediction", demo: "" },
    { title: "Salary Prediction", kind: "Regression",
      description: "A regression project exploring how input features relate to salary predictions.",
      tech: ["Python", "Pandas", "Scikit-learn"], github: "https://github.com/Ankit-20285/Salary-Prediction", demo: "" }
  ]
};
