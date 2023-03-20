const knex = require("../libraries/db");

// get list of products
const prodList = async () => {
  return knex("product").select("*").returning("*");
};

// get product by id
const prodId = async (id) => {
  return knex("product")
    .select("*")
    .where({ id })
    .then((rows) => {
      // return Array.isArray(rows) && rows[0];
      const data = Array.isArray(rows) && rows[0];
      return data;
    });
};

// get product categories
const category = async () => {
  return knex("product").distinct("category").returning("category");
};

//update state
const updateState = ({ incart, productId }) => {
  return knex("product")
    .where({ id: productId })
    .update({ incart })
    .returning("*");
};

const productCartList = async (userId) => {
  return knex
    .select(
      "p.id as p_id",
      "p.name as p_name",
      "p.price as p_price",
      "p.image as p_image",
      "p.quantity as p_quantity",
      "p.description as p_description",
      "p.category as p_category",
      "p.carousel",
      "c.userId as userId"
    )
    .from(function () {
      this.select("*").from("product").as("p");
    })
    .leftJoin(knex("cart").where({ userId }).as("c"), function () {
      this.on("p.id", "=", "c.productId");
    })
    .then((rows) => {
      return rows.map((item) => {
        return {
          name: item.p_name,
          price: item.p_price,
          image: item.p_image,
          quantity: item.p_quantity,
          description: item.p_description,
          category: item.p_category,
          id: item.p_id,
          carousel: item.carousel,
          ispresent: item.userId ? true : false,
        };
      });
    });
};

// select * from Products P left join (select * from cart where userId ='falana') as S
// on ( P. productid = S.productid)

// knex
//         .select('*')
//         .from(function () {
//             this.select('*').from('A')
//                 .where('id',1)
//                 .as('t1');
//         })
//         .leftJoin(
//             knex('B').where('id',2).as('t2')
//             , function () {
//                 this.on('t1.c', '=', 't2.d');
//             })

module.exports = {
  prodList,
  prodId,
  category,
  updateState,
  productCartList,
};
