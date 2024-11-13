"use server";

import type { Event, Exhibit, Member, MemberExhibit } from "@shizuoka-its/core";

import client from "@/libs/prisma";

const exhibitInclude = {
  event: true,
  members: {
    include: {
      member: true,
    },
  },
};

export type ExhibitWithAll = Exhibit & {
  event: Event;
  members: (MemberExhibit & {
    member: Member;
  })[];
};

export async function getExhibits(event: Event): Promise<ExhibitWithAll[]> {
  try {
    const exhibits = await client.exhibit.findMany({
      where: {
        eventId: event.id,
      },
      include: exhibitInclude,
    });
    return exhibits;
  } catch (error) {
    console.error("Failed to fetch exhibits:", error);
    throw error;
  }
}

export async function getExhibitData(
  exhibitId: string,
): Promise<ExhibitWithAll> {
  try {
    const exhibit = await client.exhibit.findUnique({
      where: { id: exhibitId },
      include: exhibitInclude,
    });
    if (!exhibit) throw new Error("Exhibit not found");
    return exhibit;
  } catch (error) {
    console.error("Failed to fetch exhibit:", error);
    throw error;
  }
}
