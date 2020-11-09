'use strict';
const client = require('../src/models/pool');
require('colors');
const faker = require('faker');
const bcrypt = require('bcrypt');

// Functions

insertCategory();
insertUsers();
insertseller();
insertProduct();
insertBuyer();
buyerFavorite();
buyerCart();
insertComment();
function insertCategory() {
  let arrayCategory = [
    'Sports Clothing',
    'Camping & Hiking',
    'Fitness & Body Building',
    'Sports Accessories',
    'Entertainment',
    'Roller Skates, Skateboards & Scooters',
    'Sneakers, shoes',
    'Horse Racing',
    'Water Sports',
  ];
  arrayCategory.forEach(async (item) => {
    let InsertQuery = 'INSERT INTO category (category_name) VALUES ($1)';
    let safeValues = [item];
    await client.query(InsertQuery, safeValues);
  });
  console.log('Your Category are ready 👌'.cyan.bold);
}
function insertUsers() {
  let arrayUsers = [
    {
      user_name: `${faker.name.findName()}`,
      user_password: '12547',
      user_role: 'seller',
      is_activated: true,
    },
    {
      user_name: `${faker.name.findName()}`,
      user_password: '257589',
      user_role: 'seller',
      is_activated: true,
    },
    {
      user_name: `${faker.name.findName()}`,
      user_password: '3659875',
      user_role: 'seller',
      is_activated: true,
    },
    {
      user_name: `${faker.name.findName()}`,
      user_password: '8971235644',
      user_role: 'seller',
      is_activated: true,
    },
    {
      user_name: `${faker.name.findName()}`,
      user_password: '784547845',
      user_role: 'buyer',
      is_activated: true,
    },
    {
      user_name: `${faker.name.findName()}`,
      user_password: '85744477',
      user_role: 'buyer',
      is_activated: true,
    },
    {
      user_name: `${faker.name.findName()}`,
      user_password: '8971235644',
      user_role: 'buyer',
      is_activated: true,
    },
    {
      user_name: `${faker.name.findName()}`,
      user_password: '8971235644',
      user_role: 'admin',
      is_activated: true,
    },
  ];
  arrayUsers.forEach(async (user) => {
    let secret = bcrypt.hashSync(user.user_password, 5);
    let InsertQuery =
      'INSERT INTO users (user_name,user_password,user_role,is_activated) VALUES ($1,$2,$3,$4)';
    let safeValues = [
      user.user_name,
      secret,
      user.user_role,
      user.is_activated,
    ];
    await client.query(InsertQuery, safeValues);
  });
  console.log('Your Users are ready 👌'.cyan.bold);
}
function insertBuyer() {
  console.log('Your buyers are ready 👌'.cyan.bold);

  let arraySellers = [
    {
      u_id: 5,
      first_name: `${faker.name.firstName()}`,
      last_name: `${faker.name.firstName()}`,
      address: `${faker.address.streetAddress()}`,
      telephone: `${faker.phone.phoneNumber()}`,
      gender: 'male',
      card_number: `${faker.finance.creditCardCVV()}`,
    },
    {
      u_id: 6,
      first_name: `${faker.company.companyName()}`,
      last_name: `${faker.name.firstName()}`,
      address: `${faker.address.streetAddress()}`,
      telephone: `${faker.phone.phoneNumber()}`,
      gender: 'female',
      card_number: `${faker.finance.creditCardCVV()}`,
    },
    {
      u_id: 7,
      first_name: `${faker.company.companyName()}`,
      last_name: `${faker.name.firstName()}`,
      address: `${faker.address.streetAddress()}`,
      telephone: `${faker.phone.phoneNumber()}`,
      gender: 'female',
      card_number: `${faker.finance.creditCardCVV()}`,
    },
  ];
  arraySellers.forEach(async (user) => {
    let InsertQuery =
      'INSERT INTO buyer (u_id,first_name,last_name,adress,telephone,gender,card_number) VALUES ($1,$2,$3,$4,$5,$6,$7)';
    let safeValues = [
      user.u_id,
      user.first_name,
      user.last_name,
      user.address,
      user.telephone,
      user.gender,
      user.card_number,
    ];
    await client.query(InsertQuery, safeValues);
  });
}
function insertseller() {
  console.log('Your sellers are ready 👌'.cyan.bold);

  let arraySellers = [
    {
      u_id: 1,
      company_name: `${faker.company.companyName()}`,
      address: `${faker.address.secondaryAddress()}`,
      telephone: `${faker.phone.phoneNumber()}`,
    },
    {
      u_id: 2,
      company_name: `${faker.company.companyName()}`,
      address: `${faker.address.streetAddress()}`,
      telephone: `${faker.phone.phoneNumber()}`,
    },
    {
      u_id: 3,
      company_name: `${faker.company.companyName()}`,
      address: `${faker.address.streetAddress()}`,
      telephone: `${faker.phone.phoneNumber()}`,
    },
    {
      u_id: 4,
      company_name: `${faker.company.companyName()}`,
      address: `${faker.address.streetAddress()}`,
      telephone: `${faker.phone.phoneNumber()}`,
    },
  ];
  arraySellers.forEach(async (user) => {
    let InsertQuery =
      'INSERT INTO seller (u_id,company_name,adress,telephone) VALUES ($1,$2,$3,$4)';
    let safeValues = [
      user.u_id,
      user.company_name,
      user.address,
      user.telephone,
    ];
    await client.query(InsertQuery, safeValues);
  });
}
function buyerFavorite() {
  let favorite = [
    { u_id: 1, p_id: 5, is_deleted: false },
    { u_id: 1, p_id: 6, is_deleted: false },
    { u_id: 1, p_id: 9, is_deleted: false },
    { u_id: 2, p_id: 17, is_deleted: false },
    { u_id: 2, p_id: 22, is_deleted: false },
    { u_id: 2, p_id: 19, is_deleted: false },
    { u_id: 3, p_id: 15, is_deleted: false },
    { u_id: 3, p_id: 33, is_deleted: false },
    { u_id: 3, p_id: 25, is_deleted: false },
    { u_id: 1, p_id: 15, is_deleted: false },
  ];
  favorite.forEach(async (user) => {
    let InsertQuery =
      'INSERT INTO buyer_favorite (u_id,p_id,is_deleted) VALUES ($1,$2,$3)';
    let safeValues = [user.u_id, user.p_id, user.is_deleted];
    await client.query(InsertQuery, safeValues);
  });
}
function buyerCart() {
  let favorite = [
    { u_id: 1, p_id: 5, quantity: 5, is_bought: false },
    { u_id: 1, p_id: 6, quantity: 5, is_bought: false },
    { u_id: 1, p_id: 9, quantity: 5, is_bought: false },
    { u_id: 2, p_id: 17, quantity: 7, is_bought: false },
    { u_id: 2, p_id: 22, quantity: 3, is_bought: false },
    { u_id: 2, p_id: 19, quantity: 8, is_bought: false },
    { u_id: 3, p_id: 15, quantity: 2, is_bought: false },
    { u_id: 3, p_id: 33, quantity: 2, is_bought: false },
    { u_id: 3, p_id: 25, quantity: 8, is_bought: false },
    { u_id: 1, p_id: 15, quantity: 3, is_bought: false },
    { u_id: 2, p_id: 19, quantity: 8, is_bought: true },
    { u_id: 3, p_id: 15, quantity: 2, is_bought: true },
    { u_id: 3, p_id: 33, quantity: 2, is_bought: true },
    { u_id: 3, p_id: 25, quantity: 8, is_bought: true },
    { u_id: 1, p_id: 15, quantity: 3, is_bought: true },
  ];
  favorite.forEach(async (user) => {
    let InsertQuery =
      'INSERT INTO buyer_cart (u_id,p_id,quantity,is_bought) VALUES ($1,$2,$3,$4)';
    let safeValues = [user.u_id, user.p_id, user.quantity, user.is_bought];
    await client.query(InsertQuery, safeValues);
  });
}
///////////////////////////////////////////////////
function insertComment() {
  let arrayComment = [
    {
      u_c_id: 5,
      comment: 'this comment for bought product in cart 5',
      is_deleted: false,
    },
    {
      u_c_id: 5,
      comment: 'this comment for bought product in cart 5',
      is_deleted: false,
    },
    {
      u_c_id: 5,
      comment: 'this comment for bought product in cart 5',
      is_deleted: false,
    },
    {
      u_c_id: 5,
      comment: 'this comment for bought product in cart 5',
      is_deleted: false,
    },
    {
      u_c_id: 6,
      comment: 'this comment for bought product in cart 6',
      is_deleted: false,
    },
    {
      u_c_id: 6,
      comment: 'this comment for bought product in cart 6',
      is_deleted: false,
    },
    {
      u_c_id: 6,
      comment: 'this comment for bought product in cart 6',
      is_deleted: false,
    },
    {
      u_c_id: 7,
      comment: 'this comment for bought product in cart 7',
      is_deleted: false,
    },
    {
      u_c_id: 7,
      comment: 'this comment for bought product in cart 7',
      is_deleted: false,
    },
    {
      u_c_id: 7,
      comment: 'this comment for bought product in cart 7',
      is_deleted: false,
    },
    {
      u_c_id: 8,
      comment: 'this comment for bought product in cart 8',
      is_deleted: false,
    },
    {
      u_c_id: 8,
      comment: 'this comment for bought product in cart 8',
      is_deleted: false,
    },
    {
      u_c_id: 8,
      comment: 'this comment for bought product in cart 8',
      is_deleted: false,
    },
    {
      u_c_id: 9,
      comment: 'this comment for bought product in cart 9',
      is_deleted: false,
    },
    {
      u_c_id: 9,
      comment: 'this comment for bought product in cart 9',
      is_deleted: false,
    },
    {
      u_c_id: 9,
      comment: 'this comment for bought product in cart 9',
      is_deleted: false,
    },
    {
      u_c_id: 10,
      comment: 'this comment for bought product in cart 10',
      is_deleted: false,
    },
    {
      u_c_id: 10,
      comment: 'this comment for bought product in cart 10',
      is_deleted: false,
    },
    {
      u_c_id: 10,
      comment: 'this comment for bought product in cart 10',
      is_deleted: false,
    },
    {
      u_c_id: 5,
      comment: 'this comment for bought product 5',
      is_deleted: false,
    },
  ];
  arrayComment.forEach(async (item) => {
    let InsertQuery =
      'INSERT INTO buyer_comments (u_c_id,comment,is_deleted) VALUES ($1,$2,$3)';
    let safeValues = [item.u_c_id, item.comment, item.is_deleted];
    await client.query(InsertQuery, safeValues);
  });
  console.log('Your Comments are ready 👌'.cyan.bold);
}

