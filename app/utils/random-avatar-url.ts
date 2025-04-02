import React from "react";

export async function getRandomAvatarUrl(): Promise<string> {
    const baseUrl = "https://avatar.iran.liara.run/public/";
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Generates a number from 1 to 100
    return `${baseUrl}${randomNumber}`;
  }
  
//   // Example usage:
//   const randomUrl = getRandomAvatarUrl();
//   console.log(randomUrl);
  