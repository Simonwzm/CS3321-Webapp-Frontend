# Use the pre-built Node.js image
FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Set the working directory inside the container
WORKDIR /app

# Expose the port the app runs on
EXPOSE 5173

CMD [ -d "node_modules" ] && npm run dev || npm install && npm run dev

# Command to run the app
# CMD [ "npm", "run", "dev"]

# wait for attach
# CMD ["sleep", "infinity"]
