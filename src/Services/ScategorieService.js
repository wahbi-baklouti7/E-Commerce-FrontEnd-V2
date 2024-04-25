import Api from "../Axios/api";



const SCATEGORIE_API="scategories"
export const fetchscategories=async()=> {
return await Api.get(SCATEGORIE_API);
}
export const fetchScategorieById=async(scategorieId)=> {
return await Api.get(SCATEGORIE_API + '/' + scategorieId);
}
export const fetchScategorieByCat=(idcat) =>{
return Api.get(SCATEGORIE_API + '/cat/' + idcat);
}
export const deleteScategorie=async(scategorieId) =>{
return await Api.delete(SCATEGORIE_API + '/' + scategorieId);
}
export const addScategorie=async(scategorie)=> {
return await Api.post(SCATEGORIE_API,scategorie);
}
export const editScategorie=(scategorie) =>{
return Api.put(SCATEGORIE_API + '/' + scategorie._id, scategorie);
}