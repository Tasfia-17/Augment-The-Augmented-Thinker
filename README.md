# Augment: The Augmented Thinker

*A personal AI thinking partner for capturing, connecting, and reflecting on your ideas.*

**Live Application:** [https://Tasfia-17.github.io/Augment-The-Augmented-Thinker](https://Tasfia-17.github.io/Augment-The-Augmented-Thinker)


## Philosophy

Augment is more than just a note-taking app; it's a **cognitive augmentation system**. It's designed to be a calm, intelligent digital space where you can externalize your thoughts and have them enriched by an AI partner. The core goal is to help you see patterns, connect ideas, and generate deeper insights from your own thinking over time.

---

## Core Features

-   **✍️ Capture & Enrich:** Seamlessly jot down text or upload images. Each entry is met with a reflective comment from your AI partner, which also intelligently categorizes your thought into a relevant list.
-   **🔗 Deep Connections:** The AI acts as your extended memory. When viewing a thought, it automatically surfaces conceptually related past entries, helping you discover hidden patterns and build a web of knowledge.
-   **✨ AI-Powered Search:** Go beyond simple keyword matching. The semantic search understands the *intent* behind your query, finding the most relevant thoughts even if they don't contain the exact words you used.
-   **🔎 Analytical Lenses:** Zoom out from your timeline to see the bigger picture. Lenses like "Clarity" analyze all thoughts within the current view and generate high-level summaries of recurring themes and key ideas.
-   **🧘 Proactive Reflection:** Augment actively encourages deeper thinking. The "Reflect" mode intelligently selects a few related thoughts from your history and poses a unique, open-ended question to help you synthesize ideas in new ways.

---

## Data Privacy & Storage

**Your thoughts are your own.** This application is designed with privacy as a priority.

-   **Client-Side Storage:** All of your entries, including text and images, are stored exclusively in your browser's `localStorage`.
-   **No Server, No Cloud:** Your data is never sent to or stored on a remote server. It lives entirely on your own machine.
-   **Private to You:** This means that each user has their own separate journal. If someone else opens this application on their own computer or in a different browser profile, they will start with a fresh, empty timeline and will not be able to see your entries.

Because data is stored locally, your entries will persist between sessions on the same browser.

---

## Getting Started

This project is a static web application and does not require a complex build process.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```
2.  **Serve the project files:**
    You can use any simple local web server.
    ```bash
    # If you have Python 3 installed:
    python -m http.server

    # Or use the VS Code "Live Server" extension.
    ```
4.  Open your browser and navigate to the local server address (e.g., `http://localhost:8000`).

---

## Project Structure

The codebase is organized for simplicity and clarity:

```
.
├── index.html              # Main HTML entry point with import maps
├── index.tsx               # Root React component mount point
├── App.tsx                 # Main application component, state management, and logic
├── components/             # All reusable React components (Sidebar, MainContent, etc.)
├── services/
│   └── storageService.ts   # Functions for reading/writing thoughts to localStorage
├── types.ts                # Shared TypeScript type definitions
└── constants.ts            # Shared constants (default lists, agents, etc.)
```
