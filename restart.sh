#!/bin/bash

# Pull the latest changes from the Git repository
echo "Pulling the latest changes from Git..."
git pull

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the app
echo "Building the app..."
npm run build

# Restart the pm2 process
echo "Restarting the pm2 process..."
pm2 restart opsin-bot

# Save the pm2 process list to ensure it's restarted automatically on server reboot
echo "Saving the pm2 process list..."
pm2 save

echo "Restart complete!"