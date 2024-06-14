const customers = [
  {
    id: 11,
    email: "omar@gmail.com",
    name: "Omar",
    company: "company d.o.o",
  },
  {
    id: 1,
    email: "amar@gmail.com",
    name: "Amar",
    company: "company d.o.o",
  },
  {
    id: 3,
    email: "jondoe1@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
  {
    id: 4,
    email: "jondoe2@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
  {
    id: 5,
    email: "jondoe3@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
  {
    id: 6,
    email: "jondoe4@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
  {
    id: 7,
    email: "jondoe5@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
  {
    id: 8,
    email: "jondoe6@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
  {
    id: 9,
    email: "jondoe7@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
  {
    id: 10,
    email: "jondoe8@gmail.com",
    name: "John",
    company: "company d.o.o",
  },
];

const templates = [
  {
    id: 5,
    name: "monthly events",
    html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #0073e6;">
                <h1 style="margin: 0; color: #ffffff;">Monthly Newsletter</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse; background-color: #ffffff;">
                    <tr>
                        <td style="padding: 20px; text-align: center; border-bottom: 1px solid #dddddd;">
                            <h2 style="margin: 0; color: #0073e6;">Welcome to Our June Edition</h2>
                            <p style="margin: 10px 0 0; color: #555555;">Bringing you the latest updates and insights.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <img src="https://via.placeholder.com/600x200" alt="Newsletter Banner" style="width: 100%; height: auto; border: 0; display: block;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left;">
                            <h3 style="margin: 0 0 10px; color: #333333;">Feature Article</h3>
                            <p style="margin: 0 0 20px; color: #555555;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan tortor. Phasellus euismod augue ut velit volutpat, vel tincidunt lacus egestas.</p>
                            <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #0073e6; color: #ffffff; text-decoration: none; border-radius: 5px;">Read More</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left;">
                            <h3 style="margin: 0 0 10px; color: #333333;">Upcoming Events</h3>
                            <ul style="margin: 0 0 20px; padding: 0; list-style: none; color: #555555;">
                                <li style="margin: 0 0 10px;">Event 1 - June 10, 2024</li>
                                <li style="margin: 0 0 10px;">Event 2 - June 15, 2024</li>
                                <li style="margin: 0 0 10px;">Event 3 - June 20, 2024</li>
                            </ul>
                            <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #0073e6; color: #ffffff; text-decoration: none; border-radius: 5px;">View All Events</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left; background-color: #f4f4f4;">
                            <h3 style="margin: 0 0 10px; color: #333333;">Contact Us</h3>
                            <p style="margin: 0 0 5px; color: #555555;">Email: <a href="mailto:info@example.com" style="color: #0073e6; text-decoration: none;">info@example.com</a></p>
                            <p style="margin: 0 0 5px; color: #555555;">Phone: <a href="tel:+1234567890" style="color: #0073e6; text-decoration: none;">+123 456 7890</a></p>
                            <p style="margin: 0 0 5px; color: #555555;">Address: 123 Main Street, Anytown, USA</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #0073e6; color: #ffffff;">
                            <p style="margin: 0;">&copy; 2024 Company Name. All rights reserved.</p>
                            <a href="#" style="color: #ffffff; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                            <a href="#" style="color: #ffffff; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`,
    inputs: [
      { type: "text", name: "template-0-title", placeholder: "Title" },
      { type: "text-area", name: "template-0-p-1", placeholder: "Paragraph 1" },
      { type: "text-area", name: "template-0-p-2", placeholder: "Paragraph 2" },
    ],
  },
  {
    id: 1,
    name: "monthly note",
    html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #0073e6;">
                <h1 style="margin: 0; color: #ffffff;">Monthly Newsletter</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 20px; text-align: left;">
                            <h2 style="margin: 0 0 10px; color: #0073e6;">{{template-1-title}}</h2>
                            <p style="margin: 0 0 20px; color: #555555;">{{template-1-p-1}}</p>
                            <p style="margin: 0 0 20px; color: #555555;">{{template-1-p-2}}</p>
                            <p style="margin: 0 0 20px; color: #555555;">{{template-1-p-3}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                            <p style="margin: 0;">&copy; 2024 Company Name. All rights reserved.</p>
                            <a href="#" style="color: #0073e6; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                            <a href="#" style="color: #0073e6; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`,
    inputs: [
      { type: "text", name: "template-1-title", placeholder: "Title" },
      { type: "text-area", name: "template-1-p-1", placeholder: "Paragraph 1" },
      { type: "text-area", name: "template-1-p-2", placeholder: "Paragraph 2" },
      { type: "text-area", name: "template-1-p-3", placeholder: "Paragraph 3" },
    ],
  },
  {
    id: 2,
    name: "weekly news",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>News Portal Newsletter</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    "
  >
    <table
      role="presentation"
      style="
        width: 100%;

        border-collapse: collapse;
        background-color: #f4f4f4;
      "
    >
      <tr>
        <td
          style="padding: 20px 0; text-align: center; background-color: #d32f2f"
        >
          <h1 style="margin: 0; color: #ffffff">Weekly News Bulletin</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px">
          <table
            role="presentation"
            style="
              width: 500px;
              margin: auto;
              border-collapse: collapse;
              background-color: #ffffff;
            "
          >
            <!-- Featured Article -->
            <tr>
              <td style="padding: 20px; border-bottom: 1px solid #dddddd">
                <h2 style="margin: 0 0 10px; color: #d32f2f">
                  Top Story of the Week
                </h2>
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Top Story"
                  style="
                    width: 100%;
                    height: auto;
                    border: 0;
                    display: block;
                    margin-bottom: 10px;
                  "
                />
                <p
                  style="
                    max-width: 100%;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 0 20px;
                    color: #555555;
                  "
                >
                  {{template-2-p-1}}
                </p>
                <a
                  href="{{template-2-a-1}}"
                  style="
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #d32f2f;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                  >Read More</a
                >
              </td>
            </tr>
            <!-- Article 1 -->
            <tr>
              <td style="padding: 20px; border-bottom: 1px solid #dddddd">
                <h3 style="margin: 0 0 10px; color: #333333">Breaking News</h3>
                <img
                  src="https://via.placeholder.com/600x200"
                  alt="Breaking News"
                  style="
                    width: 100%;
                    height: auto;
                    border: 0;
                    display: block;
                    margin-bottom: 10px;
                  "
                />
                <p
                  style="
                    max-width: 100%;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 0 20px;
                    color: #555555;
                  "
                >
                  {{template-2-p-2}}
                </p>
                <a
                  href="{{template-2-a-2}}"
                  style="
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #d32f2f;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                  >Read More</a
                >
              </td>
            </tr>
            <!-- Article 2 -->
            <tr>
              <td style="padding: 20px">
                <h3 style="margin: 0 0 10px; color: #333333">Latest Updates</h3>
                <img
                  src="https://via.placeholder.com/600x200"
                  alt="Latest Updates"
                  style="
                    width: 100%;
                    height: auto;
                    border: 0;
                    display: block;
                    margin-bottom: 10px;
                  "
                />
                <p
                  style="
                    max-width: 100%;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 0 20px;
                    color: #555555;
                  "
                >
                   {{template-2-p-3}}
                </p>
                <a
                  href="{{template-2-a-3}}"
                  style="
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #d32f2f;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                  >Read More</a
                >
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td
                style="
                  padding: 20px;
                  text-align: center;
                  background-color: #f4f4f4;
                "
              >
                <p
                  style="
                    max-width: 100%;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0;
                  "
                >
                  &copy; 2024 News Portal. All rights reserved.
                </p>
                <a
                  href="#"
                  style="color: #d32f2f; text-decoration: none; margin: 0 10px"
                  >Unsubscribe</a
                >
                <a
                  href="#"
                  style="color: #d32f2f; text-decoration: none; margin: 0 10px"
                  >Privacy Policy</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`,
    inputs: [
      { type: "text-area", name: "template-2-p-1", placeholder: "Paragraph 1" },
      {
        type: "text",
        name: "template-2-a-1",
        placeholder: "https://www.example.com",
      },
      { type: "text-area", name: "template-2-p-2", placeholder: "Paragraph 2" },
      {
        type: "text",
        name: "template-2-a-2",
        placeholder: "https://www.example.com",
      },
      { type: "text-area", name: "template-2-p-3", placeholder: "Paragraph 3" },
      {
        type: "text",
        name: "template-2-a-3",
        placeholder: "https://www.example.com",
      },
    ],
  },
  {
    id: 3,
    name: "template-3",
    html: "sdada",
    inputs: [
      { type: "text", name: "template-3-title", placeholder: "Title" },
      { type: "text-area", name: "template-3-p-1", placeholder: "Paragraph 1" },
      { type: "text-area", name: "template-3-p-2", placeholder: "Paragraph 2" },
      { type: "text", name: "template-3-title-2", placeholder: "Title 2" },
      { type: "date", name: "template-3-p-3" },
    ],
  },
  {
    id: 4,
    name: "template-4",
    html: "sdada",
    inputs: [
      { type: "text", name: "template-4-title", placeholder: "Title" },
      { type: "text-area", name: "template-4-p-1", placeholder: "Paragraph 1" },
      { type: "text-area", name: "template-4-p-1", placeholder: "Paragraph 1" },
    ],
  },
];

const presets = [
  { id: 5, name: "preset-0" },
  { id: 1, name: "preset-1" },
  { id: 2, name: "preset-2" },
  { id: 3, name: "preset-3" },
  { id: 4, name: "preset-4" },
];

const groups = [
  { id: 5, name: "group-0", userId: 1 },
  { id: 1, name: "group-1", userId: 1 },
  { id: 2, name: "group-2", userId: 2 },
  { id: 3, name: "group-3", userId: 2 },
  { id: 4, name: "group-4", userId: 1 },
];

const groupedCustomers = [
  { groupId: 1, customerId: 5 },
  { groupId: 2, customerId: 6 },
  { groupId: 2, customerId: 7 },
  { groupId: 3, customerId: 8 },
  { groupId: 3, customerId: 9 },
  { groupId: 3, customerId: 1 },
];

module.exports = {
  groupedCustomers,
  customers,
  templates,
  presets,
  groups,
};
