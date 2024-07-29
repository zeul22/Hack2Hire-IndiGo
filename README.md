# Hack-to-Hire Backend by IndiGo, lab37

This repository contains the backend code for the Hack-to-Hire project by IndiGo, lab37. The UI/UX is crafted using React, JavaScript, TailwindCSS, and GSAP.

## Problem Statement

Develop a system to provide real-time flight status updates and notifications to passengers.

Requirements:

- Real-time Updates: Display current flight status (delays, cancellations, gate
  changes).
- Push Notifications: Send notifications for flight status changes via SMS, email, or
  app notifications you can use kafka, RabbitMQ , etc.
- Integration with Airport Systems: Pull data from airport databases for accurate
  information, we will give you mock data.

## Libraries Used

The following libraries are used in this project:

- **React**: ^18.3.1
- **React DOM**: ^18.3.1
- **Axios**: ^1.7.2
- **Firebase**: ^10.12.4
- **GSAP**: ^3.12.5
- **Locomotive Scroll**: ^4.1.4
- **Lucide React**: ^0.416.0

## Project Display

```
Full Tutorial: https://www.youtube.com/watch?v=dwOOZaIta3U
```

## Installation

To get started with this project, clone the repository, set up the environment (.env) and install the dependencies:

```bash
VITE_CLERK_PUBLISHABLE_KEY=
```

```bash
git clone https://github.com/zeul22/Hack2Hire-IndiGo.git
cd Hack2Hire-IndiGo
npm install
npm run dev
```

## System Design Overview

### Frontend

- **Technologies Used:** React, JavaScript, TailwindCSS, GSAP
- **Description:** The frontend is built using React for a dynamic user interface, styled with TailwindCSS for responsive design, and enhanced with GSAP for animations.

### Backend

- **Technologies Used:** Node.js, Express, WebSocket, Mongoose, Node-Cron, CORS
- **Description:** The backend utilizes Node.js and Express for server-side logic, WebSocket for real-time communication, Mongoose for MongoDB interactions, Node-Cron for scheduled tasks, and CORS for cross-origin resource sharing.

### Database

- **Technology Used:** MongoDB (No-SQL)
- **Description:** MongoDB is employed as the No-SQL database to handle flexible and scalable data storage.

### Monitoring & Logging

- **Technologies Used:** Prometheus, Grafana, Loki
- **Description:** Prometheus and Grafana are used for monitoring and visualizing system metrics, while Loki handles log aggregation and management.

### Cloud

- **Technologies Used:** Docker, Sandbox, Red Hat's OpenShift
- **Description:** Docker is used for containerization, Sandbox for isolated environments, and Red Hat's OpenShift for deploying and managing containerized applications in a cloud environment.

### Notifications

- **Technologies Used:** Twilio, Firebase
- **Description:** Twilio is used for SMS notifications, and Firebase handles push notifications and real-time database capabilities.

### Diagram
![SystemDesign](https://github.com/user-attachments/assets/c124c26d-cffd-4ecb-b785-ba19617e4c55)


## VISUALS
![UI](https://github.com/user-attachments/assets/4da32237-2500-4cf0-90de-a581955b2f73)


[Responsiveness](https://www.loom.com/share/1e1d3680115d46d295c5fa2025990235?sid=88d28ba1-ae06-4ea3-a651-76f17484b275)



## TUTORIAL

[Project Representation](https://www.youtube.com/watch?v=dwOOZaIta3U&t=120s)

## DEVELOPED BY
- Rahul Anand [LinkedIn](https://www.linkedin.com/in/r-ahulanand/)
