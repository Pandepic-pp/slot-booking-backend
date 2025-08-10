const user = {
  username: 'stbadmin',
  password: 'abcd@1234',
  role: 'admin'
};

const centers = [
  { id: 1, name: 'Strike the ball - Sector 110', address: 'K Block, N 1-55, Rajendra Park Rd, opp. Ahuja Garden, near Sarai Chowk, K Block, New Palam Vihar Phase 1, Sector 110, Gurugram, Haryana 122017', lanes: 2 },
  { id: 2, name: 'Strike the ball - Sector 93', address: 'Shop No. 5, First Floor, Sector 93 Rd, opposite Shiv Mandir, Hayatpur, Sector 93, Gurugram, Haryana 122505', lanes: 2 },
  { id: 3, name: 'Strike the ball - Sector 10A', address: "Basement of, Dr Chandna's Dental and Implant Centre, House No - 67 Main Hudda Market, opposite Om Sweets, Sector 10A, Gurugram, Haryana 122001", lanes: 3 },
  { id: 4, name: 'Strike the ball - Sector 107', address: 'Strike The Box, near Six Flag 2.0, Sector 107, Gurugram, Haryana 122017', lanes: 2 }
];

const packages = [
  { id: 1, package: 50, validity: 1, price: 2000 },
  { id: 2, package: 100, validity: 3, price: 3500 },
  { id: 3, package: 200, validity: 6, price: 6000 },
  { id: 4, package: 500, validity: 12, price: 14000 }
];

module.exports = { user, centers, packages };
