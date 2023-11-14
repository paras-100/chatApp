import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    userFriends: [
      {
        name: "Jennette Condy",
        date: "27/05/2004",
      },
      {
        name: "Rebekah Castello",
        date: "27/05/2004",
      },
      {
        name: "Madalena Otson",
        date: "27/05/2004",
      },
      {
        name: "Florette Alleburton",
        date: "27/05/2004",
      },
      {
        name: "Wat Salleir",
        date: "27/05/2004",
      },
      {
        name: "Hamid Skipping",
        date: "27/05/2004",
      },
      {
        name: "Mallory Keepin",
        date: "27/05/2004",
      },
      {
        name: "Eugene Lanmeid",
        date: "27/05/2004",
      },
      {
        name: "Benji Hrishanok",
        date: "27/05/2004",
      },
      {
        name: "Marika Fellgatt",
        date: "27/05/2004",
      },
      {
        name: "Jereme Willers",
        date: "27/05/2004",
      },
      {
        name: "Britteny MacColgan",
        date: "27/05/2004",
      },
      {
        name: "Beck Mallon",
        date: "27/05/2004",
      },
      {
        name: "Granthem Tutchell",
        date: "27/05/2004",
      },
      {
        name: "Keary Rustadge",
        date: "27/05/2004",
      },
      {
        name: "Molly Gatsby",
        date: "27/05/2004",
      },
      {
        name: "Kasey Segoe",
        email: "ksegoeg@bbb.org",
        password: "ustufB}",
        userfriends: [{ name: "Paras", date: "27/05/2004" }],
      },
      {
        name: "Sally Van de Velde",
      },
    ],
    isAdmin: true,
  },
  {
    name: "Amroy Periera",
    email: "amroy@example.com",
    password: bcrypt.hashSync("123456", 10),
    profilePic: "/uploads/image-1692375930521.jpg",

    isAdmin: false,
  },
  {
    name: "Sharvi Tayde",
    email: "sharvi@example.com",
    password: bcrypt.hashSync("123456", 10),
    profilePic: "/uploads/image-1692375933982.jpg",

    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    userFriends: [
      {
        name: "Jennette Condy",
        date: "27/05/2004",
      },
      {
        name: "Rebekah Castello",
        date: "27/05/2004",
      },
      {
        name: "Madalena Otson",
        date: "27/05/2004",
      },
      {
        name: "Florette Alleburton",
        date: "27/05/2004",
      },
      {
        name: "Wat Salleir",
        date: "27/05/2004",
      },
      {
        name: "Hamid Skipping",
        date: "27/05/2004",
      },
      {
        name: "Mallory Keepin",
        date: "27/05/2004",
      },
      {
        name: "Eugene Lanmeid",
        date: "27/05/2004",
      },
      {
        name: "Benji Hrishanok",
        date: "27/05/2004",
      },
      {
        name: "Marika Fellgatt",
        date: "27/05/2004",
      },
      {
        name: "Jereme Willers",
        date: "27/05/2004",
      },
      {
        name: "Britteny MacColgan",
        date: "27/05/2004",
      },
      {
        name: "Beck Mallon",
        date: "27/05/2004",
      },
      {
        name: "Granthem Tutchell",
        date: "27/05/2004",
      },
      {
        name: "Keary Rustadge",
        date: "27/05/2004",
      },
      {
        name: "Molly Gatsby",
        date: "27/05/2004",
      },
      {
        name: "Kasey Segoe",
        email: "ksegoeg@bbb.org",
        password: "ustufB}",
        userfriends: [{ name: "Paras", date: "27/05/2004" }],
      },
      {
        name: "Sally Van de Velde",
      },
    ],
    isAdmin: false,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    userFriends: [
      {
        name: "Jennette Condy",
        date: "27/05/2004",
      },
      {
        name: "Rebekah Castello",
        date: "27/05/2004",
      },
      {
        name: "Madalena Otson",
        date: "27/05/2004",
      },
      {
        name: "Florette Alleburton",
        date: "27/05/2004",
      },
      {
        name: "Wat Salleir",
        date: "27/05/2004",
      },
      {
        name: "Hamid Skipping",
        date: "27/05/2004",
      },
      {
        name: "Mallory Keepin",
        date: "27/05/2004",
      },
      {
        name: "Eugene Lanmeid",
        date: "27/05/2004",
      },
      {
        name: "Benji Hrishanok",
        date: "27/05/2004",
      },
      {
        name: "Marika Fellgatt",
        date: "27/05/2004",
      },
      {
        name: "Jereme Willers",
        date: "27/05/2004",
      },
      {
        name: "Britteny MacColgan",
        date: "27/05/2004",
      },
      {
        name: "Beck Mallon",
        date: "27/05/2004",
      },
      {
        name: "Granthem Tutchell",
        date: "27/05/2004",
      },
      {
        name: "Keary Rustadge",
        date: "27/05/2004",
      },
      {
        name: "Molly Gatsby",
        date: "27/05/2004",
      },
      {
        name: "Kasey Segoe",
        email: "ksegoeg@bbb.org",
        password: "ustufB}",
        userfriends: [{ name: "Paras", date: "27/05/2004" }],
      },
      {
        name: "Sally Van de Velde",
      },
    ],
    isAdmin: false,
  },
];

export default users;
