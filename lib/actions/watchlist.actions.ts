"use server";

import { Watchlist } from "@/database/models/watchlist.model";
import { connectToDatabase } from "@/database/mongoose";

export const getWatchlistSymbolsByEmail = async (
  email: string
): Promise<string[]> => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Failed to get database");

    // Find user by email in the users collection
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return [];
    }

    const userId = user.id || user._id.toString();
    if (!userId) {
      console.log(`No valid userId found for email: ${email}`);
      return [];
    }

    // Query watchlist by userId and return just the symbols
    const watchlistItems = await Watchlist.find(
      { userId },
      { symbol: 1, _id: 0 }
    ).lean();
    const symbols = watchlistItems.map((item) => item.symbol);

    console.log(`Found ${symbols.length} symbols for user ${email}`);
    return symbols;
  } catch (error) {
    console.error("Error fetching watchlist symbols:", error);
    return [];
  }
};
