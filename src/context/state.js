import { makeAutoObservable } from "mobx";
import axios from "axios";

class myState {
  offset = 0;
  listPorudcts = [];
  details = {};
  isDetailOpen = false;
  isAddProductOpen = false;
  isMax = false;

  constructor() {
    makeAutoObservable(this);
  }

  setisAddProductOpen(ns) {
    this.isAddProductOpen = ns;
  }
  setIsMaxTrue() {
    this.isMax = true;
  }

  setDetails(dtl) {
    this.details = dtl;
  }
  setisdetailOpen(ns) {
    this.isDetailOpen = ns;
  }

  setoffset(newOffset) {
    this.offset += newOffset;
  }
  resetoffset() {
    this.offset = 0;
  }

  getlistPorudcts(nl) {
    return this.listPorudcts;
  }
  setlistPorudcts() {
    axios
      .get(process.env.REACT_APP_API_URL + `products?offset=1&count=8`)
      .then((result) => {
        this.listPorudcts = result.data.data;
        this.offset = 8;
      })
      .then((err) => {
        console.log(err);
      });
  }

  appendListPorudcts() {
    axios
      .get(
        process.env.REACT_APP_API_URL + `products?offset=${this.offset}&count=8`
      )
      .then((result) => {
        this.listPorudcts = [...this.listPorudcts, ...result.data.data];
        if (result.data.data.length === 0) {
          this.isMax = true;
        } else {
          this.offset += 8;
        }
      })
      .then((err) => {
        console.log(err);
      });
  }

  //updated list without fetching
  updateListProduct(id, newdata) {
    const lp = this.listPorudcts;
    for (var i = 0; i < lp.length; i += 1) {
      if (lp[i]["id"] === id) {
        this.listPorudcts[i] = newdata;
      }
    }
  }
  deleteListProduct(id) {
    const lp = this.listPorudcts;
    const filtered = lp.filter((value) => value["id"] != id);
    this.listPorudcts = filtered;
    this.isDetailOpen = false;
  }
}

export default myState;
