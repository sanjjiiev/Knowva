# Knowva

## Overview

The **Knowva** is a web-based application designed to provide a personalized, interactive, and efficient learning experience. This tool helps users progress through their learning journey with different levels of assistance, ranging from basic explanations to advanced integrations with productivity tools. 

The app adapts to the user’s learning needs by offering features such as practice problems, revision tools, resource integrations, and more. Whether you are a student, a self-learner, or a professional looking to enhance your skills, Knowva offers a tailored approach to learning.

## Live Demo

You can explore the live demo of the project by clicking the link below:

- [Visit Live Demo](https://tj2noyhdmenib-frontend--80.prod1b.defang.dev/)
The website is hosted using the **Defang** platform.

![Project Screenshot](images/sample.png)


## Table of Contents

- [Features](#features)
  - [Level 1](#level-1)
  - [Level 2](#level-2)
  - [Level 3](#level-3)
- [Technologies](#technologies)
- [Implementation Overview](#implementation-overview)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Level 1 - Core Learning Tools
- **Interactive Chat Interface**: A user-friendly platform designed to facilitate real-time engagement, allowing users to ask questions and receive tailored responses.
- **Clear Explanations**: Offering succinct, easily understandable explanations on a broad range of topics to ensure users can grasp essential concepts with clarity.
- **Practice Exercises**: Providing a series of practice problems to assess comprehension and reinforce learning through hands-on application.
- **Revision Assistance**: Tools and resources to support the revision of previously covered material, ensuring knowledge retention and mastery.

  ![Level One Screenshot](images/L1.png)

### Level 2 - Resource Integration
- **External Learning Integrations**: Seamless access to a curated selection of online resources, including websites, articles, and videos, to enhance the learning experience.

  ![Level Two Screenshot](images/L2.png)

### Level 3 - Advanced Learning Features
- **Progress Tracker & Calendar**: Monitor progress with personalized reminders for upcoming tasks, exams, and milestones, ensuring timely preparation and organization.
- **Comprehensive Learning Assistant**: An all-encompassing, AI-powered assistant that offers tailored recommendations, adaptive learning paths, and ongoing motivational support to guide users toward their goals.

  ![Level Three Screenshot](images/L3.png)

## Technologies

- **Frontend**: React.js
- **Backend**: Express.js, Node.js
- **AI Integration**: OpenAI
- **Deployment**: Defang

## Implementation Overview

### 1. Core Learning Tools (Explanation, Practice, Revision)

The core learning tools are powered by **OpenAI API** and **LangChart**:

- **Explanation Model**:  
  OpenAI’s GPT models generate clear, user-specific explanations for a variety of subjects.

- **Practice Model**:  
  LangChart’s output model generates tailored practice exercises, designed to assess and reinforce user comprehension.

- **Revision Model**:  
  The AI provides revision resources, including flashcards and quizzes, to help users consolidate their learning.


### 2. Search Model for External Learning Resources

The search feature is powered by **OpenAI API**, enabling users to access curated online learning content. The AI intelligently searches and recommends highly relevant articles, tutorials, and videos based on the user's current learning context, enhancing their learning experience with supplementary resources.


### 3. Task Management & Calendar Integration

An integrated calendar system is implemented to help users track their learning progress and set reminders for upcoming study tasks. The calendar supports:

- Task creation and editing  
- Progress tracking  
- Deadline and milestone management  

This provides users with a structured and efficient way to manage their study schedules.

## Prerequisites

Before running this project locally, ensure you have the following installed:

### System Requirements

- **Node.js** 
  [Download Node.js](https://nodejs.org/)
  
- **Git** (for cloning the repository)  [Download Git](https://git-scm.com/)

### API Key Requirement

To enable AI features, you will need an **OpenAI API key**:

1. Create an account at [OpenAI](https://platform.openai.com/signup)
2. Generate your API key from the [OpenAI API Keys Dashboard](https://platform.openai.com/account/api-keys)
3. Add your API key to the environment variables (see `.env.example`)

### Environment Variables



### Steps to Run Locally

