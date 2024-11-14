"use server";

import type {
  Event,
  Exhibit,
  LightningTalk,
  Member,
  MemberExhibit,
} from "@shizuoka-its/core";
import client from "@/libs/prisma";

const exhibitInclude = {
  exhibit: {
    include: {
      event: true,
      members: {
        include: {
          member: true,
        },
      },
    },
  },
};

export type LightningTalkWithAll = LightningTalk & {
  exhibit: Exhibit & {
    event: Event;
    members: (MemberExhibit & {
      member: Member;
    })[];
  };
};

export async function getEvent(eventId: string): Promise<Event> {
  try {
    const event = await client.event.findUnique({
      where: { id: eventId },
    });
    if (!event) throw new Error("Event not found");
    return event;
  } catch (error) {
    console.error("Failed to fetch talks:", error);
    throw error;
  }
}

export async function getLTs(event: Event): Promise<LightningTalkWithAll[]> {
  try {
    const lts = await client.lightningTalk.findMany({
      where: {
        exhibit: {
          eventId: event.id,
        },
      },
      include: exhibitInclude,
    });
    return lts;
  } catch (error) {
    console.error("Failed to fetch talks:", error);
    throw error;
  }
}

export async function getLTData(id: string): Promise<LightningTalkWithAll> {
  try {
    const lt = await client.lightningTalk.findUnique({
      where: { exhibitId: id },
      include: exhibitInclude,
    });
    if (!lt) throw new Error("Talk not found");
    return lt;
  } catch (error) {
    console.error("Failed to fetch talks:", error);
    throw error;
  }
}
