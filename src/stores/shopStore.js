import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ShopStore {
  constructor() {
    makeAutoObservable(this);
    // this will turn our class into a mobx store and all components can observe the changes that happen in the store
  }
  shops = [];

  createShop = async (newShop) => {
    try {
      const formData = new FormData();
      for (const key in newShop) {
        formData.append(key, newShop[key]);
      }
      const response = await instance.post("/shops", formData);
      this.shops.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: shopStore.js ~ line 16 ~ ShopStore ~ createShop= ~ error",
        error
      );
    }
  };

  fetchShops = async () => {
    try {
      const response = await instance.get("/shops");
      this.shops = response.data;
    } catch (error) {
      console.log("ShopStore -> fetchShops -> error", error);
    }
  };
  // shopId موجوده بالurl
  // لان اذا بسوي كرييت برودكت باليوار ال تكون موجوده
  // وانا قاعده اسوي برودكت ف هم احطه يمه
  // i will send the product to the backend
  // واهوا ياي ك فورمداتا ف لازم احول البرودكت حق فورمداتا
  createProduct = async (shopId, product) => {
    try {
      // check postman because the req will be there
      const formData = new FormData();
      //فورمداتا تاخذ ابند عشان تشتغل والابند تاخد كي و فاليو
      // الفاليو جنها برودكت.نيم
      // key = product.name, .image اي شي من الباكند
      for (const key in product) {
        formData.append(key, product[key]);
      }

      const res = await instance.post(`/shops/${shopId}/products`, formData);
      const shop = this.shops.find((shop) => shop._id === shopId);
      shop.products.push(res.data);
    } catch (error) {}
  };
}

const shopStore = new ShopStore();
shopStore.fetchShops();

export default shopStore;
