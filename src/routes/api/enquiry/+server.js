import { json } from "@sveltejs/kit";
import { HUBSPOT_ACCESS_TOKEN } from "$env/static/private";

export async function POST({ request }) {
  const { email, checkInDate, checkOutDate, guests, propertyName } =
    await request.json();

  if (!email || !email.includes("@")) {
    return json({ error: "Invalid email" }, { status: 400 });
  }

  const subject = `Sales Enquiry: ${propertyName} – Check-in ${checkInDate} (${guests} guests)`;
  const content = `
Property: ${propertyName}
Email: ${email}
Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Guests: ${guests}
  `.trim();

  try {
    // 1. Search for existing contact
    const searchRes = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: "EQ",
                  value: email,
                },
              ],
            },
          ],
          limit: 1,
        }),
      }
    );

    let contactId = null;
    if (searchRes.ok) {
      const data = await searchRes.json();
      if (data.total > 0) contactId = data.results[0].id;
    }

    // 2. Create contact if not found
    if (!contactId) {
      console.log(
        "No contact id found",
        searchRes,
        `Bearer ${HUBSPOT_ACCESS_TOKEN}`
      );
      const createRes = await fetch(
        "https://api.hubapi.com/crm/v3/objects/contacts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            properties: { email },
          }),
        }
      );

      if (createRes.ok) {
        const data = await createRes.json();
        contactId = data.id;
      } else {
        throw new Error("Failed to create contact");
      }
    }

    // 3. Create the ticket + associate to contact
    const ticketRes = await fetch(
      "https://api.hubapi.com/crm/v3/objects/tickets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            subject,
            content,
            hs_pipeline: "0", // Change if your sales pipeline ID is different (check Settings > Objects > Tickets > Pipelines)
            hs_pipeline_stage: "1", // Change to your "New" stage ID
            hs_ticket_priority: "MEDIUM", // Optional
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED",
                  associationTypeId: 16,
                },
              ],
            },
          ],
        }),
      }
    );

    if (ticketRes.ok) {
      return json({ success: true });
    } else {
      const err = await ticketRes.json();
      throw new Error(`Ticket failed: ${JSON.stringify(err)}`);
    }
  } catch (err) {
    console.error("HubSpot ticket error:", err);
    return json({ error: "Failed to create ticket" }, { status: 500 });
  }
}
