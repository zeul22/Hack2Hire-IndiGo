# Hack-to-Hire (Monitoring & Logging) by IndiGo, lab37

This repository contains the backend code along with monitoring & Logging feature for the Hack-to-Hire project by IndiGo, lab37. The UI/UX is crafted using Prometheus, Grafana & Loki

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

- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.4.5",
- "express": "^4.19.2",
- "mongoose": "^8.5.1",
- "node-cron": "^3.0.3",
- "node-mailjet": "^6.0.5",
- "nodemailer": "^6.9.14",
- "nodemon": "^3.1.4",
- "prom-client": "^15.1.3",
- "response-time": "^2.3.2",
- "twilio": "^5.2.2",
- "winston": "^3.13.1",
- "winston-loki": "^6.1.2"

## Project Display

```
Full Tutorial: https://www.youtube.com/watch?v=dwOOZaIta3U
```

## Installation

To get started with this project, clone the repository, set up the environment (.env) and install the dependencies:

```bash
PORT=8080
DB_URL=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

TWILIO_FROM_NUMBER=

```

```bash
git clone https://github.com/zeul22/Hack2Hire-IndiGo.git
cd Hack2Hire-IndiGo
npm install
docker compose up
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
docker run -d --name=loki -p 3100:3100 grafana/loki
npm run dev
node CronJob.mjs


```

## DEMONSTRATION

[Video Demonstration](https://github.com/user-attachments/assets/308fe376-a169-4657-9db5-dd7af7ee60a6)


![Snapshot](https://github.com/user-attachments/assets/5ee2d767-0041-4741-b177-e8f2b36cb383)




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

### Backend Demonstration 
- Used Cronjob to mock realtime changes
- Updates after every 10 seconds
- Realtime changes show over frontend
- Used the developed algorithm to alter the fligh information

### Flight Algorithm
![Flight Algorithm](https://github.com/user-attachments/assets/1411d97b-aaac-4252-bdfe-39f41f9e6b87)

### Flight Updates
![Backend_cron](https://github.com/user-attachments/assets/88309847-64b2-4bb3-9ce1-d21afee60821)

### Notification
[SMS Notification](https://github.com/user-attachments/assets/85bafe04-2072-4692-9e4c-ca710ef7bda2)


![UI](https://github.com/user-attachments/assets/4da32237-2500-4cf0-90de-a581955b2f73)


[Responsiveness](https://www.loom.com/share/1e1d3680115d46d295c5fa2025990235?sid=88d28ba1-ae06-4ea3-a651-76f17484b275)



## TUTORIAL

[Project Representation](https://www.youtube.com/watch?v=dwOOZaIta3U&t=120s)

## DEVELOPED BY
- Rahul Anand [LinkedIn](https://www.linkedin.com/in/r-ahulanand/)