function insertProduct() {
  console.log('Your Products are ready 👌'.cyan.bold);

  let products = [
    {
      seller_id: 1,
      name: ' Darts Wall-mounted Two-sided',
      description:
        'Diameter 29.5cm Darts Target +3 Darts Wall-mounted Two-sided Dual-use Thick Foam Toy Dart Board Suit',
      main_img:
        'https://ae01.alicdn.com/kf/H3c45dbcd3e4e4862beab4969c0dc9329Y.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hea36101ab30145c8b0b7db0d7eb0f04bF.jpg',
        'https://ae01.alicdn.com/kf/H5825ff740ed14716910a36e84b3f4c040.jpg',
        'https://ae01.alicdn.com/kf/H2220e9b762af49618193d1e665f9d852l.jpg',
        'https://ae01.alicdn.com/kf/HTB19CaXNrvpK1RjSZFqq6AXUVXaW.jpg',
      ],
      price: 25,
      category_id: 5,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: ' Mini Billiard Ball Children Toy',
      description:
        '16pcs 25mm Resin Mini Billiard Ball Children Toy Small Pool Cue Balls Full Set',
      main_img:
        'https://ae01.alicdn.com/kf/Hf199f26ce21f43be9e53762e4b33213bw.jpg',
      images: [
        'https://ae01.alicdn.com/kf/H0ac80499f3444c62af6c333c4c4c10509.jpg',
        'https://ae01.alicdn.com/kf/H5ba83a31367a4872860e13f2b960ac52t.jpg',
        'https://ae01.alicdn.com/kf/H8b3b7dbfb4ab4b9c90bca7d8d3879de1f.jpg',
        'https://ae01.alicdn.com/kf/Ha0ccf2c6c1c344eba8695b520e94c3b9q.jpg',
      ],
      price: 25,
      category_id: 5,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Professional Soft Tip Darts With Aluminum Shaft',
      description:
        'CyeeLife 3PCS 14g Professional Soft Tip Darts With Aluminum Shaft,Dart plastic tip set for Electronic dart board',
      main_img:
        'https://ae01.alicdn.com/kf/H54ba488ac78748468e09220bdd6c22e0W.jpg',
      images: [
        'https://ae01.alicdn.com/kf/H05efe8391a7f4a1ea3f3782182a015feG.jpg',
        'https://ae01.alicdn.com/kf/H20ebc51b5350439f941bee0b3a70f156G.jpg',
        'https://ae01.alicdn.com/kf/Hddb02e5abda44e3c9bf4b59ee73c1a081.jpg',
        'https://ae01.alicdn.com/kf/H1c00629f0a1346d7893bdc4b70e6b186X.jpg',
      ],
      price: 25,
      category_id: 5,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Portable Table Games Dice',
      description:
        '30Pcs Portable Table Games Dice 14MM Acrylic Round Corner Board Game Dice Party Gambling Game Cubes Digital Dices with Bag GYH',
      main_img:
        'https://ae01.alicdn.com/kf/Hfbc11f57490547d08db4f7a9e6f271ceG.jpg',
      images: [
        'https://ae01.alicdn.com/kf/H18d8e0871e4245959f05a8a33d5c5ce36.jpg',
        'https://ae01.alicdn.com/kf/H21150d4ee1b448738db8efa8c7f6f130h.jpg',
        'https://ae01.alicdn.com/kf/H57ff5cb33332476dac9b39a4e335491cy.jpg',
        'https://ae01.alicdn.com/kf/H29b00beac08441f581552b028d6059f0r.jpg',
        'https://ae01.alicdn.com/kf/H002d3de35f6b4bee9ce719e17a32c8aa9.jpg',
        'https://ae01.alicdn.com/kf/H02c51c2deaa24802be4d4bfb026cd428I.jpg',
        'https://ae01.alicdn.com/kf/Ha5ef7bd1ec984e6799d8ab1435657a1bj.jpg',
      ],
      price: 25,
      category_id: 5,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Wooden Throwback',
      description:
        'ntertainment Darts Wooden Throwback V Shaped Boomerang Disc Throw Catch Outdoor Game Funny Boy Game Gift Outdoor',
      main_img:
        'https://ae01.alicdn.com/kf/Hdafaccecb06a4af3a3b51fce85c7df7dS.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hb08484c92e394238be7e48bc4784698f9.jpg',
        'https://ae01.alicdn.com/kf/H3caac1b6ea884b83beaae4f0f84ab4ccl.jpg',
        'https://ae01.alicdn.com/kf/Hb5adb1d3a23840778c2077762fab0dd4S.jpg',
        'https://ae01.alicdn.com/kf/H2691bca6687147d5ae8fd4e50eea937ei.jpg',
        'https://ae01.alicdn.com/kf/H467c19d22b7248c596951a0c55c6012c5.jpg',
      ],
      price: 25,
      category_id: 5,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Self-Balancing Electric Scooters',
      description:
        '6.5 Inch Self-Balancing Electric Scooters Wheel Board Protective PVC Cover Skin Sticker Classic Hoverbaoard for Car Decoration',
      main_img: 'https://ae01.alicdn.com/kf/HTB1BAQOBNuTBuNkHFNRq6A9qpXao.jpg',
      images: [
        'https://ae01.alicdn.com/kf/HTB1hReUKbGYBuNjy0Foq6AiBFXaN.jpg',
        'https://ae01.alicdn.com/kf/HTB1p.VGKqmWBuNjy1Xaq6xCbXXaZ.jpg',
        'https://ae01.alicdn.com/kf/HTB1IeElc6fguuRjSszcq6zb7FXay.jpg',
        'https://ae01.alicdn.com/kf/HTB1oiZxc6fguuRjSspaq6yXVXXaF.jpg',
        'https://ae01.alicdn.com/kf/HTB1ssMqc56guuRkSmLyq6AulFXao.jpg',
      ],
      price: 5,
      category_id: 6,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Gamble Skateboard Beginners ',
      description:
        "Gamble Skateboard Beginners Teenager Adult Children BOY'S and GIRL'S Brush Street Four Wheel Highway Double Snubby Industry Skat",
      main_img:
        'https://ae01.alicdn.com/kf/H58fd66fb5eb64a50b5e82fcaace85166s/Gamble-Skateboard-Beginners-Teenager-Adult-Children-BOY-S-and-GIRL-S-Brush-Street-Four-Wheel-Highway.jpg_Q90.jpg_.webp',
      images: [
        'https://ae01.alicdn.com/kf/H1c75779f6dbb44088df115f3fe2632ffv.jpg',
        'https://ae01.alicdn.com/kf/H617ab12f584f4f9086501b357361ee9aQ.jpg',
        'https://ae01.alicdn.com/kf/H8fa796258cff4e90a3b18f989534e9d9D.jpg',
        'https://ae01.alicdn.com/kf/H46a488f8f3ea4db8874301a32689a9aaq.jpg',
      ],
      price: 49,
      category_id: 6,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Balanced Skates Double Roller',
      description:
        "Children's 4 Led Light Wheels Balanced Skates Double Roller Skate Quad Skate High Quality Safety Beginner's Skates",
      main_img:
        'https://ae01.alicdn.com/kf/H7efcc916a3eb4ec4b3cfe9178380bd05n/Children-s-4-Led-Light-Wheels-Balanced-Skates-Double-Roller-Skate-Quad-Skate-High-Quality-Safety.jpg_Q90.jpg_.webp',
      images: [
        'https://ae01.alicdn.com/kf/H5339bbb00b804de4bc81e11b4b8515d9P.jpg',
        'https://ae01.alicdn.com/kf/H708309e192f8423191e1ee183c72ac89k.jpg',
        'https://ae01.alicdn.com/kf/H650563b914394629b3dc4d61de84ea8d6.jpg',
      ],
      price: 51,
      category_id: 6,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Skates Shoes',
      description:
        'Professional Skates Shoes Fancy Single-row Roller Skates Adult Inline Skates Universal Skating Rink Skates For Men And Women',
      main_img:
        'https://ae01.alicdn.com/kf/Hf86f7ac3628f44d0b74c1f60298471baX.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hff4e3695312849d3a10c84f65ed86083G.jpg',
        'https://ae01.alicdn.com/kf/H2b7459bb319f450e8f0eedf6d6d16994z.jpg',
        'https://ae01.alicdn.com/kf/H303f9ed5658243e3a71c70d751240561k.jpg',
      ],
      price: 12,
      category_id: 6,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Roselle Roller Skates',
      description:
        'Roselle Roller Skates Men Women Inline Skating Shoes High Quality Sliding Freestyle Skating Patins 4 Wheels Professional',
      main_img:
        'https://ae01.alicdn.com/kf/Ha765fd5aca774c999fe3ca9490b7ff63g.jpg',
      images: [
        'https://ae01.alicdn.com/kf/H7fd2151dc374446cb49ec0835b65ce81x.jpg',
        'https://ae01.alicdn.com/kf/Ha5e56e56bfaa4cd1b0ea6f3c7d34956fJ.jpg',
        'https://ae01.alicdn.com/kf/H44b531305ab145a09bfefa8704af136e1.jpg',
        'https://ae01.alicdn.com/kf/H19aba33596164a53b1cfbf797eb72648X.jpg',
      ],
      price: 69,
      category_id: 6,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Men Golf Shoes ',
      description:
        'New Men Golf Shoes Casual Sports Sneakers Genuine Leather Outdoor Male Walking Shoe Brown Blue Eu 39-44',
      main_img:
        'https://ae01.alicdn.com/kf/H6382fac918d341e1a0afd68fc7b41f9dN/New-Men-Golf-Shoes-Casual-Sports-Sneakers-Genuine-Leather-Outdoor-Male-Walking-Shoe-Brown-Blue-Eu.jpg_Q90.jpg_.webp',
      images: [
        'https://ae01.alicdn.com/kf/H612c714cce0040dca5623d643bd773c7e/New-Men-Golf-Shoes-Casual-Sports-Sneakers-Genuine-Leather-Outdoor-Male-Walking-Shoe-Brown-Blue-Eu.jpg_Q90.jpg_.webp',
        'https://ae01.alicdn.com/kf/H593b4e6cf6144381a0ac3121637420d2M/New-Men-Golf-Shoes-Casual-Sports-Sneakers-Genuine-Leather-Outdoor-Male-Walking-Shoe-Brown-Blue-Eu.jpg_Q90.jpg_.webp',
      ],
      price: 62,
      category_id: 7,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Breathable Running Shoes ',
      description:
        'Women and Men Sneakers Breathable Running Shoes Outdoor Sport Fashion Comfortable Casual Couples Gym Shoes',
      main_img:
        'https://ae01.alicdn.com/kf/H233e8e7b2a684e0b821b43f215fd2c968/Women-and-Men-Sneakers-Breathable-Running-Shoes-Outdoor-Sport-Fashion-Comfortable-Casual-Couples-Gym-Shoes.jpg_640x640.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hce64d5495ca14775848db36db70823445.jpg',
        'https://ae01.alicdn.com/kf/Hcca6f8e77e984f699586ce2dc82001146.jpg',
        'https://ae01.alicdn.com/kf/H5988bf90e7184948a838ddcf610feafew.jpg',
        'https://ae01.alicdn.com/kf/H9d302cea48c7497eb165df63d16f9909L.jpg',
      ],
      price: 14,
      category_id: 7,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Couple Running Shoes Breathable',
      description:
        'Couple Running Shoes Breathable Outdoor Male Sports Shoes Lightweight Sneakers Women Comfortable Athletic Training Footwear',
      main_img: 'https://ae01.alicdn.com/kf/HTB19iiSN9zqK1RjSZFHq6z3CpXac.jpg',
      images: [
        'https://ae01.alicdn.com/kf/HTB1K8aWN3HqK1RjSZFEq6AGMXXaS.jpg',
        'https://ae01.alicdn.com/kf/HTB1w3KWN7voK1RjSZFNq6AxMVXaP.jpg',
        'https://ae01.alicdn.com/kf/HTB1YAuSNYvpK1RjSZFqq6AXUVXa3.jpg',
        'https://ae01.alicdn.com/kf/HTB14UqVN6TpK1RjSZKPq6y3UpXa2.jpg',
      ],
      price: 14,
      category_id: 7,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Non-Slip Unisex  shoes',
      description:
        'Non-Slip Unisex Light Breathable Running Shoes Wear-resistant Lace-Up Sport Shoes Mans Fashion Sneakers',
      main_img:
        'https://ae01.alicdn.com/kf/H993d87b3acdd44e0bc2756d2942d9213z.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hbbab547eb9774c4ab6e2a13392a949fdM.jpg',
        'https://ae01.alicdn.com/kf/Hc1773a27284e42e5891cc8fd1d4c40c3u.jpg',
        'https://ae01.alicdn.com/kf/H918deb35b8b74d9ca984464e4eb66dddE.jpg',
      ],
      price: 20,
      category_id: 7,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Original Nike Air Max 90',
      description:
        "Original Nike Air Max 90 dark blue and white Men's outdoor sports shoes jogging shoes AJ1285-403 size 36-45",
      main_img:
        'https://ae01.alicdn.com/kf/He555ead39ddd4a92929c75f60a47d1d4f.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hb37f5dc2455c4a31a02a2ea3b627c4f4p.jpg',
        'https://ae01.alicdn.com/kf/H35c5bfdde01449f2866031244dd6eb368.jpg',
        'https://ae01.alicdn.com/kf/Hbab0321342f748b9bad9f2224cf1d773U.jpg',
        'https://ae01.alicdn.com/kf/Hdf1cf51a61f84443aac30f418b2019405.jpg',
        'https://ae01.alicdn.com/kf/H21b17b1c447445b2a41171eb9d60f9b3l.jpg',
      ],
      price: 52,
      category_id: 7,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: ' LED Horse Harness Breastplate ',
      description:
        'Hot Sale LED Horse Harness Breastplate Nylon Webbing Night Visible Horse Riding Equipment Paardensport Racing Cheval Equitation',
      main_img:
        'https://ae01.alicdn.com/kf/Hbbfe56870cfb4d20947d9c2fedb7102ay.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Ha63a8d7305604ecda6b493710b9cecc0M.jpg',
        'https://ae01.alicdn.com/kf/Habede821dd5743a9a6e0be5085989986X.jpg',
        'https://ae01.alicdn.com/kf/H12684a077c7f4d74a33a8774c9d1850f4.jpg',
        'https://ae01.alicdn.com/kf/H29a08c8eeb3e46abaa5e5c817ce9a156A.jpg',
        'https://ae01.alicdn.com/kf/Hdadae9b9b6564f47a06e94db81ba3d60X.jpg',
      ],
      price: 13,
      category_id: 8,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Horse Training Grooming Tool',
      description:
        'Black Horse Neck Stretcher Horse Training Grooming Tool Equestrian Supplies',
      main_img:
        'https://ae01.alicdn.com/kf/Hca968198eda64988924269d707176e6eK.jpg',
      images: [
        'https://ae01.alicdn.com/kf/H9266368508344e4d9e26703737681454q.jpg',
        'https://ae01.alicdn.com/kf/H90e6e2692710460dba7af56990aa5b61q.jpg',
        'https://ae01.alicdn.com/kf/H0054df6e934a44928397d4028a2cf236f.jpg',
      ],
      price: 12,
      category_id: 8,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Breathable Horse Saddle Pad',
      description:
        'Breathable Horse Saddle Pad Sweat-absorbent Equestrian Bareback Riding Pad Horse Riding Jumping Performance Equipment',
      main_img:
        'https://ae01.alicdn.com/kf/H6770337b1fad426cb964335b52d8452d0.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hfe144163a2074e3db72abb6440897559Z.jpg',
        'https://ae01.alicdn.com/kf/H8d04e5c5ad804322bab9b1a94de533d3K.jpg',
        'https://ae01.alicdn.com/kf/H2cf649b845d342119b0e304e99f0899ff.jpg',
      ],
      price: 27,
      category_id: 8,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Horse Riding Stirrups Flex Aluminum',
      description:
        'Horse Riding Stirrups Flex Aluminum Horse Saddle Anti-skid Horse Pedal Equestrian Safety Equipment',
      main_img:
        'https://ae01.alicdn.com/kf/H1e2c39e5ae4d44d4b22a4a9654b588c5h.jpg',
      images: [
        'https://ae01.alicdn.com/kf/H9c1d848cf8d2460ab6690981e3943d19h.jpg',
        'https://ae01.alicdn.com/kf/H553e25251c8a4f3e9bf1f8bdb2c4bc05q.jpg',
        'https://ae01.alicdn.com/kf/H67f0dea38b8c4e9aa2390cb7c3e647ecp.jpg',
      ],
      price: 25,
      category_id: 8,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Anti Impact Cap Equestrian horse Helmet',
      description:
        'Women Men Safety Half Cover Sports Protective Anti Impact Cap Equestrian Helmet Adult Horse Riding',
      main_img:
        'https://ae01.alicdn.com/kf/HTB130aVaQT2gK0jSZPcq6AKkpXac/Women-Men-Safety-Half-Cover-Sports-Protective-Anti-Impact-Cap-Equestrian-Helmet-Adult-Horse-Riding-Guard.jpg_Q90.jpg_.webp',
      images: [
        'https://ae01.alicdn.com/kf/HTB10gOVaQL0gK0jSZFAq6AA9pXa3.jpg',
        'https://ae01.alicdn.com/kf/HTB1MSKVaQL0gK0jSZFxq6xWHVXa5.jpg',
      ],
      price: 25,
      category_id: 8,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: ' paddle board sup surfing',
      description:
        'Aqua Marina 2021 Monster stand up paddle board sup surfing inflatable board water sport surf',
      main_img:
        'https://ae01.alicdn.com/kf/He427af1157d44c028a40d3b64d0b8b315.jpg',
      images: [
        'https://ae01.alicdn.com/kf/H1d9e0ec03f7448139f01e3473e968013e.jpg',
        'https://ae01.alicdn.com/kf/H16058e61215145598562fd9f61785427c.jpg',
        'https://ae01.alicdn.com/kf/He6bf69c3927743eda5bf9ccb339a053eO.jpg',
      ],
      price: 397,
      category_id: 9,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Swimming Pool Toys Sea ',
      description:
        '3pcs Kids Plants Toy Sports Swimming Pool Toys Sea Plant Shape Diving Toys Diving Swimming Training Pool for Children',
      main_img: 'https://ae01.alicdn.com/kf/HTB1nfo2a.WF3KVjSZPhq6xclXXal.jpg',
      images: [
        'https://ae01.alicdn.com/kf/HTB1r0A2a.GF3KVjSZFoq6zmpFXax.jpg',
        'https://ae01.alicdn.com/kf/HTB1ueZ1a3aH3KVjSZFjq6AFWpXaP.jpg',
      ],
      price: 3,
      category_id: 9,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: ' Snorkeling Diving Mask',
      description:
        '2020new Double respirator Snorkeling Diving Mask Full Face Dry Style k Diving Equipment Silicone underwater Diving Accessories',
      main_img:
        'https://ae01.alicdn.com/kf/He417f722834f4a79b7d71429ce110b4fW.jpg',
      images: [
        'https://ae01.alicdn.com/kf/Hb43f71fd9459427aac360e036f8a68a7m.jpg',
        'https://ae01.alicdn.com/kf/Heae7e770b57c4fb6aabb6da23854b680x.jpg',
        'https://ae01.alicdn.com/kf/H52cb0dd7ed5945559dab883ce02d4d7a6.jpg',
      ],
      price: 27,
      category_id: 9,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Earplugs Diving ',
      description:
        '1 Pair Soft Ear Plugs Swimming Silicone Waterproof Dust-Proof Earplugs Diving Water Sports Swim Swimming Anti-noise Accessories',
      main_img: 'https://ae01.alicdn.com/kf/HTB1rD80dQxz61VjSZFtq6yDSVXaC.jpg',
      images: [
        'https://ae01.alicdn.com/kf/HTB1i_KieW1s3KVjSZFAq6x_ZXXaf.jpg',
        'https://ae01.alicdn.com/kf/HTB1r_40dQxz61VjSZFtq6yDSVXa4.jpg',
        'https://ae01.alicdn.com/kf/HTB1BmmXe.WF3KVjSZPhq6xclXXaa.jpg',
      ],
      price: 1,
      category_id: 9,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Waterproof Pouch Swimming Beach Skiing Dry Bag case',
      description:
        '6 inch Summer Diving Bag Waterproof Pouch Swimming Beach Skiing Dry Bag Case Water Sports Bags Cover Holder for Phone Wallet',
      main_img: 'https://ae01.alicdn.com/kf/HTB1RntAOgHqK1RjSZFEq6AGMXXaM.jpg',
      images: [
        'https://ae01.alicdn.com/kf/HTB1bbdxOgHqK1RjSZFgq6y7JXXaq.jpg',
        'https://ae01.alicdn.com/kf/HTB1DHdxOgHqK1RjSZFgq6y7JXXaW.jpg',
        'https://ae01.alicdn.com/kf/HTB1eAJxOkvoK1RjSZFDq6xY3pXax.jpg',
      ],
      price: 25,
      category_id: 9,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'ROCKBROS Winter Sports Thermal Face Mask ',
      description:
        'New with tags: A brand-new, unused, and unworn item (including handmade items) in the original packaging',
      main_img: 'https://i.ebayimg.com/images/g/kJMAAOSw3ZRfYwgZ/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/thumbs/images/g/q8AAAOSwmyBfgATL/s-l200.jpg',
        'https://i.ebayimg.com/thumbs/images/g/zx4AAOSwWmVdajqS/s-l200.jpg',
        'https://i.ebayimg.com/thumbs/images/g/wVoAAOSwFK1fe8yf/s-l200.jpg',
      ],
      price: 15,
      category_id: 1,
      quantity: 50,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Gel Half Finger Gloves',
      description:
        'Sports Racing Cycling Motorcycle MTB Bike Bicycle Gel Half Finger Gloves',
      main_img: 'https://i.ebayimg.com/images/g/VuYAAOSwOKtfftiT/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/SRIAAOSwFkxfftiW/s-l64.jpg',
        'https://i.ebayimg.com/images/g/pX8AAOSw6NNfftiY/s-l64.jpg',
        'https://i.ebayimg.com/images/g/OZoAAOSwIrNfftib/s-l64.jpg',
        'https://i.ebayimg.com/images/g/OZoAAOSwIrNfftib/s-l64.jpg',
      ],
      price: 30,
      category_id: 1,
      quantity: 80,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Pyjama PJ',
      description:
        'Mens Liverpool Football Club Long Pyjamas Premier League PJs LFC Pyjama PJ Grey',
      main_img: 'https://i.ebayimg.com/images/g/~c0AAOSw5R5dLJJh/s-l500.jpg',
      images: [
        'https://i.ebayimg.com/images/g/Q74AAOSw0ohdLJJO/s-l64.jpg',
        'https://i.ebayimg.com/images/g/wNYAAOSwECNdLJJS/s-l64.jpg',
        'https://i.ebayimg.com/images/g/X9IAAOSwAhRdLJJa/s-l64.jpg',
      ],
      price: 25,
      category_id: 1,
      quantity: 25,
      is_deleted: false,
    },
    {
      seller_id: 1,
      name: 'Premier League PJs LFC Pyjama PJ',
      description:
        'Mens Liverpool Football Club Long Pyjamas Premier League PJs LFC Pyjama PJ Red',
      main_img: 'https://i.ebayimg.com/images/g/n-gAAOSw~wtdLJIR/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/nzUAAOSwRaRdLJH~/s-l64.jpg',
        'https://i.ebayimg.com/images/g/axsAAOSwAAJdLJID/s-l64.jpg',
        'https://i.ebayimg.com/images/g/0kMAAOSw0m1dLJID/s-l64.jpg',
        'https://i.ebayimg.com/images/g/u0cAAOSwAT5dLJII/s-l64.jpg',
      ],
      price: 25,
      category_id: 1,
      quantity: 25,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Tents Camping',
      description:
        'Outdoor 3-4 Person Waterproof Instant Automatic Pop Up Tents Camping Hot Sell',
      main_img: 'https://i.ebayimg.com/images/g/N6wAAOSw6NNfhRmb/s-l500.png',
      images: [
        'https://i.ebayimg.com/images/g/kXkAAOSwQd9fhRmd/s-l64.png',
        'https://i.ebayimg.com/images/g/JXUAAOSwEphfhRmf/s-l64.png',
        'https://i.ebayimg.com/images/g/sFEAAOSwv7ZfhRmh/s-l64.png',
        'https://i.ebayimg.com/images/g/P7gAAOSwLGRfhRmj/s-l64.png',
      ],
      price: 90,
      category_id: 2,
      quantity: 20,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Camping Bag ',
      description:
        '55L Outdoor Military Molle Tactical Backpack Rucksack Camping Bag Travel Hiking',
      main_img: 'https://i.ebayimg.com/images/g/uFYAAOSwGpxfKvcA/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/TroAAOSwEuBfKvcF/s-l64.jpg',
        'https://i.ebayimg.com/images/g/2YMAAOSwfkNfKvcM/s-l64.jpg',
        'https://i.ebayimg.com/images/g/TyUAAOSwrTBfKvcQ/s-l64.jpg',
        'https://i.ebayimg.com/images/g/Gm4AAOSwv-NfKvcp/s-l64.jpg',
      ],
      price: 60,
      category_id: 2,
      quantity: 100,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: 'Fishing Hiking',
      description:
        'Mini Survival Tin Kit Outdoor Camping Hiking Fishing Hunting Military EDC SHTF',
      main_img: 'https://i.ebayimg.com/images/g/vnQAAOSwXRhcNRqa/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/t-gAAOSw~5ZcNRqc/s-l64.jpg',
        'https://i.ebayimg.com/images/g/uZYAAOSw8~NcNRqf/s-l64.jpg',
        'https://i.ebayimg.com/images/g/hS0AAOSwckVcNRqg/s-l64.jpg',
      ],
      price: 25,
      category_id: 2,
      quantity: 10,
      is_deleted: false,
    },
    {
      seller_id: 2,
      name: '20/30KG Dumbells',
      description:
        '20/30KG Dumbells Pair Gym Weights Barbell Dumbbell Body Building Free Weight Set',
      main_img: 'https://i.ebayimg.com/images/g/EiEAAOSw3t5fGvY-/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/oykAAOSwPvpfGvY8/s-l64.jpg',
        'https://i.ebayimg.com/images/g/FlQAAOSw99hfGvY6/s-l64.jpg',
        'https://i.ebayimg.com/images/g/jFYAAOSws-Zfjvpw/s-l64.jpg',
        'https://i.ebayimg.com/images/g/TlYAAOSwgqxfjvo4/s-l64.jpg',
      ],
      price: 20,
      category_id: 3,
      quantity: 50,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Equipment Box ',
      description:
        '13 in 1 SOS Kit Outdoor Emergency Equipment Box For Camping Hiking Survival Gear',
      main_img: 'https://i.ebayimg.com/images/g/2cwAAOSw2NVfjU6n/s-l500.jpg',
      images: [
        'https://i.ebayimg.com/images/g/iK4AAOSwLWNfjU6p/s-l64.jpg',
        'https://i.ebayimg.com/images/g/98UAAOSw8aFfjU6r/s-l64.jpg',
        'https://i.ebayimg.com/images/g/FtIAAOSwyVBfjU6t/s-l64.jpg',
        'https://i.ebayimg.com/images/g/1bQAAOSw4m1fjU6u/s-l64.jpg',
      ],
      price: 15,
      category_id: 2,
      quantity: 45,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Bicycle Light Holder',
      description:
        'Bicycle Light Mount Holder Sports Accessories Bracket Mount Holder Torch Bracket',
      main_img: 'https://i.ebayimg.com/images/g/-HMAAOSwp6ZffyeE/s-l300.png',
      images: [
        'https://i.ebayimg.com/images/g/Du0AAOSwUUJffyeI/s-l64.jpg',
        'https://i.ebayimg.com/images/g/j5oAAOSwlEtffyeN/s-l64.jpg',
        'https://i.ebayimg.com/images/g/cAUAAOSwr6lffyeK/s-l64.jpg',
        'https://i.ebayimg.com/images/g/L54AAOSw9G1ffyeS/s-l64.jpg',
      ],
      price: 10,
      category_id: 4,
      quantity: 15,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Bicycle Phone Case',
      description:
        '360° Bicycle Motor Bike Waterproof Phone Case Mount NEW Holder HOT T3M1',
      main_img: 'https://i.ebayimg.com/images/g/CDcAAOSwuYFfFyBT/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/zC0AAOSwVXJfFyB1/s-l64.jpg',
        'https://i.ebayimg.com/images/g/NnwAAOSwcFNfFyB4/s-l64.jpg',
        'https://i.ebayimg.com/images/g/GoEAAOSw5vJfFyCT/s-l64.jpg',
        'https://i.ebayimg.com/images/g/9RQAAOSwETZfFyCe/s-l64.jpg',
      ],
      price: 13,
      category_id: 4,
      quantity: 20,
      is_deleted: false,
    },
    {
      seller_id: 3,
      name: 'Underwater Scooter',
      description:
        'Smart Underwater Scooter Drones Water Actions Camera Waterproof Sports Swimming',
      main_img: 'https://i.ebayimg.com/images/g/pVMAAOSwff1fp1fp/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/EZIAAOSw21pfp1fT/s-l64.jpg',
        'https://i.ebayimg.com/images/g/978AAOSwlXJfp1fS/s-l64.jpg',
        'https://i.ebayimg.com/images/g/xPwAAOSwVIZfp1ft/s-l64.jpg',
        'https://i.ebayimg.com/images/g/nuUAAOSwmCxfp1fi/s-l64.jpg',
      ],
      price: 500,
      category_id: 9,
      quantity: 5,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Swim Ring',
      description:
        'Swimming Float Non Inflatable Swim Trainer Pool Float with Canopy Swim Ring',
      main_img: 'https://i.ebayimg.com/images/g/dTsAAOSwn0Nez7Wx/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/mRsAAOSwd4pez7Wx/s-l64.jpg',
        'https://i.ebayimg.com/images/g/QecAAOSw6ahez7Wx/s-l64.jpg',
        'https://i.ebayimg.com/images/g/P7wAAOSwJp5ez7Wx/s-l64.jpg',
        'https://i.ebayimg.com/images/g/pRkAAOSwz0Bez7Wz/s-l64.jpg',
      ],
      price: 35,
      category_id: 9,
      quantity: 56,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Skateboard',
      description:
        "22'' LED Skateboard Flashing Wheel Outdoor Street Skate Board For Children Kids",
      main_img: 'https://i.ebayimg.com/images/g/VcoAAOSwSbRfj9Oc/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/GY8AAOSwLSBfj9Of/s-l64.jpg',
        'https://i.ebayimg.com/images/g/VpsAAOSwRfFfj9Oi/s-l64.jpg',
        'https://i.ebayimg.com/images/g/fVsAAOSw0kpfj9Ol/s-l64.jpg',
        'https://i.ebayimg.com/images/g/yi4AAOSwnd5fj9Os/s-l64.jpg',
      ],
      price: 20,
      category_id: 6,
      quantity: 30,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Skateboard',
      description:
        'XOOTZ 17" Children & Kids Mini Skateboard, Double Kick Maple Fun for Beginners',
      main_img: 'https://i.ebayimg.com/images/g/iZsAAOSwOjtfWg5O/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/U8oAAOSwI8VfXKtb/s-l64.jpg',
        'https://i.ebayimg.com/images/g/0iwAAOSwmRZfXKtd/s-l64.jpg',
        'https://i.ebayimg.com/images/g/efQAAOSwTFBfWg7F/s-l64.jpg',
        'https://i.ebayimg.com/images/g/s8MAAOSws~pfWg5j/s-l64.jpg',
        'https://i.ebayimg.com/images/g/6RcAAOSwr~hfWg6G/s-l64.jpg',
      ],
      price: 30,
      category_id: 6,
      quantity: 20,
      is_deleted: false,
    },
    {
      seller_id: 4,
      name: 'Skateboard',
      description:
        "22'' Flashing LED Skateboard Complete Street Long Board Kids Desk Cruiser",
      main_img: 'https://i.ebayimg.com/images/g/oUAAAOSwR09fh8Ci/s-l300.jpg',
      images: [
        'https://i.ebayimg.com/images/g/dMwAAOSwvltfh8Co/s-l64.jpg',
        'https://i.ebayimg.com/images/g/cXEAAOSw0Mpfh8Ct/s-l64.jpg',
        'https://i.ebayimg.com/images/g/7gAAAOSwPLhfh8C1/s-l64.jpg',
        'https://i.ebayimg.com/images/g/yQ8AAOSwgbpfh8C4/s-l64.jpg',
      ],
      price: 34,
      category_id: 6,
      quantity: 25,
      is_deleted: false,
    },
  ];
  products.forEach(async (item) => {
    let InsertQuery =
      'INSERT INTO products (seller_id,name,description,main_img,images,price,category_id,quantity,is_deleted) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
    let safeValues = [
      item.seller_id,
      item.name,
      item.description,
      item.main_img,
      item.images,
      item.price,
      item.category_id,
      item.quantity,
      item.is_deleted,
    ];
    await client.query(InsertQuery, safeValues);
  });
}
