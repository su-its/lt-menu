"use server";

import { createClient, type Exhibit } from "@shizuoka-its/core";

const client = createClient();

export async function getLts(): Promise<Exhibit[]> {
  try {
    const event = await client.services.event.findById("lt-event-id"); // イベントIDを指定
    if (!event) throw new Error("Event not found");

    const exhibits = await client.services.exhibit.findByEventId(event.id);
    return exhibits;
  } catch (error) {
    console.error("Failed to fetch talks:", error);
    throw error;
  }
}
