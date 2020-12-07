import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        query: "",
        filterArr: {},
        minMaxArr: {},
        colName: [
            { key: 'carName', name : 'Модель'},
            { key: 'carMake', name : 'Марка'},
            { key: 'year', name : 'Год'},
            { key: 'price', name: 'Цена'}
            ],
        cars: [{
            "id": 1,
            "carName": "Jimmy",
            "carMake": "GMC",
            "year": 1992,
            "price": "451818.16"
          }, {
            "id": 2,
            "carName": "Suburban 1500",
            "carMake": "Chevrolet",
            "year": 2008,
            "price": "342535.16"
          }, {
            "id": 3,
            "carName": "Canyon",
            "carMake": "GMC",
            "year": 2010,
            "price": "239994.25"
          }, {
            "id": 4,
            "carName": "ZDX",
            "carMake": "Acura",
            "year": 2011,
            "price": "159248.59"
          }, {
            "id": 5,
            "carName": "GTO",
            "carMake": "Mitsubishi",
            "year": 1992,
            "price": "272432.92"
          }, {
            "id": 6,
            "carName": "Amanti",
            "carMake": "Kia",
            "year": 2009,
            "price": "349072.57"
          }, {
            "id": 7,
            "carName": "S6",
            "carMake": "Audi",
            "year": 2009,
            "price": "89410.18"
          }, {
            "id": 8,
            "carName": "MX-5",
            "carMake": "Mazda",
            "year": 2005,
            "price": "354544.49"
          }, {
            "id": 9,
            "carName": "Corvette",
            "carMake": "Chevrolet",
            "year": 1957,
            "price": "56276.76"
          }, {
            "id": 10,
            "carName": "Town & Country",
            "carMake": "Chrysler",
            "year": 1999,
            "price": "286417.89"
          }, {
            "id": 11,
            "carName": "Montero",
            "carMake": "Mitsubishi",
            "year": 2003,
            "price": "295829.76"
          }, {
            "id": 12,
            "carName": "Avalon",
            "carMake": "Toyota",
            "year": 1998,
            "price": "312208.80"
          }, {
            "id": 13,
            "carName": "XC70",
            "carMake": "Volvo",
            "year": 2003,
            "price": "63520.45"
          }, {
            "id": 14,
            "carName": "XLR",
            "carMake": "Cadillac",
            "year": 2006,
            "price": "125215.43"
          }, {
            "id": 15,
            "carName": "Malibu",
            "carMake": "Chevrolet",
            "year": 2003,
            "price": "143537.57"
          }, {
            "id": 16,
            "carName": "Matrix",
            "carMake": "Toyota",
            "year": 2005,
            "price": "356578.27"
          }, {
            "id": 17,
            "carName": "M Roadster",
            "carMake": "BMW",
            "year": 2008,
            "price": "145291.94"
          }, {
            "id": 18,
            "carName": "D250 Club",
            "carMake": "Dodge",
            "year": 1993,
            "price": "148689.11"
          }, {
            "id": 19,
            "carName": "E150",
            "carMake": "Ford",
            "year": 2008,
            "price": "477274.43"
          }, {
            "id": 20,
            "carName": "Ascender",
            "carMake": "Isuzu",
            "year": 2008,
            "price": "349560.83"
          }],
    carMake : [{
        "id": 1,
        "value": "Porsche"
      }, {
        "id": 2,
        "value": "Chevrolet"
      },  {
        "id": 3,
        "value": "Dodge"
      }, {
        "id": 4,
        "value": "Cadillac"
      }, {
        "id": 5,
        "value": "Toyota"
      }, {
        "id": 6,
        "value": "BMW"
      }, {
        "id": 7,
        "value": "Ford"
      }],
      year : [{
        "id": 1,
        "value": 1993
      }, {
        "id": 2,
        "value": 2008
      },  {
        "id": 3,
        "value": 2005
      }, {
        "id": 4,
        "value": 2001
      }, {
        "id": 5,
        "value": 1998
      }],
            
    },


    mutations: {
        queryChange (state, text) {
            state.query = text.trim()
        },
        addToFilterArr (state, payload) {
          Vue.set(state.filterArr, payload.colName , payload.selectedItms)
        },
        setMinMax (state, payload) {
          Vue.set(state.minMaxArr, 'field' , payload.field)
          Vue.set(state.minMaxArr, 'min' , payload.minVal)
          Vue.set(state.minMaxArr, 'max' , payload.maxVal)
        },
        resetDef (state) {
          state.query = ''
          state.filterArr = {}
          state.minMaxArr = {}
        }
    },
})