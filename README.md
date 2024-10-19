
# DLT Certfication With Accredible API

A React.js application that allows users to create credentials by entering their name and email. The app integrates with an external API to generate credentials and displays the API response. It includes a loading spinner for enhanced user experience during API requests.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **Yarn**: [Download Yarn](https://yarnpkg.com/)
- **Git**: [Download Git](https://git-scm.com/)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tarunkumar2112/DLT-Certifications.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd DLT-Certifications
   ```

3. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

4. **Environment Variables**

   - **Create a .env File**

     In the root directory of the project, create a file named `.env`.

   - **Add the Following Variables**

     ```env
     REACT_APP_API_URL=https://api.accredible.com/v1/credentials
     REACT_APP_AUTH_TOKEN=//your token
     REACT_APP_LIST_URL=https://api.accredible.com/v1/all_credentials
     ```

     - `REACT_APP_API_URL`: The endpoint for creating credentials.
     - `REACT_APP_AUTH_TOKEN`: The authorization token required by the API.
     
     **Important**: Ensure the `.env` file is listed in your `.gitignore` to prevent sensitive information from being committed.

## Running the Application Locally

1. **Start the Development Server**

   Using npm:

   ```bash
   npm start
   ```

   Or using Yarn:

   ```bash
   yarn start
   ```

2. **Access the Application**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Deployment

You can deploy the application to platforms like Vercel or Netlify. Below are the steps for both.

### Deploying to Vercel

1. **Sign Up / Log In to Vercel**

   Visit Vercel and sign up or log in.

2. **Import Your Git Repository**

   Click on "New Project" and select your GitHub repository (Accredible-API).

3. **Follow the Prompts to Configure the Project.**

4. **Set Environment Variables**

   During the deployment setup, add the environment variables from your local `.env` file:

   - `REACT_APP_API_URL`
   - `REACT_APP_AUTH_TOKEN`

5. **Deploy**

   Click "Deploy" and wait for Vercel to build and deploy your application. Once completed, Vercel will provide a live URL for your app.

### Deploying to Netlify

1. **Sign Up / Log In to Netlify**

   Visit Netlify and sign up or log in.

2. **Connect Your Git Repository**

   Click on "New site from Git."

   Select your Git provider and authorize Netlify to access your repositories.

   Choose the Accredible-API repository.

3. **Configure Build Settings**

   - Build Command: `npm run build` or `yarn build`
   - Publish Directory: `build`

4. **Set Environment Variables**

   In the "Build & Deploy" settings, add the environment variables:

   - `REACT_APP_API_URL`
   - `REACT_APP_AUTH_TOKEN`

5. **Deploy Site**

   Click "Deploy Site" and wait for Netlify to build and deploy your application. Netlify will provide a live URL upon completion.
