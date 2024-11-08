"use server";

import type {
  LightningTalk,
  Event,
  Exhibit,
  Member,
  LightningTalkWithAll,
} from "@shizuoka-its/core";
import { createClient } from "@shizuoka-its/core";

const client = createClient();

export async function getEvent(eventId: string): Promise<Event> {
  try {
    const event = await client.services.event.findById(eventId); // イベントIDを指定
    if (!event) throw new Error("Event not found");
    return event;
  } catch (error) {
    console.error("Failed to fetch talks:", error);
    throw error;
  }
}

export async function getLTs(event: Event): Promise<LightningTalkWithAll[]> {
  try {
    const lts = await client.services.lightningTalk.findByEventId(event.id);
    return lts;
  } catch (error) {
    console.error("Failed to fetch talks:", error);
    throw error;
  }
}

export async function getLTData(
  id: string,
): Promise<LightningTalkWithAll | null> {
  try {
    const lt = await client.services.lightningTalk.findById(id);
    return lt;
  } catch (error) {
    console.error("Failed to fetch talks:", error);
    throw error;
  }
}
