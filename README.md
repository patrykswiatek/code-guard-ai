# CodeGuardAI

CodeGuardAI is an application designed to enhance the code review process by automatically checking uncommitted changes and utilizing OpenAI's powerful code analysis capabilities to determine if the code is up to standard or requires improvements.

## Features

- **Automated Code Analysis**: Scans your uncommitted changes for potential issues.
- **OpenAI Integration**: Uses OpenAI's algorithms to assess code quality.
- **Immediate Feedback**: Provides suggestions for improvements before committing.
- **Customizable Prompts**: Includes a `prompts.ts` file to add prompts for different file extensions.

## Getting Started

### Prerequisites

- Git
- Node.js
- An OpenAI API key

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/patrykswiatek/code-guard-ai.git
    ```
2. Navigate to the cloned directory:
    ```bash
    cd code-guard-ai
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Create a .env file in the root directory with the following contents:
    ```bash
    OPENAI_API_KEY=your_api_key_here
    PROJECT_DIRECTORY=path_to_your_project
    ```
5. Build the application:
    ```bash
    npm run build
    ```
6. Start the app:
    ```bash
    npm start
    ```
