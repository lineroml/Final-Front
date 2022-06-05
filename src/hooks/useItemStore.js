import React, { createContext, useContext, useReducer } from 'react';

export const ItemStore = createContext();

// Initial state
const initialItems = [
  {
    id: 1,
    name: 'Transformer épico fantástico perfecto ni Goku le gana',
    price: '2000.00',
    picture_url:
      'data:image/jpeg;base64,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',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ding Ding',
    price: '1000.00',
    picture_url:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVEhQYGBgZGhoZGBoYGBkaGhgYGBoZGRgYGBkcIS4lHB4rIRgYJjgmKy8xNTU1HCQ7QDs0Py40NTQBDAwMEA8QGhISHDEhJCQ0NDQ0NDQ0MTQ0NDQ0MTQ0MTQ0NDE0NDQ0NDQ0NDQ0NDQxNDE0NDQ0NDQ0NDQ0MT8/NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQIGAwUHBP/EAEAQAAIBAgIHBQYCCQQCAwAAAAECAAMRBCEFBhIxQVFxImGBkfATMqGxwdEHQhRSYnKCkrLC4RUjovEzQxYk0v/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAAjEQEBAAMAAgMAAQUAAAAAAAAAAQIDESExBBJBMhMUIlFh/9oADAMBAAIRAxEAPwCqkyJMLyJM4P0ZkxQhCiRMIoWCK8IQCIwgYaRhGYoaAjiAkgICjj2I9mBGEkVkYQxAwhCImRMmZAwEYoGEMiKEUBxQhCCEIQj2ExXkYrwRK8V4QhoQiJheGgYQvFAIGEIUopK0AIUKJuNB6DqYh9lBkPeY+6vXv7p5dF4Bq1RaaDNjboOJPcBczsGisAtCmtNBkN54seLHvMdcN+36Tk9tLhdR8Oq9tnduJvsjwA+8zjU3CAZox79pvpLAXkGeTrw/1M7+1zvWPVH2SmpQJZRmynNlHMEbxKawnb6jTmGtOiPZVroLI92XkD+ZfiD4yTJ7NOy2cyV6Ez+ymJ0tNO6EgZMyJgQMUkRImGSheIwMAiMDFCHeEUIR64Qigh3heKENCEcLQ0UI4WgAEYSevRmENWoiD87Kt+W0QLzqVPVLBKArJtHizOQfGxAEOG35GOvkrkexGEnW31Kwb+4GX917/wBV5pNZtT6OHoNVRnJBUANskdogcAIYx+ZhbIy6iaIKKazrYuAE/c3lu65t5SwUsczVnp7BCoB2zuYkA2GXefKZ8KgREUZBVVQOgA+kTNMWuGVueXays8xlpgqVrTD+kiZuTpjrrPUeVzTZTEYd2Q7Rpsx45Mlw4z7r/CbtnvPJh8HTQOEUAOzM45swsx8bSddJOWOZM0xsYV1KOyfqsV8iR9JjBnZ6Ok0gZkIkSsHUDImTIkTDKBgq3jMiYCihCEEIrwgeuKF4rwpxyN5IQojhCATLTpkzGgnU9QNDqtEVnUFnN1JAJVVuARyvmeloct22a8eq9qhod1xKtVVkCLtjaFr7V1U58N58J0dlR8jY/P7x42tTVgz2sB58h855107h+BA/hh8vZsy2X7cerRqAbdt22QPAAH43kNOYMVkCFrDaVzle4QhreNrTCunaHBwOg5zFiNL02ZNhgR2gfhDGMv26xPWnlq4oDjMWkKD3vT7Q5cR4cZocTiHBs1we8W+c45dfU1zHKeG0r6QAnnGkec8FBC3aMxVlO+ZejmPpt1xo5wbFXmg9vbeZ6MK+2wF8uJlkcc/8fb2nU2lUJqPUdC527AIR2iTl3Rf/AASjwxDeKqf7pY6bkgXFrKoA7rcJkXj05ztHgz35y+KrFLUWlftYhiOSooPmWPylV1h0Q2GqFGzU3KN+st+PJhxH3E6a77IuSB1/7lP1yR8R7M0VLhWZewpJuwBFgOHZMrenflcuZXwpLGQMyuhBIYEEZEHIgjeDMbCHv6gZBpImRYwqJihCAXhFCB6oRxwdRjEYEYWF6AY4WihXr0bhWq1UprvdgvS5zPgLnwnT302KdqaCyIAq25LkJQNV8ZTpVWeobHYKobXCs1gSbbuzcX75vcTTZwHpkFSTmCGB8ZP14Pl22yX02WkdIe2XeMt1sppCe+Acj3gR3iN0FrtuAuT3AXleXGfjC+JUGzOoPIsBM1LSFJQC7g2IsA195FybcBaVLE1dt2bmb+HAeU9+gMH7Wso4DtHoN3xtD3T405211FKgYAqQR5iaPS4L1VUnIAn5TOuF2RdWK9PtPJsOXuTc7r90529jnhruOXZU6xCrYTxubrM2NPCedRMu/RhhZGOyCSxzKg7gN1+sKz7CO5/KrNbduBMDVIGyAN9/OeXSNNnpst7XB3ZdLzcsjhlhlll2+jwGsrOub7FsgC43eIio6z1XcrTuQL3ZjlbgbAcespN5etCaOT2aFcwwDX4kkXzm0268cZ1mSpWxBCM3ZJF7Dkby+6GwNOilr2J3k/eaDB0tj3R3ZT1s5559bkQ8eTU65aFp4i70FAqjM2yFS3A/tcj4HmOY1DbIixGWeRB5ETsjU9k7T8dwFxfz4TmGtuF9niXsLB7OAN3a97/kGiPZ8bZf41pSZAmO8iYe0RXhFAd4RQge0CO0YMIZ6aiTAkBJqYXqLCRtMxkQIX7PfoXRD4iotNBmd5O5V4sZ1D/RlpolNPdRbC+8neWPeTc+M8+p2GTD4dLiz1AHduNjmq9AD53lhJVhkQYj5m/dcsuT1FI03TFGmzsu7Id5JsPXdKjj9Kh02Vvdsjcbhx85f9eaY/RHNtzJ/WB9Zypod/i4Y5Y/a/7Rlx1EwwO2/eF8hf8AuEp0ueoGJHbpnfcOO8e63lZfOTL09mf8V0aiCMxPFiAqg2E2RpkrcCaXHOQbGcnnx8tbUW5vBKcyFxJq4hbTGFDZyVTCixmfD5mwnqxFMquYtCdci0hT2KrryY/HP6y9amVA2HUE32GZeme0Pg0pGmHDV6hG7bI8svpN5qZinV2pKC23YqAL9pefdbj3Tt+Oe69xXP8A0etUJLVSFJNgDsi3DJbX8Z7MJoIUQXB4WPeCRN1gMOyoobeBn1mbHqPZsOYtK8H2vWiqkWGefWcp1hxTvXf2jX2GZF5BVYgATc6b03iaLmn2QR+a2ZHAjOVR3LEsxuSSSeZJuTJI93x8LP8AKoyJjMRh6+lAwihRCEIHuBkgJhVplQypUwISSwMidRvPXgcFUqnZpIzkC5CqWy5m3CeUCdS1DwPs8N7S3bqHavx2R2UHTefGHPds+uPS/wBRsdmohQ2HDdlutwtPQmLQdoOB42m0xeBpMLuCGJ94E/LdKzj8Ej5UnBz/ADgre1wQDaxzG/KI+bztefXDTKNhmphtouyi9t1jtb+O74znhM2umdF4hCWqKzLmQw7SgHfuJ2RNPD6ejHHHHkvUrzYaDxJSvTZT+dVPerEBh5Ga609WjsR7OqlTZ2th1ex47LA2+EOud8V2GvpMLkJXtM4wOQR0My4/DO/bpkFWzHQ5yGA0WCb1l2hwE5/WvFNuOPlqGq8zMiVDwllOhcMf/WR4xHV/DHcGHQy/VP7jF5tC4gKCzb9wno0jpFWpuL/la3cbGxmPE6HRFJp1LKMzt7hbeb8JzfSusTOrogsDdS177S7shYWuPnExrUzxy8xpFa5ueM7FqHhsMtBHpEGoyj2jE9oPYFk7gDw8ZxxDLBqzjXp1U2GIDMqsOBBNvMXuDOrnsncfbuCmePS1UBDmL3FheedMNUYZk+Jz8pqtN4NwLjO3EG9uszXlkV7XHRorUfbIO3TF2txTj5b/ADnOjOuYbFWUhxmefHw8ZyjFqA7hRYB2AHIBiAIxezRn44xRGAMUr2SiEIjIdOEUIOvQJmpmYRJK0NV6QYi0wmpIl4TjOr5zsegsRajRVsgKdPh+wJxZDnOxaOp//WoPwNOnl/AIryfL9Rn03ilAuHtYE87+Azmjp1Ue2wwawAFiL95I53v5zeuouDY35iYquFpvm9NGPO1m/mGcjxzJ4UCpRepUBzV2a/BRcAeU5po7R9Ss4SkrO3IcO8ncB3mXnXfSCpR9kMmcAAD8qIRe/W1vOR/DYhUrMbDaZFv0DG3/ACEsenXlcMLklgNQk2FNao4ci7KmxZTyuQb9ZtsLqbg1Bujvfi77umzaWAsOcSDKHC7s7+tLTVKZ9nTJ2UsoBNyBwF+Vp7UAO6ahCHxNVBvGZ8NkfWbFAV3w516LRO4UXJmKrigBlvml0niXINhkASTztnCSNbrZpJ6qGjTYLte8ST7vEZc/vKS+gMRvVA4/YIJ8jYze4FfauWJ39/wlqw2iez2XjvHaWYxznRGh6lastFVIcmx2gRsgby3EW+3Odh1b1bTCJYEO5zLlAGBtaynMhe6/Ex6v6JRHesUG2w2C3MCxP08hN3UqKoJPwltYyzuR1KgRb8TlNYzgglt2cwYiuXNz67pqdN6WWmoQntNy3heJMjMbSvoeiVvtOWO5gQNnoLW87zjenMA9Cs9Nzcg32t20DmG8bztGF/8AGs55+JdG1Wk/6yMv8jX/AL4nt205cy4pUIrxyvdjRFCENCEIQM21C8jCHRK8d5EGOFZKe+du0Al8NhhypIf+At85xBDO14Ot7PBUm4+xpgfyLJXi+X6jV6Y0uwqkUz2RlYgEHmZjGnlVS9VbKBclT8ADxmqa7Ne5lZ07pHbbYQ9hDvH5m4noMwPGOPNr1/a8e1MNX0jiHZF5e8bKiblDH7Zk3ynQtD6rrQpNTNTbLHaJ2bAGwGWe7KaD8NKRFOs/BmRb/uhif6xLqay7toZb4Xdne/SeorWkdXK1j7J8+GZEp2P0jisO5So1RGHecxzBBzE6mlXaOWdvIfeU38TX/wBmkDxqE9+Sm/zERjXe5SVoNXNYUp16j4hnO2oANtrO4JLZ34S4Jp/DPbZrJ4tsnyaxnIiYwZeO+WnG+nXHxaE5Op6MJqNM49Fp1LOt9hrC4uTY2E5q5kVaXjn/AEufq66BpXRW55yx0lsN/wAZQtD4rEdlUayDmq+QJGctmHp4orcICOZX7ESVyynKvGiql6S+PzM9NYdk/Wa3Vp2NEbYAYMwIHW/1myxHuHrIy0elMSKKFwLk5KO/v7uMpuHoe0qFql3JNzfd5Dh3T060aaH6StC/ZVQD3O+Y8LbI8Zm0XhiTe3rxlaniLBVchFseP07pRtfKlxSBuT2yDfh2b5c93lOgvhSUFz9eE53+IICvTS92Csx6MQB/SYntrX/JUgYRCKV9DFOEUJGxCF4QPU2FYcL9JiZCN4Im1tERzHnLx4sfl5T3GqjBmxekp3iY2wg4XEcd8fl4334eVTOs4jEB6FBUuVFNCO/sLOVnCtwz+EklSqnus6/usR8pLGdlw285Vo1jx3sk2FPbceKruJ8cwPGVFTHiK7u21UYs3NjnYbpAGHXXhMceOv6g0guDS/53dvjs/wBszvq4ju7NW2WLEixG45gG8pOhdbGSnToBWy7IsRmWY892+W12a5zkeDZjZlbf1sMDoFqdRXFUuqgkgnfcEAAcc7GVv8UW/wBukP22+C/5E9eN01+jKHYkAnZ63BOflKZrhp9cT7MKck2r9Ts/aX9NWNuUqt3gTMRaG1K9lpsZGBaIZysVetCYLsIOOyPMi5+ctFbSDogQccukp+pmJdyUbMKt1J4ZgbN/GWXSoZmUBgLDs3tmx3DP5mZryZzy32q1UtSYsSTtnfyKrNjpGuqU2djYKCx6KCT8po9W6lCgjp7ZTZ+0SwA2tkA2JOe6arXjWOicM1OlUDO5AOzwXec/hDMna5tjsWz1GqN7zMW6Em4HhunWdFINlWAyIBHjnONls52HVN9vDUW/YAPVeyfiJbHTNv6p7A6zjWt2K9piqhG5TsD+AWPxvOu6SrhKLObWQFj4AmcJruWYsxzJJPUm5ki6Z56jCKOV7MRJSMJGxCEIG82vnBzb0JAGNd/rwmnyD4W4QJ5RAeuvKJmgS2u/LpC/oTGHtBzeBJlG4gTE1BT3dI9qLavDeOzKeq9OicN/v0hf/wBlP+tZ216Sneo8pyXV7RlVqlKoKb7AqKxfZOzZWuc/CdRGkk4giZpllll7UL8UKyqaVJRbIu1u/sr/AHTnjGW/XXENUxLsFOwoVQbG1goJz6lpWGQcQJqR1w3TGcseS8RMzNSHAyBpHhDpN2N/UBMyLLNq1qmaoFWv2UOaqD2nHM/qr8T3b5bKer9BP/HRTL9YbR82vJaXZGl0KmxRRqZvltMe8+9fpu8Jj0glRyXvn5W6S1Pg7AWAHcAAOlp4sThgim9gLzLz29qk4+myIzX5DzNpXzUln1qrJ7MKrC5cZDkAT9pUtqajWLJedU/DyttYW1/cdl387P8A3Gco2puNE6wV8MjJSYAMbm6gm9rXF5eN5Y/aOm684zYwbgHNiqfzHP4Bpx9jPdpDTVeuAKtRnANwDYAGxFwBluJ85rrw3rx+sTjkRGJHfFKEIQ2IQhCt2et+PKJW9XhwifeLnPz5/eV8hI5cvKYyT132j2oivnw9cYCkZLY58YgvD6erQiDbp6NHYY1KiIPzMq9ATmfKYSJaNRsJtYkHeEVm8cl/ulWOmHBqmHCINkKosO4cJpGTK5lg0kpdVWmRkc7m2VjNQ2iX/Z/mEw3FcbBs6uTu7X13znOkKWw7KOBy6b53SrhVTDsDba2TfxnGdaF2a27hn5mWJb1p7zY6Cw6PWRKrhUJzvxI3Lfhfdea9BMoE0x12HZtuyA3W3AcploSjatazbFqVc3Tcrnevc37Pfwl7pjiDccCJix0717DQ21tex4G0rWlsBUdFUlBb3iDkx3Bhly4d8tCMSp52M1bUDxkOqriNWUqUytQ9vMqw3g8Oo7pzWvTKMVYWKkqRyINjO4+zXcWz5TnmvWjlSsHW2zUGf762B8xs/GXGky4p4MkDMvsREcOeB85t1x2YoAwEZpMOEV5HXHKVISQkAZIQ6ypCSkY5G+nCKEHW5PrL1lnAeuvWS5G3PK9uA5jn63RbJIzvvyyPdl65Svkj1n/jpEYADO3PcSPrBWuPXDl3QBh3fDOF+Yt64x3tvG8cOfhC4+/P0YEgDL5+HWF7NSpb9VB4XJ+YlCQ+fx5WnU9T6WxhUyzcs58TZfgBFI3hpmGy0qGu2s1bCmmKez2w5O0t/d2fvKwn4i4riKZ/gP8A+pOL11SpTJBB4icc1xpWrkHeAR/yadewmKZkRmtdlUm3MgEzluviWxR/dB8yTE9nfCsKkybPLxjsMiM+6Mrbx4TSIqO6WfVnWJqFkqXanw4lOnNe7ylZ9evXCTvA7VRrKybaMGUrcEZgg8RKPr/jKqU0NN2S7lTskrfski9uhmj0bp7EUFZKbDZbgwuFPNc8vlPFpHSNasB7VywvcCwC8r2UdZOL17NT9IotUnEPskqbO5y3biTuM9mtukKFWmFpuGdXBFgbWsQc7W4jylYC57oisc8p1g2e+MnnJlPKLZlD74wAd4vz+0jbuO+MQdBw6nh5SP6JyPn9eUzKd0mrcIdMdmU/XjOGccL9JBkI3gzZL68vnJEev8ScdZ8iz3Gp2oTb27x5CEca/uf+JbG6x4/TcBBSN+0bch8vh8owbbvsZErl63bvXWV5Egfnfv7r/GAfhfw+XhIq28/Hn4EwUgZ28ja3fnAkDl5esou716zjU7wOPHpwgM+p4W3Dr9IE1YdT3ZZevlLNhdcaqIiKlLZRVUZPuUAfrSrHyHDvzOfwPlAZDfl6+8DZad0m+LZHqKo2FIAUNxIJJuTxtNV7BeQF+OZmbgPX0z4SNxx9cpBck13dQq/o62Cge+RkMv1TK3rFpI4mqKhTYIULs7W1mCTfMDmBbuM8VNsx5XOW/Lfy75Ejr8OO+8DCq3zP+L9Y7cPXG0yvUub7ul8vM3kD3D1x6SiDDO4Pj8oXv/m/r/qC/wCfQ8oz8L5et3OAlHl6/wARMoz+frrJ2+PAZ9/0jN93ytAwlftfORVL+W/6zMxuc8/vINxEDG6ZnLjl64xbFvXCZXA3xHfl6v8AWBjtGQJPZ39PX1hYW7+n+YCXvF/+5LZ8uPXjEB65+u6BIgTvzvy+0krZ5brW3kyHl4cOvKT2hnbp/n4QF5/GELHu844E+Pl9ZClv8vpHCQTff4fUyLe9/CPkIoSjJi/fHh8hEm4ev1I4QFT94/u/2GQPujwhCBkT3R1P0kV9zx+8ISBLu8B9YVfffqfmIQgQPH1+USfHxb5mEJRE+765yNX3oQgJ5NN4/eX5iEIERx6/Uwb7fKEIEn9xf4vmJFd/gPpCECHDz/pj4jr9Y4QMjbvE/ITC24dT8jHCAL9D8hJrx/dX+yEIEIQhA//Z',
    rating: 5,
  },
  {
    id: 3,
    name: 'Very Special Ding Ding',
    price: '1500.00',
    picture_url:
      'https://ae01.alicdn.com/kf/H0940cd8c5a704d28a34e268d88afb97bc/Juguete-antiestr-s-de-Animal-ding-ding-juguete-suave-y-pegajoso-de-elevaci-n-lenta-para.jpg_Q90.jpg_.webp',
    rating: 5,
  },
];

// Actions
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_ALL = 'CLEAR_ALL';

// Action creators
export function addItem(item) {
  return { type: ADD_ITEM, item };
}

export function removeItem(id) {
  return { type: REMOVE_ITEM, id };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function itemReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      // find max id in state
      const maxId = Math.max(...state.map((item) => item.id));
      const newItem = { ...action.item, id: maxId + 1 };
      return [...state, newItem];
    case REMOVE_ITEM:
      const copy = [...state];
      // Remove element of array whose id is equal to action.id
      return copy.filter((item) => item.id !== action.id);
    case CLEAR_ALL:
      return [];
    default:
      return state;
  }
}

function ItemProvider(props) {
  const [items, dispatch] = useReducer(itemReducer, initialItems);

  const itemData = { items, dispatch };

  return <ItemStore.Provider value={itemData} {...props} />;
}

function useItemStore() {
  return useContext(ItemStore);
}

export { ItemProvider, useItemStore };
