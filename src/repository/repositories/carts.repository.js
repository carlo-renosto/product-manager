
import { cartManagerDao } from "../../dao/index.js";

export class cartsRepository {
    constructor() {
        this.dao = cartManagerDao;
    }

    async createCart(uid) {
        const cart = await this.dao.createCart(uid);
        return cart;
    }

    async getCartById(id) {
        const cart = await this.dao.getCartById(id);
        return cart;
    }

    async updateCart(cid, cartProducts) {
        const cart = await this.dao.updateCart(cid, cartProducts);
        return cart;
    }

    async updateCartProduct(cid, pid) {
        const cart = await this.dao.updateCartProduct(cid, pid);
        return cart;
    }

    async updateCartProductQuantity(cid, pid, quantity) {
        const cart = await this.dao.updateCartProductQuantity(cid, pid, quantity);
        return cart;
    }

    async deleteCart(cid) {
        const cart = await this.dao.deleteCart(cid);
        return cart;
    }

    async deleteCartProduct(cid, pid) {
        const cart = await this.dao.deleteCartProduct(cid, pid);
        return cart;
    }

    async purchaseCart(cid) {
        const ticket = await this.dao.purchaseCart(cid);
        return ticket;
    }
}