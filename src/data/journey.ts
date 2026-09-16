export const journeyData = [
  {
    id: "foundations",
    chapter: "01. FOUNDATIONS",
    description: "AI is not magic. It's mathematics at scale.",
    topics: [
      { id: "what-is-ai", title: "What is AI?" },
      { id: "what-is-ml", title: "What is Machine Learning?" },
      { id: "how-does-ai-learn", title: "How Does AI Learn from Data?" },
      { id: "data-representation", title: "Data Representation" },
      { id: "numbers-features-patterns", title: "Numbers, Features & Patterns" },
      { id: "vectors-tensors-foundations", title: "Vectors & Tensors" }
    ]
  },
  {
    id: "translate",
    chapter: "02. TRANSLATE",
    description: "Translating reality into numbers.",
    topics: [
      { id: "images-to-matrices", title: "Images → Pixels → Matrices" },
      { id: "text-to-numbers", title: "Text → Tokens → Numbers" },
      { id: "audio-to-numbers", title: "Audio → Signals → Numbers" },
      { id: "features", title: "Features" },
      { id: "matrices", title: "Matrices" },
      { id: "vectors", title: "Vectors" },
      { id: "dot-products", title: "Dot Products" },
      { id: "tiny-bit-geometry", title: "A Tiny Bit of Geometry" }
    ]
  },
  {
    id: "predict",
    chapter: "03. PREDICT",
    description: "From data points to decision boundaries.",
    topics: [
      { id: "what-model-does", title: "What Does a Model Actually Do?" },
      { id: "linear-regression", title: "Linear Regression" },
      { id: "weights", title: "Weights" },
      { id: "bias", title: "Bias" },
      { id: "prediction-equation", title: "The Prediction Equation" },
      { id: "neurons", title: "Neurons" },
      { id: "activation-functions", title: "Activation Functions" },
      { id: "probability-confidence", title: "Probability & Confidence" }
    ]
  },
  {
    id: "error",
    chapter: "04. ERROR",
    description: "How wrong is wrong? Measuring mistakes.",
    topics: [
      { id: "ai-gets-it-wrong", title: "AI Gets It Wrong" },
      { id: "prediction-vs-reality", title: "Prediction vs Reality" },
      { id: "loss", title: "Loss" },
      { id: "loss-functions", title: "Loss Functions" },
      { id: "mean-squared-error", title: "Mean Squared Error" },
      { id: "cross-entropy", title: "Cross-Entropy" },
      { id: "why-ai-needs-score", title: "Why AI Needs a Score for Being Wrong" }
    ]
  },
  {
    id: "learn",
    chapter: "05. LEARN",
    description: "Following the slope downhill.",
    topics: [
      { id: "functions", title: "Functions" },
      { id: "change", title: "Change" },
      { id: "slope", title: "Slope" },
      { id: "derivatives", title: "Derivatives" },
      { id: "partial-derivatives", title: "Partial Derivatives" },
      { id: "gradients", title: "Gradients" },
      { id: "gradient-descent", title: "Gradient Descent" }
    ]
  },
  {
    id: "optimize",
    chapter: "06. OPTIMIZE",
    description: "Propagating errors backward through layers.",
    topics: [
      { id: "optimization", title: "Optimization" },
      { id: "learning-loop", title: "The Learning Loop" },
      { id: "forward-pass", title: "Forward Pass" },
      { id: "error-calculation", title: "Error" },
      { id: "backpropagation", title: "Backpropagation" },
      { id: "learning-rate", title: "Learning Rate" },
      { id: "optimization-algorithms", title: "Optimization Algorithms" },
      { id: "putting-it-together", title: "Putting It Together" }
    ]
  },
  {
    id: "generalize",
    chapter: "07. GENERALIZE",
    description: "Learning patterns, not noise.",
    topics: [
      { id: "training-data", title: "Training Data" },
      { id: "test-data", title: "Test Data" },
      { id: "validation", title: "Validation" },
      { id: "overfitting", title: "Overfitting" },
      { id: "underfitting", title: "Underfitting" },
      { id: "bias-variance", title: "Bias & Variance" },
      { id: "statistics-learning", title: "Statistics Behind Learning" },
      { id: "generalization", title: "Generalization" }
    ]
  },
  {
    id: "represent-meaning",
    chapter: "08. REPRESENT MEANING",
    description: "Where words become geometry.",
    topics: [
      { id: "geometry-data", title: "Geometry of Data" },
      { id: "similarity", title: "Similarity" },
      { id: "distance", title: "Distance" },
      { id: "vectors-meaning", title: "Vectors as Meaning" },
      { id: "embeddings", title: "Embeddings" },
      { id: "word-embeddings", title: "Word Embeddings" },
      { id: "semantic-space", title: "Semantic Space" },
      { id: "why-similar-close", title: "Why Similar Things End Up Close Together" }
    ]
  },
  {
    id: "connect",
    chapter: "09. CONNECT",
    description: "Attention is all you need.",
    topics: [
      { id: "information", title: "Information" },
      { id: "attention-similarity", title: "Similarity" },
      { id: "qkv", title: "Queries, Keys & Values" },
      { id: "attention", title: "Attention" },
      { id: "self-attention", title: "Self-Attention" },
      { id: "information-flow", title: "Information Flow" },
      { id: "transformers", title: "Transformers" },
      { id: "why-attention-changed", title: "Why Attention Changed AI" }
    ]
  },
  {
    id: "train-ai",
    chapter: "10. TRAIN AI",
    description: "Putting it all together.",
    topics: [
      { id: "full-learning-loop", title: "The Full Learning Loop" },
      { id: "training-nn", title: "Training a Neural Network" },
      { id: "language-models", title: "Language Models" },
      { id: "llms", title: "Large Language Models" },
      { id: "token-embedding-attention", title: "Token → Embedding → Attention → Prediction" },
      { id: "training-llm", title: "Training an LLM" },
      { id: "synthesis", title: "Synthesis: Everything We Learned" },
      { id: "mini-ai-trainer", title: "Mini AI Trainer" }
    ]
  }
];
