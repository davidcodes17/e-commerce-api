import dotenv from "dotenv"
dotenv.config();
import request from "supertest"
import app from "../src/app"


const USER_ID = "3bad174d-3777-4306-80a4-a1a60f69b5de"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzYmFkMTc0ZC0zNzc3LTQzMDYtODBhNC1hMWE2MGY2OWI1ZGUiLCJpYXQiOjE3MDM0NTQzNzgsImV4cCI6MTcwMzU0MDc3OH0.x5dpdhav6ft2FP8f_9NjhQCVaTK9QYOEKmkuQMtjp7Y"
describe('GET Endpoints', () => {
  it('should check server health', async () => {
    const res = await request(app)
      .get('/')
    expect(res.text).toMatch("Cart Royal")
  })
})


describe('Sellers Endpoints', () => {
  it('should create a seller account', async () => {
    const res = await request(app)
      .post('/seller/become')
      .send({
        shop_category: "Electronics",
        shop_name: 'OT Store',
        phone:"+2347085218197",
        region:"Nigeria",
        delivery_zone:"NG"
      }).set({
        Authorization:`Bearer ${TOKEN}`
      })
    expect(res.statusCode).toEqual(201)
  })

  it("should create a test products",async()=>{
    const res = await request(app)
    .post("/product/new").send({
      
    })
  })
})